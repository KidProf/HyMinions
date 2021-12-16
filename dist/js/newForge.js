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

function generateLink(){
    let keys = [], values = [];

    //SPECIAL FOR FORGE PAGE
    keys.push("run");
    values.push("1");

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
    
    let string = "/new-forge"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    
    if(location.origin+string==window.location.href) location.reload();
    else window.location.href=string;
}
