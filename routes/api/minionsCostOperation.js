var fetch = require('cross-fetch');
var {moneyRepresentation, dateTimeToString, findBazaar, findProfile} = require("./general.js");
var {soulflowItem} = require("./minionsData.js");
var itemNames = require("./itemNames.json");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, profileNames, hadError=false;
    
exports.calculateMinionsCost = async function(minions, settings){
    console.log("calculateMinionsCost");
    return [1,2,3,4,5];
    // console.log(settings.name,minecraftName);
    // //console.log(Date.now()-lastUpdatedBazaar);
    // if((settings.useProfile)&&(settings.name!=minecraftName||hadError||Date.now()-lastUpdatedProfile>5*60*1000)){ //don't call api again if identical name, but call again if prev result has error, 5 min timeout
    //     await findProfile(settings.name,settings,minions);
    //     //await Promise.all([findBazaar(), findProfile(settings.name)]);
    //     minecraftName = settings.name;
    //     lastUpdatedProfile = Date.now();
    // }
    // if(settings.sellingTo==1&&(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000)){ //1 min time out
    //     await findBazaar(settings,minions);
    //     lastUpdatedBazaar = Date.now();
    // }
    // settings.lastUpdatedProfile = lastUpdatedProfile ? dateTimeToString(lastUpdatedProfile): null;
    // settings.lastUpdatedBazaar = lastUpdatedBazaar ? dateTimeToString(lastUpdatedBazaar) : null;

    // if(settings.hasError){
    //     hadError = true;
    //     return;
    // }

    // if(settings.useProfile){
    //     settings.profileNames=profileNames;
    //     settings.profile=Math.min(settings.profile,settings.profileNames.length-1);

    // }

    // console.log("finished findBazaar and findProfile");

    // //check to see if there are individual settings
    // if(settings.individualSettings){
    //     minions.forEach((minion)=>{
    //         minion.hasIndividualSettings = settings.individualSettings[minion.id].tier ? 1 : 0;
    //         if(minion.hasIndividualSettings) console.log(settings.individualSettings[minion.id].products);
    //     });
    // }else{
    //     minions.forEach((minion)=>{
    //         minion.hasIndividualSettings = 0;
    //     });
    // }

    // //check to see if diamond spreading is added to the minions array
    // // if(diamondSpreadingAdded==false){
    // //     minions.forEach((minion)=>{
    // //         minion.products.push(diamondSpreadingItem);
    // //     });
    // //     diamondSpreadingAdded = true;
    // // }

    // //calculate profit
    // minions.forEach((minion)=>{
    //     calculateMinionProfit(settings,minion);
    // });
    // minions.sort((a,b) =>{
    //     if(b.totalProfit>a.totalProfit) return 1; //total profit desc
    //     else if(b.totalProfit<a.totalProfit) return -1;
    //     else if(b.name<a.name) return 1; //name asc
    //     else if(b.name>a.name) return -1;
    //     else return 0;
    // });
    // // minions.forEach((minion)=>{
    // //     console.log(minion.totalProfit);
    // // })

}