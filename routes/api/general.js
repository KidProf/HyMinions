var fetch = require('cross-fetch');
var itemNames = require("./itemNames.json");
var {minions, soulflowItem} = require("./minionsData.js");

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

exports.findBazaar = async function findBazaar(settings){
    return new Promise((resolve)=>{
        setTimeout(() => {
            fetch("https://api.hypixel.net/skyblock/bazaar?key="+process.env.HYPIXEL_KEY)
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
                        Object.keys(profile["members"]).forEach((member, index2)=>{
                            if(profile["members"][member]["crafted_generators"]){
                                profilesAjax[index]["rawMinions"].push(...profile["members"][member]["crafted_generators"]);
                            }
                        });
                        Object.keys(profile["members"]).forEach((member, index2)=>{
                            if(profile["members"][member]["unlocked_coll_tiers"]){
                                profilesAjax[index]["rawCollections"].push(...profile["members"][member]["unlocked_coll_tiers"]);
                            }
                        });
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
                    
                        Object.keys(profile["members"]).forEach((member, index2)=>{
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