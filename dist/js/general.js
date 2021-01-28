
function moneyRepresentation(number){
    if(number>=1&&number<100000){ //shortcut
        return Math.round(number*10)/10; //1 d.p. e.g. 10.0, 99999.9
    }else if(number<0.0001){
        return number; //surrender
    }else if(number<0.01){
        return Math.round(number*10000)/10000; //0.0005
    }else if(number<1){
        return Math.round(number*100)/100; //0.05
    }else if(number<999500){
        return Math.round(number/1000)+"k"; //100k
    }else if(number<9995000){
        return Math.round(number/10000)/100+"M"; //1.00M
    }else if(number<99950000){
        return Math.round(number/100000)/10+"M"; //10.0M
    }else if(number<999500000){
        return Math.round(number/1000000)+"M"; //100M
    }else if(number<9995000000){
        return Math.round(number/10000000)/100+"B"; //1.00B
    }else if(number<99950000000){
        return Math.round(number/100000000)/10+"B"; //10.0B
    }else if(number<999500000000){
        return Math.round(number/1000000000)+"B"; //100B
    }else{
        return number; //surrender
    }
}