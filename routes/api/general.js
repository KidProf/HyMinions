var fetch = require('cross-fetch');
var nbt = require('nbt');
var itemNames = require("./itemNames.json");

exports.dataUnitPrice = "u";
exports.dataQuantity = "q";
exports.dataCurrentPrice = "c";

const dataUnitPrice = "u";
const dataQuantity = "q";
const dataCurrentPrice = "c";

//copied from events.js
exports.dateTimeToString = function dateTimeToString(dateTime){
    let d = new Date(dateTime);
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+numberToString(d.getHours(),2)+":"+numberToString(d.getMinutes(),2)+":"+numberToString(d.getSeconds(),2)
}
//create leading zeros
function numberToString(number, digits){
    var numberRemaining = number;
    var returnString = "";
    for(let i=(digits-1);i>=0;i--){
        returnString+=Math.floor(numberRemaining/Math.pow(10,i));
        numberRemaining=numberRemaining%Math.pow(10,i);
    }
    return returnString;
}
//copied from dist/js/general.js
exports.moneyRepresentation = function moneyRepresentation(number,showDetails){
    if(showDetails==1){
        if(number<0){
            return "-" + moneyRepresentationMagnitudeDetail(Math.abs(number));
        }else{
            return moneyRepresentationMagnitudeDetail(number);
        }
    }
    if(number<0){
        return "-" + moneyRepresentationMagnitude(Math.abs(number));
    }else{
        return moneyRepresentationMagnitude(number);
    }
}

function moneyRepresentationMagnitude(number){
    
    if(number>=1&&number<100000){ //shortcut
        return (Math.round(number*10)/10).toFixed(1); //1 d.p. e.g. 10.0, 99999.9
    }else if(number<0.0001){
        return number; //surrender
    }else if(number<0.01){
        return (Math.round(number*10000)/10000).toFixed(4); //0.0005
    }else if(number<1){
        return (Math.round(number*100)/100).toFixed(2); //0.05
    }else if(number<999500){
        return Math.round(number/1000)+"k"; //100k
    }else if(number<9995000){
        return (Math.round(number/10000)/100).toFixed(2)+"M"; //1.00M
    }else if(number<99950000){
        return (Math.round(number/100000)/10).toFixed(1)+"M"; //10.0M
    }else if(number<999500000){
        return Math.round(number/1000000)+"M"; //100M
    }else if(number<9995000000){
        return (Math.round(number/10000000)/100).toFixed(2)+"B"; //1.00B
    }else if(number<99950000000){
        return (Math.round(number/100000000)/10).toFixed(1)+"B"; //10.0B
    }else if(number<999500000000){
        return Math.round(number/1000000000)+"B"; //100B
    }else{
        return number; //surrender
    }
}

function moneyRepresentationMagnitudeDetail(number){
    
    if(number>=1){ //shortcut
        return (Math.round(number*10)/10).toFixed(1); //1 d.p. e.g. 10.0, 99999.9
    }else if(number<0.0001){
        return number; //surrender
    }else if(number<0.01){
        return (Math.round(number*10000)/10000).toFixed(4); //0.0005
    }else if(number<1){
        return (Math.round(number*100)/100).toFixed(2); //0.05
    }
}

//used by forge and auctions
exports.determineBuyList = function determineBuyList(pricesList,quantity,overbuyTolerance){
    let buyList = [];
    let collectedMaterials = 0;
    let auctionIndex = 0;
    let componentCost = 0;
    while(collectedMaterials<quantity&&auctionIndex<pricesList.length){
        let unit = pricesList[auctionIndex];
        if(overbuyTolerance==0||unit[dataQuantity]<=overbuyTolerance*quantity){
            collectedMaterials += unit[dataQuantity];
            componentCost += (collectedMaterials > quantity) ? (unit[dataUnitPrice] * (unit[dataQuantity]-(collectedMaterials-quantity))) : unit[dataCurrentPrice];
            buyList.push({auctionIndex,...unit});
        }
        auctionIndex++;
    }
    if(collectedMaterials<quantity){
        if(overbuyTolerance!=0){
            return {violateOverbuyTolerance: true,...determineBuyList(pricesList,quantity,0)}
        }else{ //truely out of stock
            return {
                status: "fail",
                buyList,
                violateOverbuyTolerance: false,
            }
        }
    }else{
        return {
            status: "success",
            buyList,
            componentCost,
            violateOverbuyTolerance: false,
        }
    }
}

