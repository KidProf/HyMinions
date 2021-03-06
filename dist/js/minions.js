$("#minionsTable").doubleScroll();

//functions to provide interactions
// function toggleUseProfile(){
//     let useProfile = $("#overallUseProfile").prop("checked");
//     if(useProfile){
//         $("#useProfile").removeClass("d-none");
//         $("#useTier").addClass("d-none");
//     }else{
//         $("#useTier").removeClass("d-none");
//         $("#useProfile").addClass("d-none");
//     }
// }


function toggleIndividualDiamondSpreading(){
    let useDiamondSpreading = $("#individualDiamondSpreading").prop("checked");
    if(useDiamondSpreading){
        $("#individualProductDiamondSpreading").removeClass("d-none");
    }else{
        $("#individualProductDiamondSpreading").addClass("d-none");
    }
}

function toggleCalculationType(){
    let calculationType = $("#overallCalculationType").children("option:selected").val();
    if(calculationType==1){
        $("#autoCalculationType").removeClass("d-none");
        $("#autoCalculationTypeAdvanced").removeClass("d-none");
        $("#autoCalculationTypeMiscellaneous").removeClass("d-none");
        $("#manualCalculationType").addClass("d-none");
    }else{
        $("#manualCalculationType").removeClass("d-none");
        $("#autoCalculationType").addClass("d-none");
        $("#autoCalculationTypeAdvanced").addClass("d-none");
        $("#autoCalculationTypeMiscellaneous").addClass("d-none");
    }
}

function toggleMinionChest(){
    console.log("toggleMinionChest");
    let superCompactor = $("#overallSuperCompactor").children("option:selected").val();
    //console.log($("#overallSuperCompactor").children("option:selected").val());
    if(superCompactor<=1){
        $("#minionChest").removeClass("d-none");
    }else{
        $("#minionChest").addClass("d-none");
    }
}
function selectTierTypeRadios(value){
    console.log("selectTierTypeRadios("+value)
    let tierTypeRadios = $('input[name=tierTypeRadios]','#overall');
    switch(value){
        case 0:
            $("#overallUseTier").prop("checked",true);
            break;
        case 1:
            $("#overallUseProfile").prop("checked",true);
            break;
        case 2:
            $("#overallUseSlots").prop("checked",true);
            break;
    }
}
function generateLink(){
    let keys = [], values = [];

    //tier selection
    if($("#overallUseProfile").prop("checked")&&$("#overallProfileName").val()!=""){//use profile
        // keys.push("tierType");
        // values.push(1);
        keys.push("name");
        values.push($("#overallProfileName").val().toLowerCase().trim());
        if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            
            keys.push("profile");
            values.push($("#overallProfileProfile").children("option:selected").val());
        }}
    }else if($("#overallUseSlots").prop("checked")){//use slots
        if($("#overallSlots").children("option:selected").val()!=23){
            keys.push("slots");
            values.push($("#overallSlots").children("option:selected").val());
        }
    }else if($("#overallUseTier").prop("checked")){//use tier
        keys.push("tierType");
        values.push(0);
        if($("#overallTier").children("option:selected").val()!=11){
            keys.push("tier");
            values.push($("#overallTier").children("option:selected").val());
        }
    }
    //else: dont pass any params - so that the default becomes useSlots and 23 slots
    
    // if($("#overallUseProfile").prop("checked")&&$("#overallProfileName").val()!=""){
    //     keys.push("name");
    //     values.push($("#overallProfileName").val());
    //     if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            
    //         keys.push("profile");
    //         values.push($("#overallProfileProfile").children("option:selected").val());
    //     }}
    // }else if($("#overallTier").children("option:selected").val()!=11){
    //     keys.push("tier");
    //     values.push($("#overallTier").children("option:selected").val());
    // }

    //general
    if($("#overallFuel").val()!=25){
        keys.push("fuel");
        values.push($("#overallFuel").val());
    }

    //advanced
    // if($("#overallCalculationType").children("option:selected").val()==1){
    if($("#overallOfflineTimeUnit").val()==1){ //use day as unit
        if($("#overallOfflineTime").val()!=1){
            keys.push("offlineTime");
            values.push($("#overallOfflineTime").val()*24);
        }
    }else{ //use hour as unit
        keys.push("offlineTimeUnit");
        values.push($("#overallOfflineTimeUnit").val());
        if($("#overallOfflineTime").val()!=24){
            keys.push("offlineTime");
            values.push($("#overallOfflineTime").val());
        }

    }
    //SOULFLOW
    if($("#overallSoulflow").prop("checked")){
        keys.push("soulflow");
        values.push(1);
    }

    if($("#overallSuperCompactor").children("option:selected").val()==3){
        if(!$("#overallDiamondSpreading").prop("checked")){
            keys.push("diamondSpreading");
            values.push(0);
        }
    }else{
        keys.push("superCompactor");
        values.push($("#overallSuperCompactor").children("option:selected").val());
        keys.push("diamondSpreading");
        values.push($("#overallDiamondSpreading").prop("checked")? 1 : 0);
    }
    if($("#overallNoCrafting").prop("checked")){
        keys.push("noCrafting");
        values.push(1);
    }
        // if($("#overallSuperCompactor").children("option:selected").val()<=1){
        //     if($("#overallMinionChest").children("option:selected").val()!=9){
        //         keys.push("minionChest");
        //         values.push($("#overallMinionChest").children("option:selected").val());
        //     }
        //     if($("#overallAutomaticShipping").children("option:selected").val()!=0.5){
        //         keys.push("automaticShipping");
        //         values.push($("#overallAutomaticShipping").children("option:selected").val());
        //     }
        // }
    // }else{
    //     keys.push("calculationType");
    //     values.push($("#overallCalculationType").children("option:selected").val());
    //     if($("#overallProductForm").children("option:selected").val()!=-2){
    //         keys.push("productForm");
    //         values.push($("#overallProductForm").children("option:selected").val());
    //     }
    //     if($("#overallDiamondSpreadingDwarvenCompactor").children("option:selected").val()!=2){
    //         keys.push("diamondSpreading");
    //         values.push($("#overallDiamondSpreadingDwarvenCompactor").children("option:selected").val());
    //     }
    // }
    if($("#overallShowDetails").prop("checked")){
        keys.push("showDetails");
        values.push(1);
    }
    if($("#overallSellingTo").children("option:selected").val()!=1){
        keys.push("sellingTo");
        values.push($("#overallSellingTo").children("option:selected").val());
    }
    
    //minor
    if($("#overallSellingMethod").children("option:selected").val()!=1){
        keys.push("sellingMethod");
        values.push($("#overallSellingMethod").children("option:selected").val());
    }
    if($("#overallTax").val()!=1.125){
        keys.push("tax");
        values.push($("#overallTax").val());
    }

    //output
    let string = "/minions"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    
    if(location.origin+string==window.location.href) location.reload();
    else window.location.href=string;
}

