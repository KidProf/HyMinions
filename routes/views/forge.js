var {forges} = require("../api/forgeData.js");
var {findAuction} = require("../api/general.js");
var {calculateForge} = require("../api/forgeOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;

    if(!dataValidation(settings)){
        res.render("forge",{settings: settings});
    }else{
        calculateForge(forges, settings).then((outputForges)=>{
            let output = {settings: settings, forges: forges, outputForges: outputForges};
            console.log(output.settings);
            res.render("forge",output);
    
        }).catch((err)=>{
            console.log(err);
            res.render("forge",{settings: settings});
        });
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
        if(!settings.riskLevel||!isWithinList(settings.riskLevel,[0,1,2,3,4])){
            settings.riskLevel = 2;
        }
        if(!settings.overbuyTolerance||(settings.overbuyTolerance<1&&settings.overbuyTolerance!=0)){
            settings.overbuyTolerance = 2;
        }
        if(!settings.noOfAuctionsMin||(settings.noOfAuctionsMin<1&&settings.noOfAuctionsMin!=0)){
            settings.noOfAuctionsMin = 5;
        }
        if(!settings.budget||(settings.budget<0)){
            settings.budget = 30*1000000;
        }
        if(!settings.ah||!isWithinList(settings.ah,[-1,0,1])){
            settings.ah = 0;
        }
        if(!settings.bz||!isWithinList(settings.bz,[-1,0,1])){
            settings.bz = 0;
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