// copied from backend
exports.merge = function merge(data1, data2) {
    if (data1.length==0) {
        return data2;
    } else if (data2.length==0) {
        return data1;
    } else if (data1[0].u<data2[0].u) {
        return [data1[0], ...merge(data1.slice(1), data2)];
    } else {
        return [data2[0], ...merge(data1, data2.slice(1))];
    }
}

exports.findBazaar = async function findBazaar(settings){
    return new Promise((resolve)=>{
        setTimeout(() => {
            fetch("https://api.hypixel.net/skyblock/bazaar")
            .then(result => result.json())
            .then(({ products }) => {
                var pricesAjax = new Array(2);
                pricesAjax[0] = new Object();
                pricesAjax[1] = new Object();
                Object.keys(itemNames).forEach((id) =>{
                    //0 -> sell price (sell offer) (buy instantly)
                    //if it has sell offer, use sell offer, else use default price
                    pricesAjax[0][itemNames[id]]= (products[id]["buy_summary"][0] ? products[id]["buy_summary"][0]["pricePerUnit"] : products[id]["quick_status"]["buyPrice"]);
                    //1 -> buy price (sell instantly) (buy order)
                    //if it has buy order, use buy order, else use default price
                    pricesAjax[1][itemNames[id]]= (products[id]["sell_summary"][0] ? products[id]["sell_summary"][0]["pricePerUnit"] : products[id]["quick_status"]["sellPrice"]);
                })
                
                pricesAjax[0]["Diamond (Spreading)"] = pricesAjax[0]["Diamond"];
                pricesAjax[1]["Diamond (Spreading)"] = pricesAjax[1]["Diamond"];
                pricesAjax[0]["Enchanted Diamond (Spreading)"] = pricesAjax[0]["Enchanted Diamond"];
                pricesAjax[1]["Enchanted Diamond (Spreading)"] = pricesAjax[1]["Enchanted Diamond"];
                pricesAjax[0]["Enchanted Diamond Block (Spreading)"] = pricesAjax[0]["Enchanted Diamond Block"];
                pricesAjax[1]["Enchanted Diamond Block (Spreading)"] = pricesAjax[1]["Enchanted Diamond Block"];

                resolve(pricesAjax);
            })
            .catch((err)=>{
                console.log("catch from bazaar",err);
                settings.hasError=true;
                settings.errorMsg = "Error occured when getting bazaar prices.";
                resolve("error");
            });
        }, 1000);
    });
}

