var {moneyRepresentation, dateTimeToString, findBazaar, findProfile} = require("./general.js");
var {soulflowItem} = require("./minionsData.js");

let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, profileNames, hadError=false;
    
exports.calculateMinionsProfit = async function(minions, settings){
    console.log(settings.name,minecraftName);
    //console.log(Date.now()-lastUpdatedBazaar);
    if((settings.useProfile)&&(settings.name!=minecraftName||hadError||Date.now()-lastUpdatedProfile>5*60*1000)){ //don't call api again if identical name, but call again if prev result has error, 5 min timeout
        await findProfile(settings.name,settings);
        //await Promise.all([findBazaar(), findProfile(settings.name)]);
        minecraftName = settings.name;
        lastUpdatedProfile = Date.now();
    }
    if(settings.sellingTo==1&&(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000)){ //1 min time out
        lastUpdatedBazaar = Date.now();
        await findBazaar(settings).then((bazaarPrices)=>{
            if(bazaarPrices=="error"){
                return;
            }
            soulflowItem.bazaarPrice=new Array(soulflowItem.variants.length);
            soulflowItem.variants.forEach((variant,index)=>{
                soulflowItem.bazaarPrice[index] = new Array(2);
                if(bazaarPrices[0][variant]){
                    soulflowItem.bazaarPrice[index][0] = bazaarPrices[0][variant];
                    soulflowItem.bazaarPrice[index][1] = bazaarPrices[1][variant];
                }else{
                    //use NPC price as substitute
                    if(soulflowItem.variantsNpcPrices){
                        soulflowItem.bazaarPrice[index][0] = soulflowItem.variantsNpcPrices[index];
                    }else{
                        soulflowItem.bazaarPrice[index][0] = soulflowItem.npcPrice*soulflowItem.variantsEquiv[index];
                    }
                    soulflowItem.bazaarPrice[index][1] = soulflowItem.bazaarPrice[index][0];
                }
            });

            minions.forEach((minion)=>{
                minion.products.forEach((product)=>{
                    product.bazaarPrice=new Array(product.variants.length);
                    product.variants.forEach((variant,index)=>{
                        product.bazaarPrice[index] = new Array(2);
                        if(bazaarPrices[0][variant]){
                            product.bazaarPrice[index][0] = bazaarPrices[0][variant];
                            product.bazaarPrice[index][1] = bazaarPrices[1][variant];
                        }else{
                            //use NPC price as substitute
                            if(product.variantsNpcPrices){
                                product.bazaarPrice[index][0] = product.variantsNpcPrices[index];
                            }else{
                                product.bazaarPrice[index][0] = product.npcPrice*product.variantsEquiv[index];
                            }
                            product.bazaarPrice[index][1] = product.bazaarPrice[index][0];
                        }
                    });
                });
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

    //check to see if there are individual settings
    if(settings.individualSettings){
        minions.forEach((minion)=>{
            minion.hasIndividualSettings = settings.individualSettings[minion.id].tier ? 1 : 0;
            if(minion.hasIndividualSettings) console.log(settings.individualSettings[minion.id].products);
        });
    }else{
        minions.forEach((minion)=>{
            minion.hasIndividualSettings = 0;
        });
    }

    //check to see if diamond spreading is added to the minions array
    // if(diamondSpreadingAdded==false){
    //     minions.forEach((minion)=>{
    //         minion.products.push(diamondSpreadingItem);
    //     });
    //     diamondSpreadingAdded = true;
    // }

    //calculate profit
    minions.forEach((minion)=>{
        calculateMinionProfit(settings,minion);
    });
    minions.sort((a,b) =>{
        if(b.totalProfit>a.totalProfit) return 1; //total profit desc
        else if(b.totalProfit<a.totalProfit) return -1;
        else if(b.name<a.name) return 1; //name asc
        else if(b.name>a.name) return -1;
        else return 0;
    });
    // minions.forEach((minion)=>{
    //     console.log(minion.totalProfit);
    // })

    function calculateMinionProfit(settings,minion){
        if(minion.hasIndividualSettings==1){
            minion.tier = settings.individualSettings[minion.id].tier; //individual settings override
            minion.fuel = settings.individualSettings[minion.id].fuel;
        }else if(settings.useProfile){
            minion.tier=minion.profilesTier[settings.profile]; //use profile minion tier
            minion.fuel = settings.fuel;
        }else{
            minion.tier = Math.min(settings.tier,minion.tierDelay.length);//some has tier 12 some don't
            minion.fuel = settings.fuel;
        }
        if(settings.diamondSpreading==0){
            minion.hasDiamondSpreading=0;
        }else{
            if(!minion.diamondSpreadingCriteria){
                //if diamond spreading criteria does not exist
                minion.hasDiamondSpreading = 1;
            }else if(minion.canCompactor==false&&settings.calculationType==1&&settings.superCompactor==1&&settings.diamondSpreading>=1){
                //if compactors are selected but the minion does not have compactor, can use diamond spreading
                minion.hasDiamondSpreading = 1;
            }else if(minion.diamondSpreadingCriteria<=settings.diamondSpreading){
                minion.hasDiamondSpreading = 1;
            }else{
                minion.hasDiamondSpreading = 0;
            }
        }

        minion.outputProducts = new Array();
        minion.itemsHarvested = 0;

        if(minion.tier==0){
            minion.totalProfit = 0;
            minion.totalProfitText = 0;
            minion.profitPerHour = 0;
            return;
        }

        if(settings.calculationType==0){
            //old calculation type

            if(settings.productForm==-2){ //max profit(enchanted forms)
                minion.products.forEach((product,productIndex)=>{
                    //override
                    if(minion.hasIndividualSettings==1){
                        product.selectedVariant = settings.individualSettings[minion.id].products[productIndex]; //individual settings override
                    }else if(product.defaultVariant){
                        product.selectedVariant = product.defaultVariant;
                        if(product.defaultVariant!=-1){
                            calculateVariantProfitManual(settings,minion,product,product.defaultVariant);
                        }
                    }else if(!minion.hasDiamondSpreading&&product.item=="Diamond (Spreading)"){
                        product.selectedVariant = -1;
                    }else{
                        let maxVariantIndex = 1, variantIndex = 1, maxProfit = 0;
                        while(variantIndex<product.variants.length){
    
                            if(product.variantsIsEnchanted==undefined||product.variantsIsEnchanted[variantIndex]==1){
                                let profit = compareVariantProfit(settings,minion,product,variantIndex);
                                if(profit>maxProfit){
                                    maxProfit = profit;
                                    maxVariantIndex = variantIndex;
                                }
                            }
                            variantIndex++;
                        }
                        if(product.item=="Diamond (Spreading)"){
                            product.perTime = minion.itemsHarvested*0.1;
                        }
                        product.selectedVariant = maxVariantIndex;
                        calculateVariantProfitManual(settings,minion,product,maxVariantIndex);
                    }



                });
                // if(minion.hasDiamondSpreading){
                //     let maxVariantIndex = 1, variantIndex = 1, maxProfit = 0;
                //     while(variantIndex<diamondSpreadingItem.variants.length){
                //         let profit = compareVariantProfit(settings,minion,diamondSpreadingItem,variantIndex);
                //         if(profit>maxProfit){
                //             maxProfit = profit;
                //             maxVariantIndex = variantIndex;
                //         }
                //         variantIndex++;                
                //     }
                //     diamondSpreadingItem.perTime = minion.itemsHarvested*0.1;
                //     calculateVariantProfitManual(settings,minion,diamondSpreadingItem,maxVariantIndex);
                // }
            }else if(settings.productForm==-1){ //max profit
                minion.products.forEach((product,productIndex)=>{
                    //override
                    if(minion.hasIndividualSettings==1){
                        product.selectedVariant = settings.individualSettings[minion.id].products[productIndex]; //individual settings override
                    }else if(product.defaultVariant){
                        product.selectedVariant = product.defaultVariant;
                        if(product.defaultVariant!=-1){
                            calculateVariantProfitManual(settings,minion,product,product.defaultVariant);
                        }
                    }
                    else if(!minion.hasDiamondSpreading&&product.item=="Diamond (Spreading)"){
                        product.selectedVariant = -1;
                    }else{
                        let maxVariantIndex = 0, variantIndex = 0, maxProfit = 0;
                        while(variantIndex<product.variants.length){
                            let profit = compareVariantProfit(settings,minion,product,variantIndex);
                            if(profit>maxProfit){
                                maxProfit = profit;
                                maxVariantIndex = variantIndex;
                            }
                            variantIndex++;                
                        }
                        if(product.item=="Diamond (Spreading)"){
                            product.perTime = minion.itemsHarvested*0.1;
                        }
                        product.selectedVariant = maxVariantIndex;
                        calculateVariantProfitManual(settings,minion,product,maxVariantIndex);
                    }
                });

                // if(minion.hasDiamondSpreading){
                //     let maxVariantIndex = 0, variantIndex = 0, maxProfit = 0;
                //     while(variantIndex<diamondSpreadingItem.variants.length){
                //         let profit = compareVariantProfit(settings,minion,diamondSpreadingItem,variantIndex);
                //         if(profit>maxProfit){
                //             maxProfit = profit;
                //             maxVariantIndex = variantIndex;
                //         }
                //         variantIndex++;                
                //     }
                //     diamondSpreadingItem.perTime = minion.itemsHarvested*0.1;
                //     calculateVariantProfitManual(settings,minion,diamondSpreadingItem,maxVariantIndex);
                // }
                //console.log(minion.outputProducts);
            }else{
                //just find that form
                minion.products.forEach((product,productIndex)=>{
                    //override
                    if(minion.hasIndividualSettings==1){
                        product.selectedVariant = settings.individualSettings[minion.id].products[productIndex]; //individual settings override
                    }else if(product.defaultVariant){
                        product.selectedVariant = product.defaultVariant;
                        if(product.defaultVariant!=-1){
                            calculateVariantProfitManual(settings,minion,product,product.defaultVariant);
                        }
                    }
                    else if(!minion.hasDiamondSpreading&&product.item=="Diamond (Spreading)"){
                        product.selectedVariant = -1;
                    }else{
                        let variantIndex = settings.productForm;

                        //while the index refers to enchanted form && (it does not exists || (it is not the only enchanted form && it is not an enchanted form)) e.g. snow block falls in this category
                        while(variantIndex>=0&&((!product.variants[variantIndex])||
                        (variantIndex!=0&&!(product.variantsIsEnchanted ? product.variantsIsEnchanted[variantIndex] : 1)))){
                            variantIndex--;
                        }
                        if(product.item=="Diamond (Spreading)"){
                            product.perTime = minion.itemsHarvested*0.1;
                        }
                        product.selectedVariant = maxVariantIndex;
                        calculateVariantProfitManual(settings,minion,product,maxVariantIndex);
                    }
                });
                // if(minion.hasDiamondSpreading){
                //     diamondSpreadingItem.perTime = minion.itemsHarvested*0.1;
                //     calculateVariantProfitManual(settings,minion,diamondSpreadingItem,settings.productForm);
                // }
                //console.log(minion.outputProducts);
                
            }
        }else{
            //new calculation type
            minion.products.forEach((product,productIndex)=>{
                let variantIndex;
                let totalItems;
                if(product.item=="Diamond (Spreading)"){
                    totalItems = Math.floor(minion.itemsHarvested*0.1);
                }else{
                    //itemsPerHour = 3600/time between actions/2 (offline)* res generated per time* (1+fuel/100) / amount of res needed to generate the enchanted form
                    totalItems = Math.floor(settings.offlineTime*3600/minion.tierDelay[minion.tier-1]/2*product.perTime*(1+minion.fuel/100));
                    minion.itemsHarvested += totalItems;
                }
                //SOULFLOW
                if(settings.soulflow==1){
                    totalItems = totalItems*0.5;
                }
                
                if(minion.hasIndividualSettings==1){
                    variantIndex = settings.individualSettings[minion.id].products[productIndex]; //individual settings override
                }else if(product.defaultVariant){ //override
                    variantIndex = product.defaultVariant;
                }else if(!minion.hasDiamondSpreading&&product.item=="Diamond (Spreading)"){
                    variantIndex = -1;
                }else{
                    if(settings.superCompactor>=2){ //super compactor/ dwarven compactor
                        variantIndex = product.variants.length-1;
                        if(product.variantsIsEnchanted){ //eliminate snow block option
                            while(product.variantsIsEnchanted[variantIndex]==0&&variantIndex>=0){
                                variantIndex--;
                            }
                        }
                    }else if(settings.superCompactor==1&&product.canCompactor){ //compactor
                        variantIndex = product.compactor.minimumEnchanted ? product.compactor.minimumEnchanted : 0, maxProfit = 0;
                        let endOfLoop = settings.noCrafting ? Math.min(product.variants.length-1,variantIndex) : product.variants.length-1
                        for(index=variantIndex;index<=endOfLoop;index++){
                            let profit = compareVariantProfit(settings,minion,product,index); 
                            if(profit>maxProfit){
                                variantIndex = index;
                                maxProfit = profit;
                            }
                        }
                    }else{ //superCompactor = 0 / cannot be compacted by compactor
                        variantIndex = 0, maxProfit = 0;
                        let endOfLoop = settings.noCrafting ? Math.min(product.variants.length-1,variantIndex) : product.variants.length-1
                        for(index=variantIndex;index<=endOfLoop;index++){
                            let profit = compareVariantProfit(settings,minion,product,index); 
                            if(profit>maxProfit){
                                variantIndex = index;
                                maxProfit = profit;
                            }
                        }
                    }
                }
                
                //record down variant used
                product.selectedVariant = variantIndex;
                //variant index >=0 && the variant index is an enchanted form && still have items
                while(variantIndex>=0&&totalItems>0){
                    
                    let totalItemsVariant = (totalItems-(totalItems%product.variantsEquiv[variantIndex]))/product.variantsEquiv[variantIndex]; //(total-remainder)/divisor to get intergral ans
                    totalItems = totalItems%product.variantsEquiv[variantIndex];
                    if(totalItemsVariant!=0){
                        calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant);
                    }else{
                        product.selectedVariant--;
                    }
                    variantIndex--;
                }
                //console.log(minion.name,product.selectedVariant);
            });

            //SOULFLOW
            if(settings.soulflow==1){
                let product = soulflowItem;
                let variantIndex;
                let totalItems = Math.floor(settings.offlineTime*3600/220);
                
                if(settings.superCompactor>=2){ //super compactor/ dwarven compactor
                    variantIndex = product.variants.length-1;
                    if(product.variantsIsEnchanted){ //eliminate snow block option
                        while(product.variantsIsEnchanted[variantIndex]==0&&variantIndex>=0){
                            variantIndex--;
                        }
                    }
                }else if(settings.superCompactor==1&&product.canCompactor){ //compactor
                    variantIndex = product.compactor.minimumEnchanted ? product.compactor.minimumEnchanted : 0, maxProfit = 0;
                    let endOfLoop = settings.noCrafting ? Math.min(product.variants.length-1,variantIndex) : product.variants.length-1
                    for(index=variantIndex;index<=endOfLoop;index++){
                        let profit = compareVariantProfit(settings,minion,product,index); 
                        if(profit>maxProfit){
                            variantIndex = index;
                            maxProfit = profit;
                        }
                    }
                }else{ //superCompactor = 0 / cannot be compacted by compactor
                    variantIndex = 0, maxProfit = 0;
                    let endOfLoop = settings.noCrafting ? Math.min(product.variants.length-1,variantIndex) : product.variants.length-1
                    for(index=variantIndex;index<=endOfLoop;index++){
                        let profit = compareVariantProfit(settings,minion,product,index); 
                        if(profit>maxProfit){
                            variantIndex = index;
                            maxProfit = profit;
                        }
                    }
                }
                //record down variant used
                product.selectedVariant = variantIndex;
                //variant index >=0 && the variant index is an enchanted form && still have items
                while(variantIndex>=0&&totalItems>0){
                    
                    let totalItemsVariant = (totalItems-(totalItems%product.variantsEquiv[variantIndex]))/product.variantsEquiv[variantIndex]; //(total-remainder)/divisor to get intergral ans
                    totalItems = totalItems%product.variantsEquiv[variantIndex];
                    if(totalItemsVariant!=0){
                        calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant);
                    }else{
                        product.selectedVariant--;
                    }
                    variantIndex--;
                } 
            }

            // if(minion.hasDiamondSpreading){
            //     let totalItems = Math.floor(minion.itemsHarvested*0.1);
            //     let product = diamondSpreadingItem;
            //     let variantIndex;
            //     if(settings.superCompactor>=2){
            //         variantIndex = product.variants.length-1;
            //     }else if(settings.superCompactor==1&&product.canCompactor){
            //         variantIndex = product.compactor.minimumEnchanted ? product.compactor.minimumEnchanted : 0, maxProfit = 0;
            //         for(index=variantIndex;index<product.variants.length;index++){
            //             let profit = compareVariantProfit(settings,minion,product,index); 
            //             if(profit>maxProfit){
            //                 variantIndex = index;
            //                 maxProfit = profit;
            //             }
            //         }
            //     }else{ //superCompactor = 0 / cannot be compacted by compactor
            //         variantIndex = 0, maxProfit = 0;
            //         for(index=variantIndex;index<product.variants.length;index++){
            //             let profit = compareVariantProfit(settings,minion,product,index); 
            //             if(profit>maxProfit){
            //                 variantIndex = index;
            //                 maxProfit = profit;
            //             }
            //         }
            //     }
            //     //variant index >=0 && the variant index is an enchanted form && still have items
            //     while(variantIndex>=0&&totalItems>0){
            //         if(product.variantsIsEnchanted==undefined||product.variantsIsEnchanted[variantIndex]==1){
            //             let totalItemsVariant = (totalItems-(totalItems%product.variantsEquiv[variantIndex]))/product.variantsEquiv[variantIndex]; //(total-remainder)/divisor to get intergral ans
            //             totalItems = totalItems%product.variantsEquiv[variantIndex];
            //             if(totalItemsVariant!=0){
            //                 calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant);
            //             }
            //         }
            //         variantIndex--;
            //     }

            // }

        }
        minion.totalProfit = 0; 
        minion.outputProducts.forEach((product)=>{
            minion.totalProfit +=product.profitPerItem;
            //for old cal type, totalProfit means profit per hour
            //for new cal type, totalProfit means total profit
        });
        
        minion.totalProfitText = moneyRepresentation(minion.totalProfit);
        minion.profitPerHour = moneyRepresentation(minion.totalProfit/settings.offlineTime);

        //TOOLS
        minion.tools = new Array();
        if(settings.superCompactor==1&&minion.canCompactor){
            minion.tools.push("Compactor");
        }else if(settings.superCompactor==2){
            minion.tools.push("Super Compactor 3000");
        }else if(settings.superCompactor==3){
            if(minion.toolsRequired){
                let found = false;
                minion.toolsRequired.forEach((tool)=>{
                    if(tool=="Auto Smelter") found = true;
                });
                if(found){
                    minion.tools.push("Dwarven Super Compactor");
                    minion.toolsWarning = true;
                }else{
                    minion.tools.push("Super Compactor 3000");
                }
            }else{
                minion.tools.push("Super Compactor 3000");
            }
            
        }
        if(minion.hasDiamondSpreading){
            minion.tools.push("Diamond Spreading");
        }
        if(minion.toolsRequired){
            minion.toolsRequired.forEach((tool)=>{
                if(!(tool=="Auto Smelter"&&settings.superCompactor==3)&&!(tool=="Compactor"&&settings.superCompactor<=1)){ //exceptions
                    minion.tools.push(tool);
                    minion.toolsWarning = true;
                }
                
            });
        }
    }
    
    function calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant){
        let result = new Object();
        let unitPrice;
        
        result.name = product.variants[variantIndex];
        result.numberOfItems = totalItemsVariant;
        if(settings.sellingTo==1){ //bazaar and npc
            let bazaarPrice = product.bazaarPrice[variantIndex][settings.sellingMethod]*(1-settings.tax/100);
            let npcPrice;
            if(product.variantsNpcPrices){
                npcPrice = product.variantsNpcPrices[variantIndex];
            }else{
                npcPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            if(bazaarPrice>npcPrice){
                unitPrice = bazaarPrice;
                result.unitPrice = moneyRepresentation(bazaarPrice);
            }else{
                unitPrice = npcPrice;
                result.unitPrice = moneyRepresentation(npcPrice)+" (NPC)";
            }
        }else{//npc only
            if(product.variantsNpcPrices){
                unitPrice = product.variantsNpcPrices[variantIndex];
            }else{
                unitPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            result.unitPrice = moneyRepresentation(unitPrice)+" (NPC)";
        }
        result.profitPerItem = totalItemsVariant*unitPrice;
        //for diamond spreading
        //minion.itemsHarvested += product.bazaarPrice[variantIndex][0]!=0 ? product.perTime : 0; // to solve the problem of "No gravel with flint shovel" being counted
        
        //for output
        minion.outputProducts.push(result);
       
    }

    function calculateVariantProfitManual(settings,minion,product,variantIndex){
        let result = new Object();
        let itemsPerHour, unitPrice;
    
        result.name = product.variants[variantIndex];
        itemsPerHour = 3600/minion.tierDelay[minion.tier-1]/2*product.perTime*(1+minion.fuel/100)/product.variantsEquiv[variantIndex] //get item per hour
        //itemsPerHour = 3600/time between actions/2 (offline)* res generated per time* (1+fuel/100) / amount of res needed to generate the enchanted form
        //visibility problems
        if(variantIndex>=2){
            result.numberOfItems = Math.round(itemsPerHour*10000)/10000;
        }else{
            result.numberOfItems = Math.round(itemsPerHour*100)/100; 
        }
        if(settings.sellingTo==1){ //bazaar and npc
            let bazaarPrice = product.bazaarPrice[variantIndex][settings.sellingMethod]*(1-settings.tax/100);
            let npcPrice;
            if(product.variantsNpcPrices){
                npcPrice = product.variantsNpcPrices[variantIndex];
            }else{
                npcPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            if(bazaarPrice>npcPrice){
                unitPrice = bazaarPrice;
                result.unitPrice = moneyRepresentation(bazaarPrice);
            }else{
                unitPrice = npcPrice;
                result.unitPrice = moneyRepresentation(npcPrice)+" (NPC)";
            } 
        }else{//npc only
            if(product.variantsNpcPrices){
                unitPrice = product.variantsNpcPrices[variantIndex];
            }else{
                unitPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            result.unitPrice = moneyRepresentation(unitPrice)+" (NPC)";
        }
        result.profitPerItem = itemsPerHour*unitPrice;
        //for diamond spreading
        minion.itemsHarvested += product.perTime;
        
        //for output
        minion.outputProducts.push(result);
       
    }

    function compareVariantProfit(settings, minion, product, variantIndex){ //a simplier version of calculateVariantProfit, without constants and things that stores in minion variable
        let itemsPerTime, unitPrice;
    
        //rough estimations
        itemsPerTime = product.perTime/product.variantsEquiv[variantIndex] //get item per hour
        
        if(settings.sellingTo==1){ //bazaar and npc
            let bazaarPrice = product.bazaarPrice[variantIndex][settings.sellingMethod];
            let npcPrice;
            if(product.variantsNpcPrices){
                npcPrice = product.variantsNpcPrices[variantIndex];
            }else{
                npcPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            if(bazaarPrice>npcPrice){
                unitPrice = bazaarPrice;
            }else{
                unitPrice = npcPrice;
            } 
        }else{//npc only
            if(product.variantsNpcPrices){
                unitPrice = product.variantsNpcPrices[variantIndex];
            }else{
                unitPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
        }
        return itemsPerTime*unitPrice;
    }
}