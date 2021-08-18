var {minions} = require("../api/minionsData.js");
var {calculateMinionsCost} = require("../api/minionsCostOperation-beta.js");

exports = module.exports = function (req, res) {
    console.log(req.method);
    console.log(req.query);

    let settings = req.query;

    //data validation
    if(!dataValidation(settings)){
        res.render("minionsCost-beta",{settings: settings});
    }else{
        //go to minions cost operation.js
        //asyncAwait
        calculateMinionsCost(minions, settings).then((minionsCost)=>{
            let output = {settings: settings, minionsCost: minionsCost, minions: minions};
            console.log(output.settings);
            res.render("minionsCost-beta",output);

        }).catch((err)=>{
            console.log(err);
            res.render("minionsCost-beta",{settings: settings});
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
        }
    
        //Advanced
        if(!settings.buyingMethod||!isWithinList(settings.buyingMethod,[0,1])){
            settings.buyingMethod = 0;
        }
        if(!settings.tax||settings.tax<0){
            settings.tax = 1;
        }
        if(!settings.showDetails||!isWithinList(settings.showDetails,[0,1])){
            settings.showDetails = 0;
        }
        if(settings.useProfile==true){
            settings.showDetails = 1;
        }

        //filters
        if(!settings.filterSlayers||!isWithinList(settings.filterSlayers,[0,1])){ //default, will filter slayers
            settings.filterSlayers = 1;
        }
        if(!settings.filterCollections||!isWithinList(settings.filterCollections,[0,1])){ //default, will filter collections
            settings.filterCollections = 1;
        }
        if(!settings.bottomSlayers||!isWithinList(settings.bottomSlayers,[0,1])){ //default, will filter slayers
            settings.bottomSlayers = 0;
        }
        if(!settings.displayMethod||!isWithinList(settings.displayMethod,[0,1])){ //default, will filter slayers
            settings.displayMethod = 1;
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

