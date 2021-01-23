initCalculateForgeProfit().then(()=>{
    //async await
    
    forges.sort((a,b)=>{
        return b.profitPerHour - a.profitPerHour;
    });

    forges.forEach((forge,index)=>{
        $("#forge"+index+"Name").html(forge.name + "<br />(" + Math.round(forge.profitPerHour*10)/10 + ")");
        $("#forge"+index+"MaterialsName").html(forge.materialsName);
        $("#forge"+index+"Time").html(forge.duration);
        $("#forge"+index+"Cost").html(Math.round(forge.cost*10)/10);
        $("#forge"+index+"ProductPrice").html(Math.round(forge.productPrice*10)/10);
        $("#forge"+index+"NetProfit").html(Math.round(forge.netProfit*10)/10);
        $("#forge"+index+"ProfitPerHour").html(Math.round(forge.profitPerHour*10)/10);
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
    forge.cost = forge.materialsQuantity[0]*prices[0][forge.materials[0]];
    forge.productPrice = prices[1][forge.name];
    forge.netProfit = forge.productPrice-forge.cost;
    forge.profitPerHour = forge.netProfit/forge.duration;

    
}