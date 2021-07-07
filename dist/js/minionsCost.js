$("#minionsTable").doubleScroll();

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

    //output
    let string = "/minionscost/?"
    for(let i=0;i<keys.length;i++){
        string += keys[i]+"="+values[i]+"&";
    }
    string += "/#content";
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
