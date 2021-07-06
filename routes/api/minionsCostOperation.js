var fetch = require('cross-fetch');
var {moneyRepresentation, dateTimeToString, findBazaar, findProfile} = require("./general.js");
var {specialPrices} = require("./minionsData.js");
var itemNames = require("./itemNames.json");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, profileNames, hadError=false;
    
exports.calculateMinionsCost = async function(minions, settings){
    console.log("calculateMinionsCost");
    console.log(settings.name,minecraftName);
    //console.log(Date.now()-lastUpdatedBazaar);
    if((settings.useProfile)&&(settings.name!=minecraftName||hadError||Date.now()-lastUpdatedProfile>5*60*1000)){ //don't call api again if identical name, but call again if prev result has error, 5 min timeout
        await findProfile(settings.name,settings);
        //await Promise.all([findBazaar(), findProfile(settings.name)]);
        minecraftName = settings.name;
        lastUpdatedProfile = Date.now();
    }
    if(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000){ //1 min time out
        lastUpdatedBazaar = Date.now();
        await findBazaar(settings).then((bazaarPrices)=>{
            if(bazaarPrices=="error"){
                return;
            }

            minions.forEach((minion)=>{
                upgrade = minion.upgrade;
                if(upgrade){
                    upgrade.bazaarPrice=new Array(upgrade.materials.length);
                    upgrade.materials.forEach((materialsTier,tier)=>{
                        upgrade.bazaarPrice[tier] = new Array(materialsTier.length);
                        materialsTier.forEach((material,index)=>{
                            if(bazaarPrices[0][material]){
                                upgrade.bazaarPrice[tier][index] = new Array(2);
                                upgrade.bazaarPrice[tier][index][0] = bazaarPrices[0][material];
                                upgrade.bazaarPrice[tier][index][1] = bazaarPrices[1][material];
                            }else{
                                upgrade.bazaarPrice[tier][index] = undefined;
                            }
                        });
                    });
                }
            });
        });
    }
    settings.lastUpdatedProfile = lastUpdatedProfile ? dateTimeToString(lastUpdatedProfile): null;
    settings.lastUpdatedBazaar = lastUpdatedBazaar ? dateTimeToString(lastUpdatedBazaar) : null;

    if(settings.hasError){
        hadError = true;
        return;
    }

    if(settings.useProfile){
        settings.profileNames=profileNames;
        settings.profile=Math.min(settings.profile,settings.profileNames.length-1);
    }

    console.log("finished findBazaar and findProfile");

    let minionsCost = new Array();
    minions.forEach((minion)=>{
        calculateMinionCost(settings,minion);
    });
    minionsCost.sort((a,b)=>{
        if(b.totalCost<a.totalCost) return 1; //total cost asc
        else if(b.totalCost>a.totalCost) return -1;
        else if(b.name<a.name) return 1; //name asc
        else if(b.name>a.name) return -1;
        else if(b.tier<a.tier) return 1;  //tier asc
        else if(b.tier>a.tier) return -1;
        else return 0;
    });

    return minionsCost;

    function calculateMinionCost(settings,minion){
        for(tier=0;tier<11/*minion.tierDelay.length*/;tier++){
            let tierCost = {
                name : minion.name,
                tier : tier+1,
            };
            // if(!minion.upgrade){
            //     //todo: undefined variables
            //     tierCost.totalCost = -1;
            //     tierCost.totalCostText = -1;
            //     minionsCost.push(tierCost);
            //     continue;
            // }
            upgrade = minion.upgrade;
            tierCost.upgradeMaterials = new Array();
            tierCost.upgradeQuantities = new Array();
            tierCost.unitPrices = new Array();
            let totalCost = 0;

            minion.upgrade.materials[tier].forEach((material,materialIndex)=>{
                tierCost.upgradeMaterials[materialIndex] = material;
                tierCost.upgradeQuantities[materialIndex] = upgrade.quantities[tier][materialIndex];
                let unitPrice;
                if(upgrade.bazaarPrice[tier][materialIndex]!=undefined){
                    unitPrice = upgrade.bazaarPrice[tier][materialIndex][settings.buyingMethod]*(1+settings.tax/100);
                }else if(specialPrices[material]!=undefined){
                    unitPrice = specialPrices[material];
                }else{
                    //todo
                    unitPrice = 0;
                }
                tierCost.unitPrices[materialIndex] = moneyRepresentation(unitPrice);
                totalCost += unitPrice*tierCost.upgradeQuantities[materialIndex];
            });
            tierCost.totalCost = totalCost;
            tierCost.totalCostText = moneyRepresentation(totalCost);
            minionsCost.push(tierCost);
        }
    }

}