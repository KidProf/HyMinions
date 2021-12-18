var {dateTimeToString, findAuction, moneyRepresentation} = require("../api/general.js");

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
    
            let auctions = [];
            Object.keys(auctionsData).forEach((name)=>{
                auctionsData[name].forEach((data)=>{
                    auctions.push({
                        name: name, 
                        quantity: data.q,
                        unitPrice: data.u,
                        currentPrice: data.c,
                        unitPriceText: moneyRepresentation(data.u),
                        currentPriceText: moneyRepresentation(data.c),
                    });
                });
            });

            auctions.sort((a,b)=>{
                return a.unitPrice - b.unitPrice;
            })
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

