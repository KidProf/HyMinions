//copied from general.js
exports.moneyRepresentation = function moneyRepresentation(number,showDetails){
    if(showDetails==1){
        if(number<0){
            return "-" + moneyRepresentationMagnitudeDetail(Math.abs(number));
        }else{
            return moneyRepresentationMagnitudeDetail(number);
        }
    }
    if(number<0){
        return "-" + moneyRepresentationMagnitude(Math.abs(number));
    }else{
        return moneyRepresentationMagnitude(number);
    }
}

function moneyRepresentationMagnitude(number){
    
    if(number>=1&&number<100000){ //shortcut
        return (Math.round(number*10)/10).toFixed(1); //1 d.p. e.g. 10.0, 99999.9
    }else if(number<0.0001){
        return number; //surrender
    }else if(number<0.01){
        return (Math.round(number*10000)/10000).toFixed(4); //0.0005
    }else if(number<1){
        return (Math.round(number*100)/100).toFixed(2); //0.05
    }else if(number<999500){
        return Math.round(number/1000)+"k"; //100k
    }else if(number<9995000){
        return (Math.round(number/10000)/100).toFixed(2)+"M"; //1.00M
    }else if(number<99950000){
        return (Math.round(number/100000)/10).toFixed(1)+"M"; //10.0M
    }else if(number<999500000){
        return Math.round(number/1000000)+"M"; //100M
    }else if(number<9995000000){
        return (Math.round(number/10000000)/100).toFixed(2)+"B"; //1.00B
    }else if(number<99950000000){
        return (Math.round(number/100000000)/10).toFixed(1)+"B"; //10.0B
    }else if(number<999500000000){
        return Math.round(number/1000000000)+"B"; //100B
    }else{
        return number; //surrender
    }
}

function moneyRepresentationMagnitudeDetail(number){
    
    if(number>=1){ //shortcut
        return (Math.round(number*10)/10).toFixed(1); //1 d.p. e.g. 10.0, 99999.9
    }else if(number<0.0001){
        return number; //surrender
    }else if(number<0.01){
        return (Math.round(number*10000)/10000).toFixed(4); //0.0005
    }else if(number<1){
        return (Math.round(number*100)/100).toFixed(2); //0.05
    }
}