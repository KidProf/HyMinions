$("#forgeTable").doubleScroll();

//functions to provide interaction
function toggleUseProfile(){
    let useProfile = $("#overallUseProfile").prop("checked");
    if(useProfile){
        $(".profileAlt").hide();
    }else{
        $(".profileAlt").show();
    }
    
}

function setUseProfile(){
    if($("#overallProfileName").val()!=""){
        $("#overallUseProfile").prop("checked",true);
        $(".profileAlt").hide();
    }else{
        $("#overallUseProfile").prop("checked",false);
        $(".profileAlt").show();
    }
}

function setNotProfile(){
    $("#overallUseProfile").prop("checked",false);
    $(".profileAlt").show();
}

function generateLink(forceLoad){
    let keys = [], values = [];

    if($("#overallUseProfile").prop("checked")&&$("#overallProfileName").val()!=""){
        keys.push("name");
        values.push($("#overallProfileName").val().toLowerCase());
        if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            keys.push("profile");
            values.push($("#overallProfileProfile").children("option:selected").val());
        }}
    }else{
        if($("#overallHotmLevel").children("option:selected").val()!=7){
            keys.push("hotmLevel");
            values.push($("#overallHotmLevel").children("option:selected").val());
        }
        if($("#overallGemstoneCollectionLevel").children("option:selected").val()!=11){
            keys.push("gemstoneCollectionLevel");
            values.push($("#overallGemstoneCollectionLevel").children("option:selected").val());
        }
    }

    //advanced
    // if($("#overallAccuracy").val()!=2){
    //     keys.push("accuracy");
    //     values.push($("#overallAccuracy").val());
    // }
    if($("#overallTax").val()!=1.125){
        keys.push("tax");
        values.push($("#overallTax").val());
    }

    if($("#overallSortBy").children("option:selected").val()!=0){
        keys.push("sortBy");
        values.push($("#overallSortBy").children("option:selected").val());
    }

    if($("#overallOverbuyTolerance").children("option:selected").val()!=2){
        keys.push("overbuyTolerance");
        values.push($("#overallOverbuyTolerance").children("option:selected").val());
    }
    if(forceLoad){
        keys.push("ah");
        values.push(1);
        keys.push("bz");
        values.push(1); 
    }else{
        if($("#overallLoadAuctions").prop("checked")){
            keys.push("ah");
            values.push(1);        
        }else{
            keys.push("ah");
            values.push(-1);   
        }
    
        if($("#overallLoadBazaar").prop("checked")){
            keys.push("bz");
            values.push(1);        
        }else{
            keys.push("bz");
            values.push(-1);  
        }
    }

    let string = "/new-forge"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    
    if(location.origin+string==window.location.href) location.reload();
    else window.location.href=string;
}

function generateAuctionLink(name,approximateMatch,quantity,overbuyTolerance){
    let keys = [], values = [];

    keys.push("names[]");
    values.push(name);

    if(!approximateMatch){
        keys.push("exactMatch");
        values.push(1);
    }

    keys.push("quantity");
    values.push(quantity);

    if(overbuyTolerance!=0){
        keys.push("overbuyTolerance");
        values.push(overbuyTolerance);
    }

    let string = "/auctions"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    // string += "#content";
    
    window.open(string);
}