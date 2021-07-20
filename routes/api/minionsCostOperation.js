var fetch = require('cross-fetch');
var {moneyRepresentation, dateTimeToString, findBazaar, findProfile} = require("./general.js");
var {specialPrices, minionSlotsCriteria} = require("./minionsData.js");
var itemNames = require("./itemNames.json");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, profileNames, communitySlots, minionCrafts, hadError=false;
    
exports.calculateMinionsCost = async function(minions, settings){
    console.log("calculateMinionsCost");
    console.log(settings.name,minecraftName);
    //console.log(Date.now()-lastUpdatedBazaar);
    if((settings.useProfile)&&(settings.name!=minecraftName||hadError||Date.now()-lastUpdatedProfile>5*60*1000)){ //don't call api again if identical name, but call again if prev result has error, 5 min timeout
        minecraftName = settings.name;
        lastUpdatedProfile = Date.now();
        await findProfile(settings.name,settings).then((profilesAjax)=>{
            if(profilesAjax=="error"){
                return;
            }
            minions.forEach((minion,index6)=>{
                minion.profilesTier = new Array(profilesAjax.length);
            });
            profileNames = new Array(profilesAjax.length);
            communitySlots = new Array(profilesAjax.length);
            minionCrafts = new Array(profilesAjax.length);
            profilesAjax.forEach((profile,index)=>{ 
                //store cute name for data input
                //console.log(profile);
                profileNames[index]=profile.cuteName;
                communitySlots[index]=profile.communitySlots;
                minionCrafts[index]=profile.rawMinions.length;
                minions.forEach((minion,index3)=>{
                    minion.profilesTier[index] = new Array(minion.tierDelay.length);
                    minion.profilesTier[index].forEach((crafted)=>{
                        crafted = false;
                    });
                });
                //for each crafted minion entry
                profile.rawMinions.forEach((rawMinion,index2)=>{
                    //e.g. to get "TARANTULA" from "TARANTULA_4"
                    let underscoreLocation = rawMinion.lastIndexOf("_");
                    let searchString = rawMinion.substring(0,underscoreLocation);
    
                    //search it with each minion name
                    minions.forEach((minion,index4)=>{
                        let minionString;
                        if(minion.rawId){
                            minionString = minion.rawId;
                        }else{
                            let minionLocation = minion.name.lastIndexOf(" ");
                            minionString = minion.name.substring(0,minionLocation).toUpperCase();
                        }
                        if(minionString==searchString){
                            let tier = rawMinion.substring(underscoreLocation+1);
                            minion.profilesTier[index][tier-1] = true;
                        }
                    });
                });
            });
        });
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
                    if(upgrade.materialsAlt){
                        upgrade.bazaarPriceAlt=new Array(upgrade.materials.length);
                        upgrade.materialsAlt.forEach((materialsTier,tier)=>{
                            if(materialsTier){
                                upgrade.bazaarPriceAlt[tier] = new Array(materialsTier.length);
                                materialsTier.forEach((material,index)=>{
                                    if(bazaarPrices[0][material]){
                                        upgrade.bazaarPriceAlt[tier][index] = new Array(2);
                                        upgrade.bazaarPriceAlt[tier][index][0] = bazaarPrices[0][material];
                                        upgrade.bazaarPriceAlt[tier][index][1] = bazaarPrices[1][material];
                                    }else{
                                        upgrade.bazaarPriceAlt[tier][index] = undefined;
                                    }
                                });
                            }
                        });
                        //console.log(upgrade);
                    }
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

    console.log("finished findBazaar and findProfile");

    let unsortedMinionsCost = new Array(); //2D array
    let unsortedMinionsCostLast = new Array(); //2D array
    let totalTiers = 0;
    minions.forEach((minion)=>{
        calculateMinionCost(settings,minion);
    });

    let minionsCost = new Array(); //1D array
    while(unsortedMinionsCost.length!=0){ //iterate until all elements are sorted, ~~ merge list
        let minVal, minValIndex;
        for(j=0;j<unsortedMinionsCost.length;j++){
            if(!minVal || unsortedMinionsCost[j][0].totalCost < minVal){
                minVal = unsortedMinionsCost[j][0].totalCost;
                minValIndex = j;
            }
        }
        //console.log(minValIndex);
        minionsCost.push(unsortedMinionsCost[minValIndex][0]); //add to sorted list
        unsortedMinionsCost[minValIndex].shift(); //remove element from unsorted list
        if(unsortedMinionsCost[minValIndex].length==0){ //remove whole 1D array if it is empty
            unsortedMinionsCost.splice(minValIndex,1);
        }
    }
    while(unsortedMinionsCostLast.length!=0){ //iterate until all elements are sorted, ~~ merge list
        let minVal, minValIndex;
        for(j=0;j<unsortedMinionsCostLast.length;j++){
            if(!minVal || unsortedMinionsCostLast[j][0].totalCost < minVal){
                minVal = unsortedMinionsCostLast[j][0].totalCost;
                minValIndex = j;
            }
        }
        //console.log(minValIndex);
        minionsCost.push(unsortedMinionsCostLast[minValIndex][0]); //add to sorted list
        unsortedMinionsCostLast[minValIndex].shift(); //remove element from unsorted list
        if(unsortedMinionsCostLast[minValIndex].length==0){ //remove whole 1D array if it is empty
            unsortedMinionsCostLast.splice(minValIndex,1);
        }
    }
    
    //prepare for the profiles info section
    //minionSlots, minionSlotsNext
    settings.minionSlotsNext = new Array();
    if(settings.useProfile){
        settings.profileNames=profileNames;
        settings.profile=Math.min(settings.profile,settings.profileNames.length-1);

        settings.communitySlots=communitySlots[settings.profile];
        settings.minionCrafts=minionCrafts[settings.profile];
        minionSlotsCriteria.forEach((criteria,index5)=>{ 
            if(criteria>settings.minionCrafts){
                if(settings.minionSlotsNext.length==0){
                    settings.minionSlots=index5+6-1;
                }
                if(index5<minionSlotsCriteria.length){
                    settings.minionSlotsNext.push(criteria-settings.minionCrafts);
                }
            }
        });
        if(minionSlotsCriteria[minionSlotsCriteria.length-1]<settings.minionCrafts){ //if maxed
            settings.minionSlots=minionSlotsCriteria.length+6-1;
        }
        settings.minionSlotsNext.push(totalTiers);
    }else{
        settings.minionSlots = 5;
        settings.minionSlotsNext = new Array();
        minionSlotsCriteria.forEach((slot)=>{
            settings.minionSlotsNext.push(slot);
        });
        settings.minionSlotsNext.push(totalTiers); //total-last element
    }

    //minionSlotsCosts
    settings.minionSlotsCost = new Array(settings.minionSlotsNext.length);
    for(i=0;i<settings.minionSlotsCost.length;i++){ //init
        settings.minionSlotsCost[i] = 0;
    }
    let nextIndex=0;
    minionsCost.forEach((minionCost,index)=>{ //calculate
        settings.minionSlotsCost[nextIndex]+=minionCost.totalCost;
        if(index+1>=settings.minionSlotsNext[nextIndex]){
            nextIndex++;
        }
    });
    settings.minionSlotsCostText = new Array(settings.minionSlotsCost.length);
    settings.minionSlotsCost.forEach((cost,index2)=>{ //turn to proper string
        settings.minionSlotsCostText[index2] = moneyRepresentation(cost);
    });

    return minionsCost;

    function calculateMinionCost(settings,minion){
        let minionCost = new Array();
        for(tier=0;tier<minion.tierDelay.length;tier++){
            if(settings.useProfile&&minion.profilesTier[settings.profile][tier]){ //useProfile and has crafted already, skip
                continue;
            }
            let tierCost = {
                name : minion.name,
                tier : tier+1,
            };
            upgrade = minion.upgrade;

            tierCost.warning = false;
            tierCost.upgradeMaterials = new Array();
            tierCost.upgradeQuantities = new Array();
            tierCost.unitPrices = new Array();
            let totalCost = 0;

            let useAlt = false;
            if(upgrade.materialsAlt&&upgrade.materialsAlt[tier]){
                if(compareMaterialsCost(upgrade.materials[tier],upgrade.quantities[tier],upgrade.bazaarPrice[tier]) > 
                    compareMaterialsCost(upgrade.materialsAlt[tier],upgrade.quantitiesAlt[tier],upgrade.bazaarPriceAlt[tier])){
                    useAlt = true;
                }
            }

            let materials, quantities, bazaarPrice;
            if(useAlt){
                materials = upgrade.materialsAlt[tier];
                quantities = upgrade.quantitiesAlt[tier];
                bazaarPrice = upgrade.bazaarPriceAlt[tier];
            }else{
                materials = upgrade.materials[tier];
                quantities = upgrade.quantities[tier];
                bazaarPrice = upgrade.bazaarPrice[tier];
            }

            materials.forEach((material,materialIndex)=>{
                tierCost.upgradeMaterials[materialIndex] = material;
                if(quantities[materialIndex]){
                    tierCost.upgradeQuantities[materialIndex] = quantities[materialIndex];
                    let unitPrice;
                    if(bazaarPrice[materialIndex]){
                        unitPrice = bazaarPrice[materialIndex][settings.buyingMethod]*(1+settings.tax/100);
                    }else if(specialPrices[material]!=undefined){
                        unitPrice = specialPrices[material];
                    }else{
                        unitPrice = 0;
                    }
                    tierCost.unitPrices[materialIndex] = moneyRepresentation(unitPrice);
                    totalCost += unitPrice*tierCost.upgradeQuantities[materialIndex];
                }else{ //upgrade quantity = undefined, meaning it is a warning message instead
                    tierCost.warning = true;
                    tierCost.upgradeQuantities[materialIndex] = "";
                    tierCost.unitPrices[materialIndex] = "";
                }
            });
            tierCost.totalCost = totalCost;
            tierCost.totalCostText = moneyRepresentation(totalCost);
            if(tier==0&&upgrade.detachTier1==true){
                if(upgrade.putAtLast){
                    unsortedMinionsCostLast.push([tierCost]); //seperate tier 1 from the rest of the list
                }else{
                    unsortedMinionsCost.push([tierCost]); //seperate tier 1 from the rest of the list
                }
                totalTiers++;
            }else{
                minionCost.push(tierCost);
                totalTiers++;
            }
        }
        if(upgrade.putAtLast){
            if(minionCost.length!=0) unsortedMinionsCostLast.push(minionCost);
        }else{
            if(minionCost.length!=0) unsortedMinionsCost.push(minionCost);
        }
        
    }

    function compareMaterialsCost(materials,quantities,bazaarPrice){
        let totalCost = 0;
        materials.forEach((material,materialIndex)=>{
            if(quantities[materialIndex]){
                let unitPrice;
                if(bazaarPrice[materialIndex]){
                    unitPrice = bazaarPrice[materialIndex][settings.buyingMethod]*(1+settings.tax/100);
                }else if(specialPrices[material]!=undefined){
                    unitPrice = specialPrices[material];
                }else{
                    unitPrice = 0;
                }
                totalCost += unitPrice*quantities[materialIndex];
            }
        });
        return totalCost;
    }
}

exports.calculateMinionsCostLink = async function(minions, settings){
    console.log("calculateMinionsCostLink");

    let unsortedMinionsCost = new Array(); //2D array
    let unsortedMinionsCostLast = new Array(); //2D array
    let totalTiers = 0;
    minions.forEach((minion,index)=>{
        calculateMinionCostLink(settings,minion,index);
    });

    let minionsCost = new Array(); //1D array
    while(unsortedMinionsCost.length!=0){ //iterate until all elements are sorted, ~~ merge list
        let minVal, minValIndex;
        for(j=0;j<unsortedMinionsCost.length;j++){
            if(!minVal || unsortedMinionsCost[j][0].totalCost < minVal){
                minVal = unsortedMinionsCost[j][0].totalCost;
                minValIndex = j;
            }
        }
        //console.log(minValIndex);
        minionsCost.push(unsortedMinionsCost[minValIndex][0]); //add to sorted list
        unsortedMinionsCost[minValIndex].shift(); //remove element from unsorted list
        if(unsortedMinionsCost[minValIndex].length==0){ //remove whole 1D array if it is empty
            unsortedMinionsCost.splice(minValIndex,1);
        }
    }
    while(unsortedMinionsCostLast.length!=0){ //iterate until all elements are sorted, ~~ merge list
        let minVal, minValIndex;
        for(j=0;j<unsortedMinionsCostLast.length;j++){
            if(!minVal || unsortedMinionsCostLast[j][0].totalCost < minVal){
                minVal = unsortedMinionsCostLast[j][0].totalCost;
                minValIndex = j;
            }
        }
        //console.log(minValIndex);
        minionsCost.push(unsortedMinionsCostLast[minValIndex][0]); //add to sorted list
        unsortedMinionsCostLast[minValIndex].shift(); //remove element from unsorted list
        if(unsortedMinionsCostLast[minValIndex].length==0){ //remove whole 1D array if it is empty
            unsortedMinionsCostLast.splice(minValIndex,1);
        }
    }

    return minionsCost;

    function calculateMinionCostLink(settings,minion,index){
        let minionCost = new Array();
        for(tier=0;tier<minion.tierDelay.length;tier++){
            let tierCost = {
                minionIndex: index,
                name : minion.name,
                tier : tier+1,
            };
            upgrade = minion.upgrade;

            let useAlt = false;
            if(upgrade.materialsAlt&&upgrade.materialsAlt[tier]){
                if(compareMaterialsCost(upgrade.materials[tier],upgrade.quantities[tier],upgrade.bazaarPrice[tier]) > 
                    compareMaterialsCost(upgrade.materialsAlt[tier],upgrade.quantitiesAlt[tier],upgrade.bazaarPriceAlt[tier])){
                    useAlt = true;
                }
            }

            if(useAlt){
                tierCost.totalCost = compareMaterialsCost(upgrade.materialsAlt[tier],upgrade.quantitiesAlt[tier],upgrade.bazaarPriceAlt[tier]);
            }else{
                tierCost.totalCost = compareMaterialsCost(upgrade.materials[tier],upgrade.quantities[tier],upgrade.bazaarPrice[tier]);
            }

            if(tier==0&&upgrade.detachTier1==true){
                if(upgrade.putAtLast){
                    unsortedMinionsCostLast.push([tierCost]); //seperate tier 1 from the rest of the list
                }else{
                    unsortedMinionsCost.push([tierCost]); //seperate tier 1 from the rest of the list
                }
                totalTiers++;
            }else{
                minionCost.push(tierCost);
                totalTiers++;
            }
        }
        if(upgrade.putAtLast){
            if(minionCost.length!=0) unsortedMinionsCostLast.push(minionCost);
        }else{
            if(minionCost.length!=0) unsortedMinionsCost.push(minionCost);
        }
        
    }

    function compareMaterialsCost(materials,quantities,bazaarPrice){
        let totalCost = 0;
        materials.forEach((material,materialIndex)=>{
            if(quantities[materialIndex]){
                let unitPrice;
                if(bazaarPrice[materialIndex]){
                    unitPrice = bazaarPrice[materialIndex][0]*(1+settings.tax/100); //default buying method: buy instantly
                }else if(specialPrices[material]!=undefined){
                    unitPrice = specialPrices[material];
                }else{
                    unitPrice = 0;
                }
                totalCost += unitPrice*quantities[materialIndex];
            }
        });
        return totalCost;
    }
}