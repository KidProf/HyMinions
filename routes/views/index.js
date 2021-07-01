var {minions} = require("../api/minionsData.js");
var {calculateMinionsProfit} = require("../api/minionsOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;

    if(settings.run==1){
        dataValidation(settings);
    
        calculateMinionsProfit(minions, settings).then(()=>{
            let output = {settings: settings, minions: minions};
            console.log(output.settings);
            res.render("index",output);
    
        }).catch((err)=>{
            console.log(err);
            res.render("index",{settings: settings});
        });
    }else{
        settings.run = 0;
        settings.offlineTime = 24;
        settings.offlineTimeUnit = 1;
        console.log(settings);
        res.render("index",{settings: settings});
    }


    function dataValidation(settings){
        //assume no error first
        settings.hasError = false;

        settings.run = 1;

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
        settings.soulflow = 0;
        settings.noCrafting = 0;
        settings.showDetails = 0;

    }

    function isWithinList(number,list){
        let found=false;
        list.forEach((item)=>{
            //console.log(number,item,number==item);
            if(item==number){
                found=true;
            }
        });
        return found;
    }
};

