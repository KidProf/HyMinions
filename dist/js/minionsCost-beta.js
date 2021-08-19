//run on load
let hash = window.location.hash;
console.log(hash);
console.log(hash.includes("#allMinions"));
if(hash.substring(0,11)=="#allMinions"){
    //expand all
    $(".collapseNext").removeClass("d-none");
    $(".showNextButton").addClass("d-none");
    $(".hideNextButton").removeClass("d-none");
    $("#showAll").addClass("d-none");
    $("#hideAll").removeClass("d-none");
    rowNumber = hash.substring(11);
    console.log(rowNumber);
    window.location.hash = "#minion"+rowNumber+"Row";
}else if(hash=="#all"){
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

$("#overall").keydown(function(event) {
    if (event.keyCode === 13) {
        generateLink();
    }
});

//functions to provide interaction
function toggleUseProfile(){
    let useProfile = $("#overallUseProfile").prop("checked");
    if(useProfile){
        $("#slayerCollectionsUseProfile").removeClass("d-none");
        $("#slayerCollectionsNoProfile").addClass("d-none");
    }else{
        $("#slayerCollectionsUseProfile").addClass("d-none");
        $("#slayerCollectionsNoProfile").removeClass("d-none");
    }
}
function setUseProfile(){
    if($("#overallProfileName").val()!=""){
        $("#overallUseProfile").prop("checked",true);
        $("#slayerCollectionsUseProfile").removeClass("d-none");
        $("#slayerCollectionsNoProfile").addClass("d-none");
    }else{
        $("#overallUseProfile").prop("checked",false);
        $("#slayerCollectionsUseProfile").addClass("d-none");
        $("#slayerCollectionsNoProfile").removeClass("d-none");
    }
}
function toggleFilterMinionsSelectAll(){
    let selectAll = $("#filterMinionsSelectAll").prop("checked");
    if(selectAll){
        $('#filterMinionsBody input:checkbox').each(function() {
            $(this).prop("checked",true);
        });
    }else{
        $('#filterMinionsBody input:checkbox').each(function() {
            $(this).prop("checked",false);
        });
    }
}
function setFilterMinionsSelectAll(){
    if($('#filterMinionsBody input:checkbox:not(:checked)').length==0){
        $("#filterMinionsSelectAll").prop("checked",true);
    }else{
        $("#filterMinionsSelectAll").prop("checked",false);
    }
}
function toggleFilterTiersSelectAll(){
    let selectAll = $("#filterTiersSelectAll").prop("checked");
    if(selectAll){
        $('#filterTiersBody input:checkbox').each(function() {
            $(this).prop("checked",true);
        });
    }else{
        $('#filterTiersBody input:checkbox').each(function() {
            $(this).prop("checked",false);
        });
    }
}
function setFilterTiersSelectAll(){
    if($('#filterTiersBody input:checkbox:not(:checked)').length==0){
        $("#filterTiersSelectAll").prop("checked",true);
    }else{
        $("#filterTiersSelectAll").prop("checked",false);
    }
}
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
    $("#showAllBottom").addClass("d-none");
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
    if($("#overallUseProfile").prop("checked")&&$("#overallProfileName").val()!=""){
        keys.push("name");
        values.push($("#overallProfileName").val().toLowerCase());
        if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            keys.push("profile");
            values.push($("#overallProfileProfile").children("option:selected").val());
        }}
        if($("#overallFilterSlayers").prop("checked")!=1){ //default, will filter slayers
            keys.push("filterSlayers");
            values.push($("#overallFilterSlayers").prop("checked")? 1 : 0);
        }
        if($("#overallFilterCollections").prop("checked")!=1){ //default, will filter collections
            keys.push("filterCollections");
            values.push($("#overallFilterCollections").prop("checked")? 1 : 0);
        }
    }else{
        if($("#overallBottomSlayers").prop("checked")!=0){ //default, won't filter slayers
            keys.push("bottomSlayers");
            values.push($("#overallBottomSlayers").prop("checked")? 1 : 0);
        }
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
    if($("#overallDisplayMethod").children("option:selected").val()!=1){
        keys.push("displayMethod");
        values.push($("#overallDisplayMethod").children("option:selected").val());
    }
    if($("#overallShowSlots").prop("checked")!=1){
        keys.push("showSlots");
        values.push($("#overallShowSlots").prop("checked") ? 1 : 0);
    }
    // if($("#overallShowDetails").prop("checked")){
    //     keys.push("showDetails");
    //     values.push(1);
    // }

    //keep show details if showDetails=1 exists
    if(window.location.href.includes("showDetails=1")){
        keys.push("showDetails");
        values.push(1);
    }

    //filter
    $('#filterMinionsBody input:checkbox:not(:checked)').each(function() {
        keys.push("filterMinions");
        values.push($(this).attr('value'));
    });
    $('#filterTiersBody input:checkbox:not(:checked)').each(function() {
        keys.push("filterTiers");
        values.push($(this).attr('value'));
    });

    //output
    let string = "/minionscost-beta"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    
    if(location.origin+string==window.location.href) location.reload();
    else window.location.href=string;
}

function search(){
    window.location.hash="#content";
    let searchingName = $("#searchInput").val().toLowerCase();
    let results = new Array();
    for(i=0;i<$("#searchDatalist").children("option").length;i++){
        let target = $("#searchDatalist").children("option").eq(i).val().toLowerCase();
        if(target==searchingName){ //if exact match, then directly move to the row
            showAll();
            appendShowDetails(null,i);
        }
        if(target.includes(searchingName)){ //ALT: searchingName==target.substring(0,searchingName.length)
            results.push(i);
        };
    }
    console.log(results);
    if(results.length==1){
        showAll();
        appendShowDetails(null,results[0]);
    }
    
}


function appendShowDetails(nextIndex,minionIndex){
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
                if(leftString!="") values.push(leftString.substring(0,leftString.indexOf("#")));
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
    let string = "/minionscost-beta"
    let hash = ""
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    if(nextIndex){
        if(nextIndex==-1){
            hash = "#all";
        }else{
            hash = "#slot"+nextIndex+"Row";
        }
    }else{
        if(location.origin+string==window.location.href.substring(0,window.location.href.indexOf("#"))){
            hash = "#minion"+minionIndex+"Row";
        }else{
            hash = "#allMinions"+minionIndex;
        }
        
    }
    console.log(string);
    console.log(hash);

    console.log(location.origin+string);
    console.log(window.location.href.substring(0,window.location.href.indexOf("#")));
    if(location.origin+string==window.location.href.substring(0,window.location.href.indexOf("#"))){
        window.location.hash=hash;
    }else{
        window.location.href=string+hash;
    }
}

function clearInput(){
    $("#overallProfileName").val("");
    $("#overallProfileProfile").addClass("d-none");
    $("#overallProfileProfileLabel").addClass("d-none");
    $("#overallBuyingMethod").val("0");
    $("#overallTax").val(1);
    $("#overallShowDetails").prop("checked",false);
}