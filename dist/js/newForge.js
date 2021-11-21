$("#forgeTable").doubleScroll();

function generateLink(){
    let keys = [], values = [];

    //SPECIAL FOR FORGE PAGE
    keys.push("run");
    values.push("1");

    // if($("#overallProfileName").val()!=""){
    //     keys.push("name");
    //     values.push($("#overallProfileName").val().toLowerCase());
    //     if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            
    //         keys.push("profile");
    //         values.push($("#overallProfileProfile").children("option:selected").val());
    //     }}
    // }

    // if($("#overallOfflineTimeUnit").val()==1){ //use day as unit
    //     if($("#overallOfflineTime").val()!=1){
    //         keys.push("offlineTime");
    //         values.push($("#overallOfflineTime").val()*24);
    //     }
    // }else{ //use hour as unit
    //     keys.push("offlineTimeUnit");
    //     values.push($("#overallOfflineTimeUnit").val());
    //     if($("#overallOfflineTime").val()!=24){
    //         keys.push("offlineTime");
    //         values.push($("#overallOfflineTime").val());
    //     }

    // }
    
    let string = "/new-forge"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    
    if(location.origin+string==window.location.href) location.reload();
    else window.location.href=string;
}

let hiddenCols = [];
function hideCol(col){
    hiddenCols.push(col);
    $("."+col).addClass("d-none");
}

function unhideCol(){
    hiddenCols.forEach((hiddenCol)=>{
        $("."+hiddenCol).removeClass("d-none");
    })
}
