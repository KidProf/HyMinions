var {moneyRepresentation, dateTimeToString, findBazaar, findProfile, findAuctions} = require("./general.js");
const { calculateMinionsCostLink } = require("./minionsCostOperation.js");
var {sourceBazaar,sourceAuction,sourceWarning,sourceOthers,auctionTax,auctionTaxThreshold, gemstoneCollectionName, hotmXpList} = require("./forgeData.js");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, lastUpdatedAuction, profileNames, profileInfo, hadError=false;
    
exports.calculateForge = async function(forges, settings){
    console.log(settings.name,minecraftName);
    //console.log(Date.now()-lastUpdatedBazaar);
    if((settings.useProfile)&&(!minecraftName||settings.name.toLowerCase()!=minecraftName.toLowerCase()||hadError||Date.now()-lastUpdatedProfile>60*1000)){ //don't call api again if identical name, but call again if prev result has error, 1 min timeout
        minecraftName = settings.name;
        lastUpdatedProfile = Date.now();
        await findProfile(settings.name,settings).then((profilesAjax)=>{
            if(profilesAjax=="error"){
                return;
            }
            profileNames = new Array(profilesAjax.length);
            profileInfo = {
                collectionsDisabled : new Array(profilesAjax.length),
                hotmLevel: new Array(profilesAjax.length).fill(0),
                gemstoneCollectionLevel: new Array(profilesAjax.length).fill(0),
            }
            profilesAjax.forEach((profile,index)=>{ 
                let gemstoneCollectionLevel = 0;
                if(!profile.rawCollections||profile.rawCollections.length==0){ //collections does not exist
                    profileInfo.collectionsDisabled[index] = true;
                    gemstoneCollectionLevel = 11;
                }else{
                    //for each collection entry
                    forges.forEach((forge)=>{
                        if(forge.collectionsRequirement){
                            forge.collectionsRequirement.forEach((requirement)=>{
                                requirement.profilesCollection =  new Array(profilesAjax.length);
                            });
                        }
                    })
                    profile.rawCollections.forEach((rawCollection,index2)=>{
                        //e.g. to get "TARANTULA" from "TARANTULA_4"
                        let underscoreLocation = rawCollection.lastIndexOf("_");
                        let searchString = rawCollection.substring(0,underscoreLocation);
                        //search it with gemstone
                        let minionString=gemstoneCollectionName;
                        if(minionString==searchString){
                            gemstoneCollectionLevel = Math.max(gemstoneCollectionLevel,rawCollection.substring(underscoreLocation+1));
                        }
                            //search it with each forge name
                        forges.forEach((forge,index4)=>{
                            if(forge.collectionsRequirement){
                                forge.collectionsRequirement.forEach((requirement)=>{
                                    let collectionString;
                                    collectionString = requirement.rawCollectionId;
                                    if(collectionString==searchString){
                                        let tier = rawCollection.substring(underscoreLocation+1);
                                        if(tier==(requirement.tier)){
                                            requirement.profilesCollection[index] = true;
                                        }
                                    }
                                })
                                
                            }
                            
                        });
                    });
                }
               
                //store cute name for data input
                profileNames[index]=profile.cuteName;
                profileInfo.gemstoneCollectionLevel[index] = gemstoneCollectionLevel;
                profileInfo.hotmLevel[index] = translateToHotmLevel(profile.hotmXp);
            });
        });
    }

    if(settings.accuracy>=1&&(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000)){ //1 min time out
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
    if(settings.accuracy>=1&&lastUpdatedAuction==null||Date.now()-lastUpdatedAuction>5*60*1000){ //call again if prev result has error, 5 min timeout        
        lastUpdatedAuction = Date.now();
        await findAuctions(settings).then((minAuctions)=>{
            //incorporate minAuctions into forges
            forges.forEach((forge)=>{
                if(!forge.source){ //not given source
                    forge.price = minAuctions[forge.name] || 0;//product
                    if(forge.approximateMatch){
                        Object.keys(minAuctions).forEach((key)=>{
                            if(key.includes(forge.name)){
                                if(minAuctions[key]<forge.price||forge.price==0){
                                    forge.price = minAuctions[key];
                                    forge.approximateName = key;
                                }
                                
                            }
                        })
                    }
                } 
                forge.materials.forEach((material)=>{
                    if(!material.prices){
                        material.prices = new Array(material.options.length).fill(0);
                        //console.log(material.prices);
                    }
                    for(let i=0;i<material.options.length;i++){
                        if(!(material.source&&material.source[i])){
                            material.prices[i] = minAuctions[material.options[i]] || material.prices[i];
                            if(material.approximateMatch){
                                material.approximateNames = new Array(material.options.length);
                                Object.keys(minAuctions).forEach((key)=>{
                                    if(key.includes(material.options[i])){
                                        if(minAuctions[key]<material.prices[i]||material.prices[i]==0){
                                            material.prices[i] = minAuctions[key];
                                            material.approximateNames[i] = key;
                                        }
                                        
                                    }
                                })
                            }
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

    if(settings.useProfile){
        settings.profileNames=profileNames;
        settings.profile=Math.min(settings.profile,settings.profileNames.length-1);
        settings.collectionsDisabled=profileInfo.collectionsDisabled[settings.profile];
        settings.hotmLevel=profileInfo.hotmLevel[settings.profile];
        settings.gemstoneCollectionLevel=profileInfo.gemstoneCollectionLevel[settings.profile];
    }

    let outputForges = [];
    forges.forEach((forge)=>{
        let outputForge = {
            name: forge.name,
            approximateMatch: forge.approximateMatch,
            approximateName: forge.approximateName,
            materials: new Array(forge.materials.length),
            totalCost: 0,
            duration: forge.duration,
            gemstoneRequirement: forge.gemstoneRequirement,
            hotmRequirement: forge.hotmRequirement,
            collectionsRequirement: forge.collectionsRequirement,
            last: 0,
        };
        let price, priceText;
        switch(forge.source){
            case sourceBazaar:
                price = forge.price*(1-settings.tax/100);
                priceText = moneyRepresentation(price,settings.showDetails) + " (BZ)";
                break;
            case sourceOthers,sourceWarning:
                price = forge.price;
                priceText = moneyRepresentation(price,settings.showDetails);
                break;
            default: //AH
                price = forge.price >= auctionTaxThreshold ? forge.price*(1-auctionTax/100) : forge.price;
                priceText = moneyRepresentation(price,settings.showDetails) + " (AH)";
                break;
        }
        outputForge.price = price;
        outputForge.priceText = priceText;

        forge.materials.forEach((material,index)=>{
            let minIndex = compareMaterialCost(material);
            let priceBeforeTax = material.prices[minIndex];
            if(material.source){
                switch(material.source[minIndex]){
                    case sourceBazaar:
                        price = priceBeforeTax*(1+settings.tax/100); //PLUS
                        priceText = moneyRepresentation(price,settings.showDetails) + " (BZ)";
                        break;
                    case sourceOthers,sourceWarning:
                        price = priceBeforeTax;
                        priceText = moneyRepresentation(price,settings.showDetails);
                        break;
                    default: //AH
                        price = priceBeforeTax; //no tax when u buy stuff
                        priceText = moneyRepresentation(price,settings.showDetails) + " (AH)";
                        break;
                }
            }else{//AH
                price = priceBeforeTax; //no tax when u buy stuff
                priceText = moneyRepresentation(price,settings.showDetails) + " (AH)";
            }

            outputForge.materials[index] = {
                name: material.options[minIndex],
                quantity: material.quantity[minIndex],
                price: price,
                priceText: priceText,
                approximateMatch: material.approximateMatch?.[minIndex],
                approximateName: material.approximateNames?.[minIndex],
            }
            outputForge.totalCost += price*outputForge.materials[index].quantity;
        });
        outputForge.totalCostText = moneyRepresentation(outputForge.totalCost);
        outputForge.profit = outputForge.price - outputForge.totalCost;
        outputForge.profitPerHour = outputForge.profit/outputForge.duration;

        outputForge.profitText = moneyRepresentation(outputForge.profit);
        outputForge.profitPerHourText = moneyRepresentation(outputForge.profitPerHour);

        if(outputForge.hotmRequirement>settings.hotmLevel){
            outputForge.danger = true;
            outputForge.requirementNotMet = true;
            outputForge.last = 1;
        }
        if(outputForge.gemstoneRequirement){
            if(outputForge.gemstoneRequirement>settings.gemstoneCollectionLevel){
                outputForge.danger = true;
                outputForge.requirementNotMet = true;
                outputForge.last = 1;
            };
        }
        if(outputForge.collectionsRequirement&&settings.useProfile&&!settings.collectionsDisabled){
            //the forge has collection requirement && use profile && that profile has collection enabled
            outputForge.collectionsRequirement.forEach((requirement)=>{
                if(!requirement.profilesCollection[settings.profile]){
                    outputForge.danger = true;
                    outputForge.requirementNotMet = true;
                    outputForge.last = 1;
                }
            })

        }
        if(outputForge.profit<0){
            outputForge.last += 2;
            outputForge.danger=true; //red label
        } 
        
        //so the order is: have requirements + profit (0) -> no requirements + profit (1) -> have requirements + loss (3) -> no requirements + loss (4)
        

        outputForges.push(outputForge);
    });

    outputForges.sort((a,b)=>{
        //last: things labelled last shd be put at the end
        if(b.last<a.last) return 1; //last asc
        else if(b.last>a.last) return -1; 
        else if(b.profit>a.profit) return 1; //profit desc
        else if(b.profit<a.profit) return -1;
        else if(b.name<a.name) return 1; //name asc
        else if(b.name>a.name) return -1;
        else return 0;
    });

    
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

    function translateToHotmLevel(hotmXp){
        let i=0;
        for(i=0;i<hotmXpList.length;i++){
            console.log(hotmXp,hotmXpList[i]);
            if(hotmXpList[i]>hotmXp){
                break;
            }
        }
        return i;
    }
}
