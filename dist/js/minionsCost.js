//run on load
let hash = window.location.hash;
console.log(hash);
if(hash=="#all"){
    //expand all
    $(".collapseNext").removeClass("d-none");
    $(".showNextButton").addClass("d-none");
    $(".hideNextButton").removeClass("d-none");
    $("#showAll").addClass("d-none");
    $("#hideAll").removeClass("d-none");
    window.location.hash = "#content";
}else if(hash.substring(0,5)=="#slot"){
    //expand the related slot
    let slotID = hash.substring(5,hash.length-3);
    console.log(slotID);
    showCollapseNext(slotID);
}
$("#minionsCostTable").doubleScroll();

//functions to provide interaction
function showCollapseNext(nextIndex){
    console.log("showCollapseNext("+nextIndex);
    $(".collapseNext"+nextIndex).removeClass("d-none");
    $("#showNextButton"+nextIndex).addClass("d-none");
    $("#hideNextButton"+nextIndex).removeClass("d-none");
    $("#minionsCostTable").doubleScroll();
}

function hideCollapseNext(nextIndex){
    console.log("hideCollapseNext("+nextIndex);
    $(".collapseNext"+nextIndex).addClass("d-none");
    $("#showNextButton"+nextIndex).removeClass("d-none");
    $("#hideNextButton"+nextIndex).addClass("d-none");
    $("#minionsCostTable").doubleScroll();
}
function showAll(){
    $(".collapseNext").removeClass("d-none");
    $(".showNextButton").addClass("d-none");
    $(".hideNextButton").removeClass("d-none");
    $("#showAll").addClass("d-none");
    $("#hideAll").removeClass("d-none");
    $("#minionsCostTable").doubleScroll();
}
function hideAll(){
    $(".collapseNext").addClass("d-none");
    $(".showNextButton").removeClass("d-none");
    $(".hideNextButton").addClass("d-none");
    $("#showAll").removeClass("d-none");
    $("#hideAll").addClass("d-none");
    $("#minionsCostTable").doubleScroll();
}
function generateLink(){
    let keys = [], values = [];

    //general
    if($("#overallProfileName").val()!=""){
        keys.push("name");
        values.push($("#overallProfileName").val());
        if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            
            keys.push("profile");
            values.push($("#overallProfileProfile").children("option:selected").val());
        }}
    }

    //advanced
    // if($("#overallBuyingFrom").children("option:selected").val()!=1){
    //     keys.push("buyingFrom");
    //     values.push($("#overallBuyingFrom").children("option:selected").val());
    // }
    if($("#overallBuyingMethod").children("option:selected").val()!=0){
        keys.push("buyingMethod");
        values.push($("#overallBuyingMethod").children("option:selected").val());
    }
    if($("#overallTax").val()!=1){
        keys.push("tax");
        values.push($("#overallTax").val());
    }
    if($("#overallShowDetails").prop("checked")){
        keys.push("showDetails");
        values.push(1);
    }

    //output
    let string = "/minionscost/?"
    for(let i=0;i<keys.length;i++){
        if(i!=0) string+="&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    window.location.href=string;
}

function search(){
    window.location.hash="#content";
    let searchingName = $("#searchInput").val();
    for(i=0;i<$("#searchDatalist").children("option").length;i++){
        if(searchingName==$("#searchDatalist").children("option").eq(i).val()){
            window.location.hash="#minion"+i+"Row";
        };
    }
}

function appendShowDetails(nextIndex){
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
                if(leftString!="") values.push(leftString);
            }else{
                if(leftString.substring(0,valuesEndLocation)!="") values.push(leftString.substring(0,valuesEndLocation));
                leftString = leftString.substring(valuesEndLocation+1);
            }
        }while(valuesEndLocation!=-1);
    }

    let i=0;
    while(i<keys.length){
        if(keys[i]=="showDetails"){
            keys.splice(i,1);
            values.splice(i,1);
            i--;
        }
        i++;
    }

    keys.push("showDetails");
    values.push(1);

    //output
    let string = "/minionsCost/?"
    for(let i=0;i<keys.length;i++){
        string += keys[i]+"="+values[i]+"&";
    }
    if(nextIndex==-1){
        string += "/#all";
    }else{
        string += "/#slot"+nextIndex+"Row";
    }

    console.log(string);
    window.location.href=string;
}
