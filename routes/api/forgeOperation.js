var {moneyRepresentation, dateTimeToString, findBazaar, findProfile, findAuctions} = require("./general.js");
const { calculateMinionsCostLink } = require("./minionsCostOperation.js");
var {soulflowItem, minionSlotsCriteria} = require("./minionsData.js");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, lastUpdateAuction, profileNames, hadError=false;
    
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
            // soulflowItem.bazaarPrice=new Array(soulflowItem.variants.length);
            // soulflowItem.variants.forEach((variant,index)=>{
            //     soulflowItem.bazaarPrice[index] = new Array(2);
            //     if(bazaarPrices[0][variant]){
            //         soulflowItem.bazaarPrice[index][0] = bazaarPrices[0][variant];
            //         soulflowItem.bazaarPrice[index][1] = bazaarPrices[1][variant];
            //     }else{
            //         //use NPC price as substitute
            //         if(soulflowItem.variantsNpcPrices){
            //             soulflowItem.bazaarPrice[index][0] = soulflowItem.variantsNpcPrices[index];
            //         }else{
            //             soulflowItem.bazaarPrice[index][0] = soulflowItem.npcPrice*soulflowItem.variantsEquiv[index];
            //         }
            //         soulflowItem.bazaarPrice[index][1] = soulflowItem.bazaarPrice[index][0];
            //     }
            // });

            // minions.forEach((minion)=>{
            //     minion.products.forEach((product)=>{
            //         product.bazaarPrice=new Array(product.variants.length);
            //         product.variants.forEach((variant,index)=>{
            //             product.bazaarPrice[index] = new Array(2);
            //             if(bazaarPrices[0][variant]){
            //                 product.bazaarPrice[index][0] = bazaarPrices[0][variant];
            //                 product.bazaarPrice[index][1] = bazaarPrices[1][variant];
            //             }else{
            //                 //use NPC price as substitute
            //                 if(product.variantsNpcPrices){
            //                     product.bazaarPrice[index][0] = product.variantsNpcPrices[index];
            //                 }else{
            //                     product.bazaarPrice[index][0] = product.npcPrice*product.variantsEquiv[index];
            //                 }
            //                 product.bazaarPrice[index][1] = product.bazaarPrice[index][0];
            //             }
            //         });
            //     });
            // });
        });
    }

    // for(let i = 0;i<60; i++){
    //     findAuction(settings,i);
    // }
    
    //TODO: a way to view it even when API is down
    if(settings.sellingTo==1||lastUpdateAuction==null||Date.now()-lastUpdateAuction>5*60*1000){ //call again if prev result has error, 5 min timeout        
        await findAuctions(settings).then((minAuctions)=>{
            console.log(minAuctions);
            
            //incorporate minAuctions into forges
            forges.forEach((forge)=>{
                if(!forge.toBazaar){ //product
                    
                } 
            })
        });
    }

    settings.lastUpdateAuction = lastUpdateAuction ? dateTimeToString(lastUpdateAuction): null;
    settings.lastUpdatedProfile = lastUpdatedProfile ? dateTimeToString(lastUpdatedProfile): null;
    settings.lastUpdatedBazaar = lastUpdatedBazaar ? dateTimeToString(lastUpdatedBazaar) : null;

    if(settings.hasError){
        hadError = true;
        return;
    }

    // if(settings.tierType==1){
    //     settings.profileNames=profileNames;
    //     settings.profile=Math.min(settings.profile,settings.profileNames.length-1);

    // }else if(settings.tierType==2){
    // }

    console.log("finished findBazaar and findProfile");

}