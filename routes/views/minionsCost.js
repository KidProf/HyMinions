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
        let output = {settings: settings, minionsCost: minionsCost};
        console.log(output.settings);
        //console.log(output.minionsCost);
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
        if(!settings.buyingMethod||!isWithinList(settings.buyingMethod,[0,1])){
            settings.buyingMethod = 0;
        }
        if(!settings.tax||settings.tax<0){
            settings.tax = 1;
        }
        if(!settings.showDetails||!isWithinList(settings.showDetails,[0,1])){
            settings.showDetails = 0;
        }

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

