var {minions} = require("../api/minionsData.js");
var {calculateMinionsCost} = require("../api/minionsCostOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.method);
    console.log(req.query);

    let settings = req.query;

    //data validation
    dataValidation(settings);

    //go to minions operation.js
    //asyncAwait
    calculateMinionsCost(minions, settings).then((minionsCost)=>{
        let output = {settings: settings, minions: minions, minionsCost: minionsCost};
        console.log(output.settings);
        console.log(output.minionsCost);
        res.render("minionsCost",output);

    }).catch((err)=>{
        console.log(err);
        res.render("minionsCost",{settings: settings});
    });
    


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
        if(!settings.buyingFrom||!isWithinList(settings.buyingFrom,[0,1])){
            settings.buyingFrom = 1;
        }
        if(!settings.buyingMethod||!isWithinList(settings.buyingMethod,[0,1])){
            settings.buyingMethod = 1;
        }
        if(!settings.tax||settings.tax<0){
            settings.tax = 1;
        }

        //individual
        let individualSettings = new Array();
        for(i=0;i<minions.length;i++){
            individualSettings[i] = {};
        }

        Object.keys(settings).forEach((key)=>{
            if(key.includes("individualProduct")){
                id = key.substring(0,key.indexOf("i"));
                if(individualSettings[id]["products"]==undefined) individualSettings[id]["products"]= new Array();
                individualSettings[id]["products"][key.substring(id.length+17)] = settings[key];
            }else if(key.includes("individual")){
                id = key.substring(0,key.indexOf("i"));
                individualSettings[id][key.substring(id.length+10).toLowerCase()] = settings[key];
                
            }
        });
        for(i=0;i<minions.length;i++){
            if(Object.keys(individualSettings[i]).length!=0){
                if(!individualSettings[i]["fuel"]||individualSettings[i]["fuel"]<0){
                    individualSettings[i]["fuel"] = settings.fuel; //validate individual fuel
                }      
            }
        }

        settings.individualSettings = individualSettings;
        console.log(settings);
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

