initCalculateForgeProfit().then(()=>{
    //async await
    
    forges.sort((a,b)=>{
        return b.netProfit - a.netProfit;
    });

    forges.forEach((forge,index)=>{
        $("#forge"+index+"Name").html(forge.name + "<br />(" + moneyRepresentation(forge.netProfit) + ")");
        $("#forge"+index+"MaterialsName").html(forge.materialsNames);
        $("#forge"+index+"Time").html(forge.duration);
        $("#forge"+index+"UnitCost").html(moneyRepresentation(forge.unitCost));
        $("#forge"+index+"Cost").html(moneyRepresentation(forge.cost));
        $("#forge"+index+"ProductPrice").html(moneyRepresentation(forge.productPrice));
        $("#forge"+index+"NetProfit").html(moneyRepresentation(forge.netProfit));
        $("#forge"+index+"ProfitPerHour").html(moneyRepresentation(forge.profitPerHour));
        if(forge.netProfit<0){
            $("#forge"+index+"Row").addClass("loss");
        }
    });

    //enable double scroll
    $("#forgeTable").doubleScroll();
});

async function initCalculateForgeProfit(){
    return new Promise((resolve)=>{
        setTimeout(() => {
            $.get("/api/get-minions-api",(pricesAjax) => {
                prices = pricesAjax;
                forges.forEach((forge, index)=>{
                    calculateForgeProfit(forge, prices);
                });
                resolve("success");
            });
        }, 0);
    })
}

function calculateForgeProfit(forge, prices){
    let minimumCost, minimumCostIndex;
    forge.materialsOptions.forEach((option,index)=>{
        let optionCost = 0;
        option.forEach((material,index2)=>{
            let unitCost = prices[0][material]/0.99*1.01; //for tax
            let quantity = forge.materialsQuantity[index][index2];
            optionCost = unitCost*quantity;
            console.log(unitCost, quantity);
        });
        if(index==0){
            minimumCost = optionCost;      
            minimumCostIndex = index; 
        }else{
            if(minimumCost>optionCost){
                //get minimum buy price
                minimumCost = optionCost;
                minimumCostIndex = index;
            }
        }
    })

    console.log(minimumCost);
    //ASSUMPTION: ONLY HAS 1 TYPE OF MATERIAL PER FORGE
    forge.unitCost = prices[0][forge.materialsOptions[minimumCostIndex][0]]/0.99*1.01; //for tax
    forge.cost = minimumCost;
    forge.productPrice = prices[1][forge.name];
    forge.netProfit = forge.productPrice-forge.cost;
    forge.profitPerHour = forge.netProfit/forge.duration;

    forge.materialsNames = forge.materialsQuantity[minimumCostIndex][0] + " x " + forge.materialsOptions[minimumCostIndex][0]; //string form showing what materials needed

    
}