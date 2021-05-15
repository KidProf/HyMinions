var minionsData = require("./minionsData.js");
var minionsOperation = require("./minionsOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;
    let minions = minionsData.minions;

    dataValidation(settings);

    minionsOperation.calculateMinionsProfit(minions, settings).then(()=>{
        let output = {settings: settings, minions: minions};
        console.log(output.settings);
        res.render("index",output);

    }).catch(()=>{
        res.render("index");
    });

    function dataValidation(settings){
        //assume no error first
        settings.hasError = false;

        if(settings.name){
            settings.useProfile= true;
            if(!settings.profile){
                settings.profile=0;
            }
            if(settings.profile=="undefined"){
                settings.profile=0;
            }
        }else{
            settings.useProfile= false;
            settings.tier = 11;
        }

        if(!settings.offlineTime||settings.offlineTime<=0){
            settings.offlineTime = 24;
        }
        if(!settings.offlineTimeUnit||!isWithinList(settings.offlineTimeUnit,[0,1])){
            settings.offlineTimeUnit = 1;
        }

        settings.fuel=25;
        settings.superCompactor = 3;
        settings.diamondSpreading=3;
        settings.calculationType = 1;
        settings.sellingTo = 1;
        settings.sellingMethod = 1;
        settings.tax = 1;

    }
};

