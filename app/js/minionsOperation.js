//minion minion, (an object storing the minion information, this is passed to store the results in it)
//product product, (an object storing the product information)
//sellingMethod: 0 for sell offer 1 for sell instantly
//prices (one of the bazaar prices from AJAX (either sell offer price [0], or sell instantly price [1]))
//int fuel, (fuel in percent, e.g. 25 means 25%)
//int variantIndex/productForm (the index of the variant, -1 if unenchanted form (DEFAULT (if any error occured)),
//  -2 if calculating for max profit, -3 if calculating for max profit, excluding unenchanted form, -4 if not calculating it)
//  if an array is returned, they use different variantIndexes for each product
//int isDiamondSpreading, (1 if the product is diamond spreading (just for showing the "(Spreading)" in the items field)
//int npcPreference (1 if bazaar only, 0 for max, -1 for npc only)
//int useDiamondSpreading (0 if no diamond spreading, 1 if use diamond spreading except for those stated in the minions array, 2 if use diamond spreading anyway)
    

let prices;

async function initCalculateMinionsProfit(sellingMethod, tier, fuel, variantIndex, npcPreference, useDiamondSpreading){
    return new Promise((resolve)=>{
        setTimeout(() => {
            $.get("/api/get-minions-api",(pricesAjax) => {
                prices = pricesAjax;
                minions.forEach((minion, index)=>{
                    calculateMinionProfit(minion,sellingMethod, tier, fuel, variantIndex, npcPreference, useDiamondSpreading);
                });
                resolve("success");
            });
        }, 0);
    })

    
}

function calculateMinionsProfit(sellingMethod, tier, fuel, variantIndex, npcPreference, useDiamondSpreading){
        minions.forEach((minion, index)=>{
            calculateMinionProfit(minion,sellingMethod, tier, fuel, variantIndex, npcPreference, useDiamondSpreading);
        });
}

function calculateMinionProfit(minion, sellingMethod, tier, fuel, variantIndex, npcPreference, useDiamondSpreading){
    let isArray = Array.isArray(variantIndex);
    minion.profit = 0;
    minion.itemsHarvested = 0;
    minion.items = "";
    minion.itemsPerHour = "";
    minion.bazaarPrices = "";

    //save for settings
    minion.tier = tier;
    minion.fuel = fuel;
    minion.npcPreference = npcPreference;
    minion.useDiamondSpreading = (!minion.noDiamondSpreading)&&useDiamondSpreading==1||useDiamondSpreading==2;
    minion.sellingMethod = sellingMethod;

    minion.products.forEach((product, index2) => {
        let result = calculateProductProfit(product, minion.tierDelay, sellingMethod, tier, fuel, isArray? variantIndex[index2] : variantIndex, npcPreference);
        minion.profit += result.profit;
        minion.itemsHarvested += result.itemsHarvested;
        minion.items += result.items;
        minion.itemsPerHour +=result.itemsPerHour;
        minion.bazaarPrices += result.bazaarPrices;
    });

    if((!minion.noDiamondSpreading)&&useDiamondSpreading==1||useDiamondSpreading==2){ //useDiamondSpreading == 2 means bypass the minion's initial preference.
        diamondSpreading.perTime = minion.itemsHarvested*0.1; //number of diamonds generated per hour
        let result = calculateProductProfit(diamondSpreading, minion.tierDelay , sellingMethod, tier, fuel, isArray? variantIndex[minion.products.length] : variantIndex, npcPreference);
        minion.profit += result.profit;
        minion.itemsHarvested += result.itemsHarvested;
        minion.items += result.items;
        minion.itemsPerHour +=result.itemsPerHour;
        minion.bazaarPrices += result.bazaarPrices;
        minion.diamondSpreadingVariantUsed = diamondSpreading.variantIndex;
    }
}

