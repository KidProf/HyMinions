var minionsData = require("./minionsData.js");
var minionsOperation = require("./minionsOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.method);
    console.log(req.query);

    let settings = req.query;
    let minions = minionsData.minions;

    //data validation
    dataValidation(settings);

    //go to minions operation.js
    //asyncAwait
    minionsOperation.calculateMinionsProfit(minions, settings).then(()=>{
        let output = {settings: settings, minions: minions};
        console.log(output.settings);
        res.render("minions",output);

    }).catch(()=>{
        res.render("minions");
    });
    


    function dataValidation(settings){
        //assume no error first
        settings.hasError = false;
        //general
        if(settings.name){
            settings.useProfile= true;
            settings.tier = 11;//for settings page first show 11 option
            if(!settings.profile){
                settings.profile=0;
            }
            if(settings.profile=="undefined"){
                settings.profile=0;
            }
        }else{
            settings.useProfile= false;
            if(!settings.tier||!isWithinList(settings.tier,[1,2,3,4,5,6,7,8,9,10,11,12])){
                settings.tier = 11;
            }
        }
        if(!settings.fuel||settings.fuel<0){
            settings.fuel = 25;
        }
    
        //Advanced
        if(!settings.diamondSpreading||!isWithinList(settings.diamondSpreading,[0,1,2])){
            settings.diamondSpreading = 2;
        }
        if(!settings.calculationType||!isWithinList(settings.calculationType,[0,1])){
            settings.calculationType = 1;
        }
        if(!settings.productForm||!isWithinList(settings.productForm,[-2,-1,0,1,2])){
            settings.productForm = -2;
        }
        if(!settings.offlineTime||settings.offlineTime<=0){
            settings.offlineTime = 24;
        }
        if(!settings.offlineTimeUnit||!isWithinList(settings.offlineTimeUnit,[0,1])){
            settings.offlineTimeUnit = 1;
        }
        if(!settings.superCompactor||!isWithinList(settings.superCompactor,[0,1,2,3])){
            settings.superCompactor = 3;
        }
        //increase diamondSpreading tolerance if dwarven compactors/ no compactors are used.
        if(settings.calculationType==1&&settings.superCompactor==3&&settings.diamondSpreading==1){
            settings.diamondSpreading=2;
        }
        if(settings.calculationType==1&&settings.superCompactor==0&&settings.diamondSpreading>=1){
            settings.diamondSpreading=3;
        }
        if(settings.calculationType==0&&settings.productForm==-1&&settings.diamondSpreading>=1){
            settings.diamondSpreading=3;
        }
        if(!settings.minionChest||!isWithinList(settings.minionChest,[0,3,9,15,21,27])){
            settings.minionChest = 9;
        }
        if(!settings.automaticShipping||!isWithinList(settings.automaticShipping,[0,0.5,0.9])){
            settings.automaticShipping = 0.5;
        }
    
        //Minor
        if(!settings.sellingTo||!isWithinList(settings.sellingTo,[0,1])){
            settings.sellingTo = 1;
        }
        if(!settings.sellingMethod||!isWithinList(settings.sellingMethod,[0,1])){
            settings.sellingMethod = 1;
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
            if(key.includes("individual")){
                id = key.substring(0,key.indexOf("i"));
                individualSettings[id][key.substring(id.length+10).toLowerCase()] = settings[key];
            }
        });
        settings.individualSettings = individualSettings;

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