function appendLink(id){
    let keys = [], values = [];
    
    let currentURL = window.location.href;
    let queryStartLocation = currentURL.indexOf("?");

    if(queryStartLocation!=-1){
        let leftString=currentURL.substring(queryStartLocation+1);
        let queryEndLocation = leftString.indexOf("/");
        if(queryEndLocation!=-1){
            leftString=leftString.substring(0,queryEndLocation);
        }
        let keysEndLocation,valuesEndLocation;
        do{
            //console.log(leftString);
            keysEndLocation = leftString.indexOf("=");
            if(leftString.substring(0,keysEndLocation)!="") keys.push(leftString.substring(0,keysEndLocation));
            leftString = leftString.substring(keysEndLocation+1);
            valuesEndLocation = leftString.indexOf("&");
            if(valuesEndLocation==-1){
                let hashLocation = leftString.indexOf("#");
                if(leftString!=""){
                    if(hashLocation!=-1){
                        values.push(leftString.substring(0,hashLocation));
                    }else{
                        values.push(leftString);
                    }
                }
            }else{
                if(leftString.substring(0,valuesEndLocation)!="") values.push(leftString.substring(0,valuesEndLocation));
                leftString = leftString.substring(valuesEndLocation+1);
            }
        }while(valuesEndLocation!=-1);
    }

    //console.log(id);
    let i=0;
    while(i<keys.length){
        if(keys[i].includes(id+"individual")){
            keys.splice(i,1);
            values.splice(i,1);
            i--;
        }
        i++;
    }
    // keys.push(id+"individual");
    // values.push(1);
    keys.push(id+"individualTier");
    values.push($("#"+id+"individualTier").val());
    keys.push(id+"individualFuel");
    values.push($("#"+id+"individualFuel").val());
    i=0;
    while($("#"+id+"individualProduct"+i).length){
        keys.push(id+"individualProduct"+i);
        values.push($("#"+id+"individualProduct"+i).val());
        i++;
    }

    // console.log(keys);
    // console.log(values);

    //output
    let string = "/minions"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    window.location.href=string;
}

function search(){
    window.location.hash="#content";
    let searchingName = $("#searchInput").val().toLowerCase();
    let results = new Array();
    for(i=0;i<$("#searchDatalist").children("option").length;i++){
        let target = $("#searchDatalist").children("option").eq(i).val().toLowerCase();
        if(target==searchingName){ //if exact match, then directly move to the row
            window.location.hash="#minion"+i+"Row";
        }
        if(target.includes(searchingName)){ //ALT: searchingName==target.substring(0,searchingName.length)
            results.push(i);
        };
    }
    console.log(results);
    if(results.length==1) window.location.hash="#minion"+results[0]+"Row";
}

function clearInput(){
    console.log("clearInput()");

    //tier selection
    $("#overallUseSlots").prop("checked",true);
    $("#overallProfileName").val("");
    $("#overallProfileProfile").addClass("d-none");
    $("#overallProfileProfileLabel").addClass("d-none");
    $("#overallSlots").val("23"); //for select, must pass in string
    $("#overallTier").val("11");


    //general
    $("#overallFuel").val(25);
    $("#overallCalculationType").val("1");
    $("#overallOfflineTimeUnit").val("1");
    $("#overallOfflineTime").val(1);

    //advanced
    $("#overallSoulflow").prop("checked",false);
    $("#overallSuperCompactor").val("3");
    $("#overallDiamondSpreading").prop("checked",true);
    $("#overallNoCrafting").prop("checked",false);

    $("#overallProductForm").val("-2");
    $("#overallDiamondSpreadingDwarvenCompactor").val("2");

    $("#overallShowDetails").prop("checked",false);
    $("#overallSellingTo").val("1");
    
    //misc
    $("#overallSellingMethod").val("1");
    $("#overallTax").val(1.125);
}