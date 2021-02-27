exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;
    let data = {};

    //data validation
    //general
    if(settings.name){
        settings.useProfile= true;
        settings.tier = 12;
        if(!settings.profile){
            //find profile
        }
    }else{
        settings.useProfile= false;
        if(!settings.tier||settings.tier<0||settings.tier>12){
            settings.tier = 12;
        }
    }
    if(!settings.fuel||settings.fuel<0){
        settings.fuel = 25;
    }
    if(!settings.diamondSpreading||!isWithinList(settings.diamondSpreading,[0,1])){
        settings.diamondSpreading = 1;
    }


    //Advanced
    if(!settings.calculationType||!isWithinList(settings.calculationType,[0,1])){
        settings.calculationType = 1;
    }
    if(!settings.productForm||!isWithinList(settings.productForm,[-3,-2,-1,0,1])){
        settings.productForm = -3;
    }
    if(!settings.offlineTime||settings.offlineTime<=0){
        settings.offlineTime = 12;
    }
    if(!settings.superCompactor||!isWithinList(settings.superCompactor,[0,1])){
        settings.superCompactor = 1;
    }
    if(!settings.minionChest||!isWithinList(settings.minionChest,[0,3,9,15,21,27])){
        settings.minionChest = 9;
    }
    if(!settings.automaticShipping||!isWithinList(settings.automaticShipping,[0,0.5,0.9])){
        settings.automaticShipping = 0.5;
    }

    //Minor
    if(!settings.sellingTo||!isWithinList(settings.sellingTo,[0,1,-1])){
        settings.sellingTo = 0;
    }
    if(!settings.sellingMethod||!isWithinList(settings.sellingMethod,[0,1])){
        settings.sellingMethod = 0;
    }
    if(!settings.tax||settings.tax<0){
        settings.tax = 1;
    }
    
    
    data.settings= settings;
    
    console.log(data);
    res.render("minions",data);
};

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