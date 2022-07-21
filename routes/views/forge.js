var fetch = require('cross-fetch');

var {forges} = require("../api/forgeData.js");
var {findAuction} = require("../api/general.js");
var {calculateForge} = require("../api/forgeOperation.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;

    if(!dataValidation(settings)){
        if(req.api){
            res.json({
                status: "error",
                errorMsg: settings.errorMsg,
                settings: settings,
            })
        }else{
            res.render("forge",{settings: settings});
        }
    }else{
        calculateForge(forges, settings).then((outputForges)=>{
            let output = {settings: settings, forges: forges, outputForges: outputForges};
            console.log(output.settings);
            if(req.api){
                fetch(process.env.BACKEND_LINK+"/apilog/forge/"+settings.key, {
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
                if(req.api){
                    res.json({
                        status: "error",
                        errorMsg: err,
                        settings: settings,
                    })
                }else{
                    res.render("forge",output);
                }
            }
    
        }).catch((err)=>{
            console.log(err);
            if(req.api){
                res.json({
                    status: "error",
                    errorMsg: err,
                    settings: settings,
                })
            }else{
                res.render("forge",{settings: settings});
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
        if(!settings.sortBy||!isWithinList(settings.sortBy,[0,1,2])){
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
            settings.ah = 1;
        }
        if(!settings.bz||!isWithinList(settings.bz,[-1,0,1])){
            settings.bz = 1;
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

