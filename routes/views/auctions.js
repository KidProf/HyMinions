var {dateTimeToString, findAuction, moneyRepresentation, determineBuyList, dataQuantity, dataCurrentPrice, dataUnitPrice} = require("../api/general.js");

exports = module.exports = function (req, res) {
    console.log(req.query);
    let settings = req.query;

    if(!dataValidation(settings)){
        // res.render("auctions",{settings: settings});
        res.render("errors/404"); //temporary, not to give people an impression they can search whatever they want
    }else{
        let keys = [], values = [];
        settings.names.forEach((name)=>{
            keys.push("names[]");
            values.push(name);
        });
        if(settings.exactMatch==1){
            keys.push("exactMatch");
            values.push(settings.exactMatch);
        }
        let queryString = "";
        for(let i=0;i<keys.length;i++){
            queryString += i==0 ? "?" : "&";
            queryString += keys[i]+"="+values[i];
        }
        //TODO: Item lore, refresh not too often
        findAuction(queryString, settings).then((auctionsData)=>{
            settings.lastUpdatedAuctionServerString = settings.lastUpdatedAuctionServer ? dateTimeToString(settings.lastUpdatedAuctionServer) : null;
            settings.descriptionCol = false; //initial settings 
            settings.outOfStock = false;

            let auctions = [];
            Object.keys(auctionsData).forEach((name)=>{
                auctionsData[name].forEach((data)=>{
                    auctions.push({
                        name: name, 
                        q: data.q, //these are for the determineBuyList function
                        quantity: data.q,
                        u: data.u,
                        unitPrice: data.u,
                        c: data.c,
                        currentPrice: data.c,
                        unitPriceText: moneyRepresentation(data.u),
                        currentPriceText: moneyRepresentation(data.c),
                        description: data.l,
                    });
                    if(data.l) settings.descriptionCol = true;
                });
            });

            auctions.sort((a,b)=>{
                return a.unitPrice - b.unitPrice;
            })

            if(settings.quantity){
                let buyInfo = determineBuyList(auctions,settings.quantity,settings.overbuyTolerance);
                if(buyInfo.status=="fail"){
                    settings.outOfStock = true;
                    settings.componentCost = 0;
                }else{
                    settings.buyIndices = [];
                    settings.componentCost = buyInfo.componentCost;
                    settings.componentCostText = moneyRepresentation(buyInfo.componentCost);
                    buyInfo.buyList.forEach((item)=>{
                        settings.buyIndices.push(item.auctionIndex);
                    });
                }
                switch(settings.overbuyTolerance){
                    case 1:
                    case '1':
                        settings.overbuyToleranceText = "1x";
                        break;
                    case 2:
                    case '2':
                        settings.overbuyToleranceText = "2x";
                        break;
                    case 3:
                    case '3':
                        settings.overbuyToleranceText = "3x";
                        break;
                    default:
                        settings.overbuyToleranceText = "Infinite";
                        break;
                }
            }
            
            let output = {settings: settings, auctions: auctions};
            console.log(output.settings);
            res.render("auctions",output);
    
        }).catch((err)=>{
            console.log(err);
            // res.render("auctions",{settings: settings});
            res.render("errors/404"); //temporary, not to give people an impression they can search whatever they want
        });
    }

    function dataValidation(settings){
        //assume no error first
        settings.hasError = false;

        if(!settings.exactMatch||!isWithinList(settings.exactMatch,[0,1])){
            settings.exactMatch = 0;
        }

        if(settings.quantity&&(!settings.overbuyTolerance||!isWithinList(settings.overbuyTolerance,[0,1,2,3]))){
            settings.overbuyTolerance = 2;
        }
        
        console.log(settings);

        if(!settings.names){
            console.log("Missing names parameter");
            settings.hasError = true;
            settings.errorMsg = "Missing names parameter";
            return false;
        }

        if(settings.exactMatch==0){
            settings.names.forEach((name)=>{
                if(name.length<5){
                    settings.hasError = true;
                }
            })
        }
        
        if(settings.hasError){
            console.log("Too short names");
            settings.hasError = true;
            settings.errorMsg = "The searched item name should have at least 5 characters (except when finding exact matches).";
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

