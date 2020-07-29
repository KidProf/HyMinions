var fetch = require('cross-fetch');
var itemNames = require("./itemNames.json");


exports = module.exports = function (req, res) {
    fetch("https://api.hypixel.net/skyblock/bazaar?key="+process.env.HYPIXEL_KEY)
    .then(result => result.json())
    .then(({ products }) => {
        var pricesAjax = new Array(2);
        pricesAjax[0] = new Object();
        pricesAjax[1] = new Object();
        Object.keys(itemNames).forEach((id) =>{
            //0 -> sell price (sell offer)
            //if it has sell offer, use sell offer, else use default price
            pricesAjax[0][itemNames[id]]= 0.99*(products[id]["buy_summary"][0] ? products[id]["buy_summary"][0]["pricePerUnit"] : products[id]["quick_status"]["buyPrice"]);
            //1 -> buy price (sell instantly)
            //if it has buy order, use buy order, else use default price
            pricesAjax[1][itemNames[id]]= 0.99*(products[id]["sell_summary"][0] ? products[id]["sell_summary"][0]["pricePerUnit"] : products[id]["quick_status"]["sellPrice"]);
        })

        console.log("0:  "+ pricesAjax[0]["Enchanted Flint"] + "1:  "+ pricesAjax[1]["Enchanted Flint"])
        //add extra items bazaar price
        pricesAjax[0]["No gravel with flint shovel"] = 0;
        pricesAjax[1]["No gravel with flint shovel"] = 0;

        pricesAjax[0]["Egg"] = 3;
        pricesAjax[1]["Egg"] = 3;

        pricesAjax[0]["White Wool"] = 2;
        pricesAjax[1]["White Wool"] = 2;

        pricesAjax[0]["Enchanted Wool"] = 320;
        pricesAjax[1]["Enchanted Wool"] = 320;

        pricesAjax[0]["Diamond (Spreading)"] = pricesAjax[0]["Diamond"];
        pricesAjax[1]["Diamond (Spreading)"] = pricesAjax[1]["Diamond"];
        pricesAjax[0]["Enchanted Diamond (Spreading)"] = pricesAjax[0]["Enchanted Diamond"];
        pricesAjax[1]["Enchanted Diamond (Spreading)"] = pricesAjax[1]["Enchanted Diamond"];
        pricesAjax[0]["Enchanted Diamond Block (Spreading)"] = pricesAjax[0]["Enchanted Diamond Block"];
        pricesAjax[1]["Enchanted Diamond Block (Spreading)"] = pricesAjax[1]["Enchanted Diamond Block"];

        //console.log(pricesAjax);
        return res.json(pricesAjax);
    })


    //res.redirect("/");
};