exports.findProfile = async function findProfile(name,settings){
    return new Promise((resolve)=>{
        setTimeout(() => {
            fetch("https://api.mojang.com/users/profiles/minecraft/"+name)
            .then(result => result.json())
            .then(({id, name}) => {
                settings.name=name; //fix case
                fetch("https://api.hypixel.net/skyblock/profiles?key="+process.env.HYPIXEL_KEY+"&uuid="+id)
                .then(result => result.json())
                .then(({profiles}) => {
                    let profilesAjax = new Array();
                    profiles.forEach((profile, index)=>{
                        profilesAjax[index] = new Object();
                        profilesAjax[index]["rawMinions"] = new Array();
                        profilesAjax[index]["rawCollections"] = new Array();
                        //unique minions crafted for minions cost cal and minions cal
                        Object.keys(profile["members"]).forEach((member, index2)=>{
                            if(profile["members"][member]["crafted_generators"]){
                                profilesAjax[index]["rawMinions"].push(...profile["members"][member]["crafted_generators"]);
                            }
                        });
                        //collections for minions cost cal
                        Object.keys(profile["members"]).forEach((member, index2)=>{
                            if(profile["members"][member]["unlocked_coll_tiers"]){
                                profilesAjax[index]["rawCollections"].push(...profile["members"][member]["unlocked_coll_tiers"]);
                            }
                        });
                        //community slots for minions cost cal
                        let communitySlots = 0;
                        if(profile["community_upgrades"]&&profile["community_upgrades"]["upgrade_states"]){
                            profile["community_upgrades"]["upgrade_states"].forEach((upgrade)=>{
                                if(upgrade.upgrade=="minion_slots"&&upgrade.tier>communitySlots){
                                    communitySlots = upgrade.tier;
                                }
                            });
                        }
                        profilesAjax[index]["communitySlots"] = communitySlots;
                        profilesAjax[index]["slayerBosses"] = {
                            "revenant5": false,
                            "revenant9": false,
                            "tarantula5": false,
                            "voidling4": false,
                        };
                        profilesAjax[index]["hotmXp"] = -1;
                        Object.keys(profile["members"]).forEach((member, index2)=>{
                            //slayer levels for minions cost cal
                            if(profile["members"][member]["slayer_bosses"]){
                                if(profile["members"][member]["slayer_bosses"]?.["zombie"]?.["claimed_levels"]?.["level_5"]){
                                    profilesAjax[index]["slayerBosses"]["revenant5"] = true;
                                }
                                if(profile["members"][member]["slayer_bosses"]?.["zombie"]?.["claimed_levels"]?.["level_9_special"]){
                                    profilesAjax[index]["slayerBosses"]["revenant9"] = true;
                                }
                                if(profile["members"][member]["slayer_bosses"]?.["spider"]?.["claimed_levels"]?.["level_5"]){
                                    profilesAjax[index]["slayerBosses"]["tarantula5"] = true;
                                }
                                if(profile["members"][member]["slayer_bosses"]?.["enderman"]?.["claimed_levels"]?.["level_4"]){
                                    profilesAjax[index]["slayerBosses"]["voidling4"] = true;
                                }
                            }

                            //hotm level for forge cal
                            // console.log(180,profile["members"][member]["mining_core"]?.["experience"]);
                            if(profile["members"][member]["mining_core"]?.["experience"]){
                                profilesAjax[index]["hotmXp"] = Math.max(profile["members"][member]["mining_core"]?.["experience"],profilesAjax[index]["hotmXp"]);
                                // console.log(183,profilesAjax[index]["hotmXp"]);
                            }
                            
                            // console.log(186,profilesAjax[index]["hotmXp"]);

                        });
                        profilesAjax[index]["cuteName"] = profile["cute_name"];
                    });
                    profilesAjax.sort((a,b)=>{
                        return b["rawMinions"].length-a["rawMinions"].length;
                    });
                    console.log("finished findProfile");
                    resolve(profilesAjax);
                })
                .catch((err)=>{
                    console.log("catch from skyblock",err);
                    settings.hasError=true;
                    settings.errorMsg = "Error occured when finding the profile. The player has not played Skyblock before.";
                    resolve("error");
                });
            })
            .catch((err)=>{
                console.log("catch from mojang",err);
                settings.hasError=true;
                settings.errorMsg = "Error occured when finding the profile. The player does not exist.";
                resolve("error");
            });
        }, 1000);
    });
}

exports.findAuctions = async function findAuctions(settings){
    return new Promise((resolve)=>{
        setTimeout(() => {
            fetch(process.env.BACKEND_LINK+"/auctions/forge")
            .then(result => result.json())
            .then(({finishTime,data,status,errorMsg,news}) => {
                if(status!="success"){
                    console.log("catch from auctions backend (catch from findAuctions reading backend)");
                    settings.lastUpdatedAuctionServer = new Date(finishTime);
                    settings.hasError=true;
                    settings.errorMsg = errorMsg || "Error occured when getting auction prices. (catch from findAuctions reading backend)";
                    settings.news = news;
                    resolve("error");
                }else{
                    settings.lastUpdatedAuctionServer = new Date(finishTime);
                    settings.news = news;
                    resolve(data);
                }
            }).catch((err)=>{
                console.log("catch from findAuctions",err);
                settings.hasError=true;
                settings.errorMsg = "Error occured when getting auction prices. (catch from findAuctions)";
                resolve("error");
            });
        }, 1000);
    });
}

