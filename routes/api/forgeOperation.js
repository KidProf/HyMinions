var {moneyRepresentation, dateTimeToString, findBazaar, findProfile, findAuctions} = require("./general.js");
const { calculateMinionsCostLink } = require("./minionsCostOperation.js");
var {sourceBazaar,sourceAuction,sourceWarning,sourceOthers} = require("./forgeData.js");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, lastUpdatedAuction, profileNames, hadError=false;
    
exports.calculateForge = async function(forges, settings){
    console.log(settings.name,minecraftName);
    //console.log(Date.now()-lastUpdatedBazaar);
    // if((settings.tierType==1)&&(!minecraftName||settings.name.toLowerCase()!=minecraftName.toLowerCase()||hadError||Date.now()-lastUpdatedProfile>5*60*1000)){ //don't call api again if identical name, but call again if prev result has error, 5 min timeout
    //     minecraftName = settings.name;
    //     lastUpdatedProfile = Date.now();
    //     await findProfile(settings.name,settings).then((profilesAjax)=>{
    //         if(profilesAjax=="error"){
    //             return;
    //         }
    //         minions.forEach((minion,index6)=>{
    //             minion.profilesTier = new Array(profilesAjax.length);
    //         });
    //         profileNames = new Array(profilesAjax.length);
    //         profilesAjax.forEach((profile,index)=>{ 
    //             //store cute name for data input
    //             //console.log(profile);
    //             profileNames[index]=profile.cuteName;
    //             minions.forEach((minion,index3)=>{
    //                 minion.profilesTier[index] = 0;
    //             });
    //             //for each crafted minion entry
    //             profile.rawMinions.forEach((rawMinion,index2)=>{
    //                 //e.g. to get "TARANTULA" from "TARANTULA_4"
    //                 let underscoreLocation = rawMinion.lastIndexOf("_");
    //                 let searchString = rawMinion.substring(0,underscoreLocation);
    
    //                 //search it with each minion name
    //                 minions.forEach((minion,index4)=>{
    //                     let minionString;
    //                     if(minion.rawId){
    //                         minionString = minion.rawId;
    //                     }else{
    //                         let minionLocation = minion.name.lastIndexOf(" ");
    //                         minionString = minion.name.substring(0,minionLocation).toUpperCase();
    //                     }
    //                     if(minionString==searchString){
    //                         minion.profilesTier[index] = Math.max(minion.profilesTier[index], rawMinion.substring(underscoreLocation+1));
    //                     }
    //                 });
    //             });
    //         });
    //     });
    //     //await Promise.all([findBazaar(), findProfile(settings.name)]);
    // }

    if(settings.sellingTo==1&&(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000)){ //1 min time out
        lastUpdatedBazaar = Date.now();
        await findBazaar(settings).then((bazaarPrices)=>{
            if(bazaarPrices=="error"){
                return;
            }
            //incorporate bazaar prices into forges
            forges.forEach((forge)=>{
                if(forge.source == sourceBazaar){ //product
                    forge.price = bazaarPrices[1][forge.name] || 0; //sell instantly
                } 
                forge.materials.forEach((material)=>{
                    if(!material.prices){
                        material.prices = new Array(material.options.length).fill(0);
                    }
                    for(let i=0;i<material.options.length;i++){
                        if(material.source&&material.source[i]==sourceBazaar){
                            material.prices[i] = bazaarPrices[0][material.options[i]] || material.prices[i]; //buy instantly
                        }
                    }
                })
            });
        });
    }
    
    //TODO: a way to view it even when API is down
    if(settings.sellingTo==1&&lastUpdatedAuction==null||Date.now()-lastUpdatedAuction>5*60*1000){ //call again if prev result has error, 5 min timeout        
        lastUpdatedAuction = Date.now();
        await findAuctions(settings).then((minAuctions)=>{
            //incorporate minAuctions into forges
            forges.forEach((forge)=>{
                if(!forge.source){ //not given source
                    forge.price = minAuctions[forge.name] || 0; //product
                } 
                forge.materials.forEach((material)=>{
                    if(!material.prices){
                        material.prices = new Array(material.options.length).fill(0);
                        //console.log(material.prices);
                    }
                    for(let i=0;i<material.options.length;i++){
                        if(!(material.source&&material.source[i])){
                            material.prices[i] = minAuctions[material.options[i]] || material.prices[i];
                        }
                    }
                })
            });
        });
    }

    settings.lastUpdatedAuction = lastUpdatedAuction ? dateTimeToString(lastUpdatedAuction): null;
    settings.lastUpdatedProfile = lastUpdatedProfile ? dateTimeToString(lastUpdatedProfile): null;
    settings.lastUpdatedBazaar = lastUpdatedBazaar ? dateTimeToString(lastUpdatedBazaar) : null;

    if(settings.hasError){
        hadError = true;
        return;
    }

    console.log("finished findBazaar and findProfile");

    let outputForges = [];
    forges.forEach((forge)=>{
        let outputForge = {
            name: forge.name,
            materials: new Array(forge.materials.length),
            totalCost: 0,
            price: forge.price*(1-settings.tax/100),
            priceText: moneyRepresentation(forge.price*(1-settings.tax/100),settings.showDetails) + (forge.source ? printSource(forge.source): " (AH)"),
            duration: forge.duration,
        };
        forge.materials.forEach((material,index)=>{
            let minIndex = compareMaterialCost(material);
            let price = material.prices[minIndex]*(1+settings.tax/100);
            outputForge.materials[index] = {
                name: material.options[minIndex],
                quantity: material.quantity[minIndex],
                price: price,
                priceText: moneyRepresentation(price,settings.showDetails) + ((material.source && material.source[minIndex]) ? printSource(material.source[minIndex]) : " (AH)"),
            }
            outputForge.totalCost += price*outputForge.materials[index].quantity;
        });
        outputForge.totalCostText = moneyRepresentation(outputForge.totalCost);
        outputForge.profit = outputForge.price - outputForge.totalCost;
        outputForge.profitPerHour = outputForge.profit/outputForge.duration;

        outputForge.profitText = moneyRepresentation(outputForge.profit);
        outputForge.profitPerHourText = moneyRepresentation(outputForge.profitPerHour);

        outputForges.push(outputForge);
    });

    outputForges.sort((a,b)=>{
        if(b.profit>a.profit) return 1; //profit desc
        else if(b.profit<a.profit) return -1;
        else if(b.name<a.name) return 1; //name asc
        else if(b.name>a.name) return -1;
        else return 0;
    })
    return outputForges;

    function compareMaterialCost(material){
        let minIndex = 0;
        let minCost = material.prices[0]*material.quantity[0];
        for(let i=1;i<material.options.length;i++){
            let cost = material.prices[i]*material.quantity[i];
            if(minCost > cost){
                minCost = cost;
                minIndex = i;
            }
        }
        return minIndex;
    }

    function printSource(source){
        if(source==sourceBazaar){
            return " (BZ)";
        }else if(source==sourceAuction){
            return " (AH)";
        }else{
            return "";
        }
    }
}