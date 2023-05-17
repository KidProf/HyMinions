var fetch = require('cross-fetch');

var {minions} = require("../api/minionsData.js");
var {calculateMinionsCost} = require("../api/minionsCostOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.method);
    console.log(req.query);
    console.log(req.api);

    let settings = req.query;

    //data validation
    if(!dataValidation(settings)){
        if(req.api){
            res.json({
                status: "error",
                errorMsg: settings.errorMsg,
                settings: settings,
            })
        }else{
            res.render("minionsCost",{settings: settings});
        }
    }else{
        //go to minions cost operation.js
        //asyncAwait
        calculateMinionsCost(minions, settings).then((minionsCost)=>{
            let output = {settings: settings, minionsCost: minionsCost, minions: minions};
            console.log(output.settings);
            if(req.api){
                fetch(process.env.BACKEND_LINK+"/apilog/minionscost/"+settings.key, {
                    method: "post",
                    headers: {
                        'Accept': 'application/text',
                        'Content-Type': 'application/json'
                        //text/plain
                    },
        
                    //make sure to serialize your JSON body
                    body: JSON.stringify({})
                }) //just leave it async, return the page first
                res.json({
                    status: "success",
                    ...output
                })
            }else{
                res.render("minionsCost",output);
            }

        }).catch((err)=>{
            console.log(err);
            if(req.api){
                res.json({
                    status: "error",
                    errorMsg: settings.errorMsg,
                    settings: settings,
                })
            }else{
                res.render("minionsCost",{settings: settings});
            }
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
        if(!settings.group||settings.group<0){
            settings.group = 0;
        }else{
            settings.group = parseInt(settings.group);
        }
        if(!settings.buyingMethod||!isWithinList(settings.buyingMethod,[0,1])){
            settings.buyingMethod = 0;
        }
        if(!settings.tax||settings.tax<0){
            settings.tax = 1.125;
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
        if(!settings.showSlots||!isWithinList(settings.showSlots,[0,1])){ //default, will filter slayers
            settings.showSlots = 1;
        }

        console.log(settings);
        
        var reg=/^\w+$/;
        if(settings.name&&!reg.test(settings.name)){
            console.log("Invalid Minecraft Name");
            settings.hasError = true;
            settings.errorMsg = "Invalid Minecraft Name. It should only contains letters, numbers and underscores.";
            return false;
        }else if(req.api&&!settings.key){
            console.log("Missing API key");
            settings.hasError = true;
            settings.errorMsg = "Missing API key. You need to apply one at https://hyminions.herokuapp.com/contact";
            return false;
        }else if(req.api&&(!reg.test(settings.key)||settings.key.length!=10)){
            console.log("Invalid API key");
            settings.hasError = true;
            settings.errorMsg = "Invalid API key. You need to apply one at https://hyminions.herokuapp.com/contact";
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