exports.findAuction = async function findAuction(queryString,settings){
    return new Promise((resolve)=>{
        setTimeout(() => {
            fetch(process.env.BACKEND_LINK+"/auctions/get"+queryString)
            .then(result => result.json())
            .then(({finishTime,data,status,errorMsg,news}) => {
                if(status!="success"){
                    console.log("catch from auctions backend (catch from findAuction reading backend)");
                    settings.lastUpdatedAuctionServer = new Date(finishTime);
                    settings.hasError=true;
                    settings.errorMsg = errorMsg || "Error occured when getting auction prices. (catch from findAuction reading backend)";
                    settings.news = news;
                    resolve("error");
                }else{
                    settings.lastUpdatedAuctionServer = new Date(finishTime);
                    settings.news = news;
                    resolve(data);
                }
            }).catch((err)=>{
                console.log("catch from findAuctions",err);
                settings.hasError=true;
                settings.errorMsg = "Error occured when getting auction prices. (catch from findAuction)";
                resolve("error");
            });
        }, 1000);
    });
}

//NEW IMPLEMENTATION IN FRONTEND
// // internal
// function merge(data1, data2) {
//     if (data1.length==0) {
//         return data2;
//     } else if (data2.length==0) {
//         return data1;
//     } else if (data1[0].unitPrice<data2[0].unitPrice) {
//         return [data1[0], ...merge(data1.slice(1), data2)];
//     } else {
//         return [data2[0], ...merge(data1, data2.slice(1))];
//     }
// }

// function checkValid(name) {
//     if (auctionsInForge.includes(name)||auctionsInForgeQuantity.includes(name)) {
//         return true;
//     } else {
//         for (let i=0; i<auctionsInForgeApprox.length; i++) {
//             if (name.includes(auctionsInForgeApprox[i])) {
//                 return true;
//             }
//         }
//         for (let i=0; i<auctionsInForgeQuantityApprox.length; i++) {
//             if (name.includes(auctionsInForgeQuantityApprox[i])) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// function checkQuantityNeeded(name) {
//     if (auctionsInForgeQuantity.includes(name)) {
//         return true;
//     } else {
//         for (let i=0; i<auctionsInForgeQuantityApprox.length; i++) {
//             if (name.includes(auctionsInForgeQuantityApprox[i])) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// // internal
// async function updateAuction(page) {
//     return new Promise((resolve)=>{
//         setTimeout(() => {
//             const minAuctionFragment={
//                 totalPages: null,
//                 status: "success",
//                 data: {}, // object with key = item name, value = array of prices
//             }; // object with keys item names, values prices
//             fetch("https://api.hypixel.net/skyblock/auctions?page="+page)
//                 .then((result) => result.json())
//                 .then(async ({auctions, totalPages}) => {
//                     minAuctionFragment.totalPages = totalPages;
//                     let taskNeeded = 0;
//                     let taskFinished = 0; // counter for async await, only say resolve when taskFinished == taskNeeded
//                     for (let i = 0; i<auctions.length; i++) {
//                         const auction = auctions[i];

//                         if (auction.bin&&checkValid(auction["item_name"])) {
//                             const currentPrice = auction["starting_bid"];
//                             if (checkQuantityNeeded(auction["item_name"])) {
//                                 taskNeeded++;
//                                 let quantity = 1;
//                                 const itemBytes = Buffer.from(auction["item_bytes"], "base64");
//                                 nbt.parse(itemBytes, (error, json) => {
//                                     if (error) {
//                                         console.log(error);
//                                     }
//                                     quantity = json.value.i.value.value[0].Count.value || 1;

