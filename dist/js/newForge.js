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


function setRisk(){
    let riskSelected = $("#overallRiskLevel").children("option:selected").val();
    console.log("setRisk(",riskSelected);

    if(riskSelected!=0){
        if(riskSelected==4){
            $("#overallBudgetCheck").prop("checked",false);
            $("#overallNoOfAuctionsMinCheck").prop("checked",false);
            $("#overallOverbuyToleranceCheck").prop("checked",false);
        }else{
            $("#overallBudgetCheck").prop("checked",true);
            $("#overallNoOfAuctionsMinCheck").prop("checked",true);
            $("#overallOverbuyToleranceCheck").prop("checked",true);
        }
        switch(riskSelected){
            case "1":
            case 1:
                $("#overallBudgetValue").val("10");
                $("#overallNoOfAuctionsMinValue").val("10");
                $("#overallOverbuyToleranceValue").val("1");
                break;
            case "2":
            case 2:
                $("#overallBudgetValue").val("30");
                $("#overallNoOfAuctionsMinValue").val("5");
                $("#overallOverbuyToleranceValue").val("2");
                break;
            case "3":
            case 3:
                $("#overallBudgetValue").val("100");
                $("#overallNoOfAuctionsMinValue").val("3");
                $("#overallOverbuyToleranceValue").val("3");
                break;
            default:
                break;
        }
    }
}

function setRiskCustom(){
    $("#overallRiskLevel").val(0);
}

function generateLink(forceLoad){
    let keys = [], values = [];

    if($("#overallUseProfile").prop("checked")&&$("#overallProfileName").val()!=""){
        keys.push("name");
        values.push($("#overallProfileName").val().toLowerCase().trim());
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

    if($("#overallRiskLevel").children("option:selected").val()!=2){ //for input box only
        keys.push("riskLevel");
        values.push($("#overallRiskLevel").children("option:selected").val());
    }

    if(!$("#overallBudgetCheck").prop("checked")){
        keys.push("budget");
        values.push(0);
    }else{
        if($("#overallBudgetValue").val()!=30){
            keys.push("budget");
            values.push($("#overallBudgetValue").val()*1000000);
        }
    }

    if(!$("#overallNoOfAuctionsMinCheck").prop("checked")){
        keys.push("noOfAuctionsMin");
        values.push(0);
    }else{
        if($("#overallNoOfAuctionsMinValue").val()!=5){
            keys.push("noOfAuctionsMin");
            values.push($("#overallNoOfAuctionsMinValue").val());
        }
    }

    if(!$("#overallOverbuyToleranceCheck").prop("checked")){
        keys.push("overbuyTolerance");
        values.push(0);
    }else{
        if($("#overallOverbuyToleranceValue").val()!=2){
            keys.push("overbuyTolerance");
            values.push($("#overallOverbuyToleranceValue").val());
        }
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