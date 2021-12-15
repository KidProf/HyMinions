var {forges} = require("../api/forgeData.js");
var {findAuction} = require("../api/general.js");
var {calculateForge} = require("../api/forgeOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;

    if(settings.run==1){
        settings.loadAuction = 1;
        settings.loadBazaar = 1;
        if(!dataValidation(settings)){
            res.render("newForge",{settings: settings});
        }else{
            calculateForge(forges, settings).then((outputForges)=>{
                let output = {settings: settings, forges: forges, outputForges: outputForges};
                console.log(output.settings);
                res.render("newForge",output);
        
            }).catch((err)=>{
                console.log(err);
                res.render("newForge",{settings: settings});
            });
        }
    }else{
        settings.sortBy = 0;
        settings.overbuyTolerance = 2;
        settings.run = 0;
        settings.tax = 1.125;
        settings.accuracy = 2;
        settings.gemstoneCollectionLevel = 11;
        settings.hotmLevel = 7;

        console.log(settings);
        res.render("newForge",{settings: settings});
    }

    function dataValidation(settings){
        //assume no error first
        settings.hasError = false;
        //general
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
            if(!settings.hotmLevel||!isWithinList(settings.hotmLevel,[0,1,2,3,4,5,6,7])){
                settings.hotmLevel = 7;
            }
            if(!settings.gemstoneCollectionLevel||!isWithinList(settings.gemstoneCollectionLevel,[0,1,2,3,4,5,6,7,8,9,10,11])){
                settings.gemstoneCollectionLevel = 11;
            }
        }

        
        //Advanced
        if(!settings.tax||settings.tax<0){
            settings.tax = 1.125;
        }
        if(!settings.sortBy||!isWithinList(settings.sortBy,[0,1])){
            settings.sortBy = 0;
        }
        if(!settings.overbuyTolerance||!isWithinList(settings.overbuyTolerance,[0,1,2,3])){
            settings.overbuyTolerance = 2;
        }

        console.log(settings);

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

