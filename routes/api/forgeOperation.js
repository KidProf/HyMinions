var {moneyRepresentation, dateTimeToString, findBazaar, findProfile, findAuctions, determineBuyList, dataUnitPrice} = require("./general.js");
const { calculateMinionsCostLink } = require("./minionsCostOperation.js");
var {sourceBazaar,sourceAuction,sourceWarning,sourceOthers,auctionTax,auctionTaxUnderThreshold,auctionTaxThreshold, gemstoneCollectionName, hotmXpList} = require("./forgeData.js");
var {merge} = require("./general.js");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar,lastUpdatedAuction, profileNames, profileInfo, hadError=false, news, lastUpdatedAuctionServer;


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

    if(settings.bz==1){
        //check if not initialized properly
        forges.forEach((forge)=>{
            forge.price = forge.price || 0;
            forge.materials.forEach((material)=>{
                if(!material.prices){
                    material.prices = new Array(material.options.length).fill(0);
                }
            })
        })
    }else{
        //reset all variables
        forges.forEach((forge)=>{
            forge.price = 0;
            forge.materials.forEach((material)=>{
                material.prices = new Array(material.options.length).fill(0);
            })
        })
    }

    if(settings.ah==1){
        //check if not initialized properly
        forges.forEach((forge)=>{
            forge.priceList = forge.priceList || [];
            forge.materials.forEach((material)=>{
                if(!material.pricesList){
                    material.pricesList = new Array(material.options.length).fill([]);
                }
            })
        })
    }else{
        //reset all variables
        forges.forEach((forge)=>{
            forge.priceList = [];
            forge.materials.forEach((material)=>{
                material.pricesList = new Array(material.options.length).fill([]);
            })
        })
    }

    //settings.bz = 1 load
    //= -1/0 won't load. It is a UI difference - will precheck for users when it is 0, will not when it is -1
    if(settings.bz==1&&(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000)){ //1 min time out
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
                    for(let i=0;i<material.options.length;i++){
                        if(material.source&&material.source[i]==sourceBazaar){
                            material.prices[i] = bazaarPrices[0][material.options[i]] || material.prices[i]; //buy instantly
                        }
                    }
                })
            });
        });
    }
    
    //settings.ah = 1 load
    //= -1/0 won't load. It is a UI difference - will precheck for users when it is 0, will not when it is -1
    if(settings.ah==1&&(!lastUpdatedAuction||Date.now()-lastUpdatedAuction>5*60*1000)){ //call again if prev result has error, 5 min timeout        
        lastUpdatedAuction = Date.now();
        await findAuctions(settings).then((minAuctions)=>{
            lastUpdatedAuctionServer = settings.lastUpdatedAuctionServer;
            news = settings.news;
            //incorporate minAuctions into forges
            forges.forEach((forge)=>{
                if(!forge.source){ //not given source
                    forge.priceList = [];
                    if(forge.approximateMatch){
                        Object.keys(minAuctions).forEach((key)=>{
                            if(key.includes(forge.name)){
                                forge.priceList = merge(forge.priceList,minAuctions[key]);
                            }
                        })
                    }else{
                        forge.priceList = minAuctions[forge.name] || [];
                    }
                } 
                forge.materials.forEach((material)=>{
                    for(let i=0;i<material.options.length;i++){
                        if(!(material.source&&material.source[i])){
                            material.pricesList[i] = minAuctions[material.options[i]] || [];//product
                            if(material.approximateMatch){
                                Object.keys(minAuctions).forEach((key)=>{
                                    if(key.includes(material.options[i])){
                                        material.pricesList[i] = merge(material.pricesList[i],minAuctions[key]);
                                    }
                                })
                            }
                        }
                    }
                })
            });
        });
    }

    if(settings.bz!=1) lastUpdatedBazaar = null;
    if(settings.ah!=1) lastUpdatedAuction = null;

    // settings.lastUpdatedAuction = lastUpdatedAuction ? dateTimeToString(lastUpdatedAuction): null;
    settings.lastUpdatedProfile = lastUpdatedProfile ? dateTimeToString(lastUpdatedProfile): null;
    settings.lastUpdatedBazaar = lastUpdatedBazaar ? dateTimeToString(lastUpdatedBazaar) : null;
    settings.lastUpdatedAuctionServerString = settings.lastUpdatedAuctionServer ? dateTimeToString(settings.lastUpdatedAuctionServer) : null;
    settings.lastUpdatedAuctionServer = lastUpdatedAuctionServer;
    settings.news = news;

    if(settings.hasError&&true){
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
            materials: new Array(forge.materials.length),
            totalCost: 0,
            duration: forge.duration,
            durationText: forge.durationText,
            gemstoneRequirement: forge.gemstoneRequirement,
            hotmRequirement: forge.hotmRequirement,
            collectionsRequirement: forge.collectionsRequirement,
            source: forge.source,
            last: 0,
            rawId: forge.rawId || constructRawId(forge.name),
        };
        let price, priceText;
        switch(forge.source){
            case sourceBazaar:
                price = forge.price*(1-settings.tax/100);
                priceText = moneyRepresentation(price,settings.showDetails) + " (BZ)";
                break;
            case sourceOthers:
            case sourceWarning:
                price = forge.codedPrice;
                priceText = moneyRepresentation(price,settings.showDetails);
                break;
            default: //AH
                let priceBeforeTax = 0
                if(forge.priceList.length>0){
                    priceBeforeTax = forge.priceList[0][dataUnitPrice];
                }else{
                    outputForge.productOutOfStock = true;
                }
                
                price = priceBeforeTax >= auctionTaxThreshold ? priceBeforeTax*(1-auctionTax/100) : priceBeforeTax*(1-auctionTaxUnderThreshold/100);
                priceText = moneyRepresentation(price,settings.showDetails) + " (AH)";
                outputForge.noOfAuctions = forge.priceList.length;
                break;
        }
        outputForge.price = price;
        outputForge.priceText = priceText;

        let materialsOutOfStock = false;
        forge.materials.forEach((material,index)=>{
            let minIndex = 0;
            if(material.options.length!=1){
                minIndex = compareMaterialCost(material); 
                //*** will break if there are more than one auction options, as compareMaterialCost is not ready to accept new auction price system.
            }
            let quantity = material.quantity[minIndex],
                price, 
                priceText, 
                componentCost = 0, 
                maxPrice, 
                outOfStock=false,
                violateOverbuyTolerance=false;

            switch(material.source ? material.source[minIndex]: sourceAuction){
                case sourceBazaar:
                    price = material.prices[minIndex]*(1+settings.tax/100); //PLUS
                    priceText = moneyRepresentation(price,settings.showDetails) + " (BZ)";
                    componentCost = price*quantity;
                    if(settings.bz!=1){
                        outOfStock = true;
                        materialsOutOfStock = true;
                    }
                    break;
                case sourceOthers:
                case sourceWarning:
                    price = material.codedPrices[minIndex];
                    priceText = moneyRepresentation(price,settings.showDetails);
                    componentCost = price*quantity;
                    break;
                default: //AH
                    //no tax when u buy stuff from AH
                    // console.log(material.options[0],quantity);
                    let buyInfo = determineBuyList(material.pricesList[minIndex],quantity,settings.overbuyTolerance);
                    // console.log(buyInfo);
                    if(buyInfo.status=="fail"){
                        outOfStock = true;
                        materialsOutOfStock = true;
                        componentCost = 0;
                        price = 0;
                        priceText = "0 (AH)";
                        break;
                    }
                    componentCost=buyInfo.componentCost;
                    violateOverbuyTolerance=buyInfo.violateOverbuyTolerance;
                    price = buyInfo.buyList[0][dataUnitPrice];
                    maxPrice = buyInfo.buyList[buyInfo.buyList.length-1][dataUnitPrice];
                    if(price!=maxPrice){
                        priceText = moneyRepresentation(price,settings.showDetails) + " to " + moneyRepresentation(maxPrice,settings.showDetails) + " (AH)";
                    }else{
                        priceText = moneyRepresentation(price,settings.showDetails) + " (AH)";
                    }
                    
                    break;
            }

            outputForge.materials[index] = {
                name: material.options[minIndex],
                quantity: quantity,
                priceText: priceText,
                componentCost: componentCost,
                componentCostText: moneyRepresentation(componentCost),
                outOfStock: outOfStock,
                approximateMatch: material.approximateMatch?.[minIndex],
                violateOverbuyTolerance:violateOverbuyTolerance,
                source: material.source ? material.source[minIndex] : null,
            }
            outputForge.totalCost += outputForge.materials[index].componentCost;
        });
        outputForge.totalCostText = moneyRepresentation(outputForge.totalCost);
        outputForge.profit = outputForge.price - outputForge.totalCost;
        if(outputForge.duration) outputForge.profitPerHour = outputForge.profit/outputForge.duration;
        if(outputForge.totalCost != 0) outputForge.profitRatio = outputForge.price/outputForge.totalCost;

        outputForge.profitText = moneyRepresentation(outputForge.profit);
        outputForge.profitPerHourText = outputForge.duration ? moneyRepresentation(outputForge.profitPerHour) : "N/A";
        outputForge.profitRatioText = outputForge.totalCost != 0 ? Math.round(outputForge.profitRatio*100)/100 : "N/A";
        outputForge.materialsOutOfStock = materialsOutOfStock;

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
        if(outputForge.materialsOutOfStock){
            outputForge.last = 5;
            outputForge.danger=true; //red label
        }
        if(outputForge.profit<0){
            outputForge.last += 2;
            outputForge.danger=true; //red label
        } 
        
        //so the order is: have requirements + profit (0) -> no requirements + profit (1) -> have requirements + loss (3) -> no requirements + loss (4) -> materialsoutofstock (5/7)
        

        outputForges.push(outputForge);
    });

    if(settings.sortBy==1){ //sort by profit per hour
        outputForges.sort((a,b)=>{
            //last: things labelled last shd be put at the end
            if(b.last<a.last) return 1; //last asc
            else if(b.last>a.last) return -1; 
            else{
                if(!a.duration&&!b.duration){
                    if(b.name<a.name) return 1; //name asc
                    else if(b.name>a.name) return -1;
                    else return 0;
                }else if(a.duration&&b.duration){
                    if(b.profitPerHour>a.profitPerHour) return 1; //profit desc
                    else if(b.profitPerHour<a.profitPerHour) return -1;
                    if(b.name<a.name) return 1; //name asc
                    else if(b.name>a.name) return -1;
                    else return 0;
                }else if(b.duration){//if no duration, put at last 
                    return 1; //b shd be before a
                }else{
                    return -1; //a shd be before b
                }
            }
        });
    }else if(settings.sortBy==2){ //sort by ratio
        outputForges.sort((a,b)=>{
            //last: things labelled last shd be put at the end
            if(b.last<a.last) return 1; //last asc
            else if(b.last>a.last) return -1; 
            else{
                if(a.totalCost == 0&&b.totalCost == 0){
                    if(b.name<a.name) return 1; //name asc
                    else if(b.name>a.name) return -1;
                    else return 0;
                }else if(a.totalCost != 0&&b.totalCost != 0){
                    if(b.profitRatio>a.profitRatio) return 1; //profit desc
                    else if(b.profitRatio<a.profitRatio) return -1;
                    if(b.name<a.name) return 1; //name asc
                    else if(b.name>a.name) return -1;
                    else return 0;
                }else if(b.totalCost == 0){//if no duration, put at last 
                    return 1; //b shd be before a
                }else{
                    return -1; //a shd be before b
                }
            }
        });
    }else{ //sort by total profit
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
    }


    
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

    function constructRawId(name){
        return ([...name].map((character)=>{
            if(character==' '||character=='-'){
                return '_';
            }else{
                return character.toUpperCase();
            }
        })).join('');
    }
}