//                                     if (minAuctionFragment.data[auction["item_name"]]) {
//                                         minAuctionFragment.data[auction["item_name"]].push({
//                                             currentPrice: currentPrice,
//                                             quantity: quantity,
//                                             unitPrice: currentPrice/quantity,
//                                         });
//                                     } else {
//                                         minAuctionFragment.data[auction["item_name"]] = [{
//                                             currentPrice: currentPrice,
//                                             quantity: quantity,
//                                             unitPrice: currentPrice/quantity,
//                                         }];
//                                     }
//                                     taskFinished++;
//                                     if (taskFinished==taskNeeded) {
//                                         Object.keys(minAuctionFragment.data).forEach((item)=>{
//                                             minAuctionFragment.data[item].sort((a, b)=>{
//                                                 return a.unitPrice-b.unitPrice;
//                                             });
//                                         });
//                                         console.log("auction page fetch done " + page);
//                                         resolve(minAuctionFragment);
//                                     }
//                                 });
//                             } else {
//                                 if (minAuctionFragment.data[auction["item_name"]]) {
//                                     minAuctionFragment.data[auction["item_name"]].push({
//                                         currentPrice: currentPrice,
//                                         quantity: 1,
//                                         unitPrice: currentPrice,
//                                     });
//                                 } else {
//                                     minAuctionFragment.data[auction["item_name"]] = [{
//                                         currentPrice: currentPrice,
//                                         quantity: 1,
//                                         unitPrice: currentPrice,
//                                     }];
//                                 }
//                             }
//                         }
//                     }
//                     if (taskFinished==taskNeeded) {
//                         Object.keys(minAuctionFragment.data).forEach((item)=>{
//                             minAuctionFragment.data[item].sort((a, b)=>{
//                                 return a.unitPrice-b.unitPrice;
//                             });
//                         });
//                         console.log("auction page fetch done " + page);
//                         resolve(minAuctionFragment);
//                     }
//                 })
//                 .catch((err)=>{
//                     console.log("catch from updateAuction", err);
//                     minAuctionFragment.status="error";
//                     minAuctionFragment.errorMsg = "Error occured when getting auction prices. (catch from updateAuction)";
//                     resolve(minAuctionFragment);
//                 });
//         }, 1000);
//     });
// }

// // scheduled function every 5 minutes
// exports.updateAuctions = async ()=>{
//     return new Promise((resolve)=>{
//         setTimeout(() => {
//             const minAuctions = {
//                 status: "success",
//                 data: null,
//                 startTime: Date.now(),
//                 finishTime: null,
//             };
//             updateAuction(0).then((minAuctionFragment0)=>{
//                 if (minAuctionFragment0.status!="success") {
//                     throw new Error("error");
//                 }
//                 console.log(minAuctionFragment0.totalPages);
//                 minAuctions.data=minAuctionFragment0.data;
//                 const promiseList = [];
//                 for (let i=1; i<minAuctionFragment0.totalPages; i++) {
//                     promiseList.push(updateAuction(i));
//                 }
//                 Promise.all(promiseList).then(async (minAuctionFragments) => { // call other pages after knowing total number of pages
//                     minAuctionFragments.forEach((minAuctionFragment)=>{
//                         if (minAuctionFragment.status!="success") {
//                             throw new Error("error");
//                         }
//                         Object.keys(minAuctionFragment.data).forEach((item)=>{
//                             if (minAuctions.data[item]) {
//                                 minAuctions.data[item] = merge(minAuctions.data[item], minAuctionFragment.data[item]);
//                             } else {
//                                 minAuctions.data[item] = minAuctionFragment.data[item];
//                             }
//                         });
//                     });
//                     minAuctions.finishTime = Date.now();
//                     resolve(minAuctions);
//                 }).catch((err)=>{
//                     console.log("catch from updateAuctions", err);
//                     minAuctions.status="error";
//                     minAuctions.errorMsg = "Error occured when getting auction prices. (catch from updateAuctions)";
//                     resolve(minAuctions);
//                 });
//             }).catch((err)=>{
//                 console.log("catch from updateAuctions", err);
//                 minAuctions.status="error";
//                 minAuctions.errorMsg = "Error occured when getting auction prices. (catch from updateAuctions)";
//                 resolve(minAuctions);
//             });
//         }, 1000);
//     });
// };
