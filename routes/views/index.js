var {minions} = require("../api/minionsData.js");
var {calculateMinionsProfit} = require("../api/minionsOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;

    if(settings.run==1){
        if(!dataValidation(settings)){
            res.render("index",{settings: settings});
        }else{
            calculateMinionsProfit(minions, settings).then(()=>{
                let output = {settings: settings, minions: minions};
                console.log(output.settings);
                res.render("index",output);
        
            }).catch((err)=>{
                console.log(err);
                res.render("index",{settings: settings});
            });
        }
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
            settings.tierType= 1;
            if(!settings.profile){
                settings.profile=0;
            }
            if(settings.profile=="undefined"){
                settings.profile=0;
            }
        }else{
            settings.tierType= 2;
            settings.slots = 23;
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
        settings.tax = 1.125;
        settings.soulflow = 0;
        settings.noCrafting = 0;
        settings.showDetails = 0;

        var reg=/^\w+$/;
        if(settings.name&&!reg.test(settings.name)){
            console.log("Invalid Minecraft Name");
            settings.hasError = true;
            settings.errorMsg = "Invalid Minecraft Name. It should only contains letters, numbers and underscores.";
            return false;
        }else{
            return true;
        }

        
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