function calculateProductProfit(product, tierDelay, sellingMethod, tier, fuel, variantIndex, npcPreference){
    //this function: validate the variantIndex, then calculate the profit
    if(tier==0||variantIndex==-4){
        return {
            profit: 0, 
            itemsHarvested: 0,
            items: "",
            itemsPerHour: "",
            bazaarPrices: "",
        };
    }
    let maxProfit = 0;

    //validate variant index (see if the required enchanted form exists)
    //while the index refers to enchanted form && (it does not exists || (it is not the only enchanted form && it is not an enchanted form)) e.g. snow block falls in this category
    while(variantIndex>=0&&((!product.variants[variantIndex])||
        (variantIndex!=0&&!(product.variantsIsEnchanted ? product.variantsIsEnchanted[variantIndex] : 1)))){
        variantIndex--;
    }

    if(variantIndex==-3){
        if(product.variants.length==1){
            variantIndex = 0;
        }else{
            product.variants.forEach((variant, index3)=>{
                if((product.variantsIsEnchanted ? product.variantsIsEnchanted[index3] : 1)){ //if it is not an enchanted form
                    let resultCandidate = calculateProductProfitSpecificVariant(product, tierDelay, sellingMethod, tier, fuel, index3, npcPreference);
                    if(maxProfit<resultCandidate.profit){
                        maxProfit = resultCandidate.profit;
                        variantIndex = index3;
                    }
                }
            });
        }
    }else if(variantIndex==-2){
        product.variants.forEach((variant, index3)=>{
            calculateProductProfitSpecificVariant(product, tierDelay, sellingMethod, tier, fuel, index3, npcPreference);
            if(maxProfit<resultCandidate.profit){
                maxProfit = resultCandidate.profit;
                variantIndex = index3;
            }
        });
        calculateProductProfitSpecificVariant(product, tierDelay, sellingMethod, tier, fuel, -1, npcPreference);
        if(maxProfit<resultCandidate.profit){
            maxProfit = resultCandidate.profit;
            variantIndex = -1;
        }
    }
    
    //saved for settings
    product.variantIndex = variantIndex;
    
    return calculateProductProfitSpecificVariant(product, tierDelay, sellingMethod, tier, fuel, variantIndex, npcPreference);
}

function calculateProductProfitSpecificVariant(product, tierDelay, sellingMethod, tier, fuel, variantIndex, npcPreference){
    let result = new Object();
    let bazaarPrice;
    let itemsPerHour;

    if(variantIndex>=0){ //non-negative integers
        result.items = product.variants[variantIndex] + "<br />";
        itemsPerHour = 3600/tierDelay[tier-1]/2*product.perTime*(1+fuel/100)/product.variantsEquiv[variantIndex] //get item per hour
        //itemsPerHour = 3600/time between actions/2 (offline)* res generated per time* (1+fuel/100) / amount of res needed to generate the enchanted form
        //visibility problems
        if(variantIndex>=1){
            result.itemsPerHour = Math.round(itemsPerHour*10000)/10000+"<br />";
        }else{
            result.itemsPerHour = Math.round(itemsPerHour*100)/100+"<br />"; 
        }
        if(npcPreference==1||(npcPreference==0&&
            (product.variantsNpcPrices ? product.variantsNpcPrices[variantIndex] : product.npcPrice*product.variantsEquiv[variantIndex])
            <prices[sellingMethod][product.variants[variantIndex]])){
            //if bazaar only || max profit && npc<bazaar
            bazaarPrice = prices[sellingMethod][product.variants[variantIndex]]; //bazaar
            result.bazaarPrices = Math.round(bazaarPrice*10)/10+"<br />";
        }else{
            bazaarPrice = product.variantsNpcPrices ? product.variantsNpcPrices[variantIndex] : product.npcPrice*product.variantsEquiv[variantIndex]; //NPC
            result.bazaarPrices = Math.round(bazaarPrice*10)/10+" (NPC) <br />";
        }
    }else{ //default (-1, unenchanted form)
        result.items = product.item+"<br />"; //get name (unenchanted form) 

        itemsPerHour = 3600/tierDelay[tier-1]/2*product.perTime*(1+fuel/100)
        result.itemsPerHour = Math.round(itemsPerHour*100)/100+"<br />"; //get item per hour

        if(npcPreference==1||(npcPreference==0&&(product.npcPrice<prices[sellingMethod][product.item]))){
            //if bazaar only || max profit && npc<bazaar
            bazaarPrice = prices[sellingMethod][product.item]; //bazaar
            result.bazaarPrices = Math.round(bazaarPrice*10)/10+"<br />";
        }else{
            bazaarPrice = product.npcPrice; //NPC
            result.bazaarPrices = Math.round(bazaarPrice*10)/10+" (NPC) <br />";
        }

    }

    result.profit = itemsPerHour*bazaarPrice;
    result.itemsHarvested = bazaarPrice!=0 ? product.perTime : 0; // to solve the problem of "No gravel with flint shovel" being counted

    return result;
    //item, itemsPerHour, bazaarPrices, profit, itemsHarvested
    
}
