//EVENTS
//Running once per second
setInterval(updateEvents,1000);

function updateEvents(){
    var numberOfEvents = 6;

    //find the event that happen most quickly
    var eventIndex = 0;
    var eventTime = 10*24*3600*1000;
    var currentTime = new Date();
    console.log("updated");
    //calculate the values displayed
    for(let i=0;i<numberOfEvents;i++){
        if(eventsData[i].major){
            timeAfterEvent = (currentTime.valueOf() - eventsData[i].refTime.valueOf() + currentTime.getTimezoneOffset()*1000*60)%(eventsData[i].interval);
            if(timeAfterEvent<eventsData[i].duration){
                eventsData[i].isLive = true;
                eventsData[i].timeDisplayed = durationToString(eventsData[i].duration - timeAfterEvent);
                eventIndex = i;
                break;
            }else{
                eventsData[i].isLive = false;
                eventsData[i].timeDisplayed = durationToString(eventsData[i].interval - timeAfterEvent);
                if(eventTime > (eventsData[i].interval - timeAfterEvent)){
                    eventIndex = i;
                    eventTime = eventsData[i].interval - timeAfterEvent;
                }
            }
        }

    }
    
    //print the event selected
    if(eventsData[eventIndex].isLive){
        $("#eventDescription").html(eventsData[eventIndex].name + " is LIVE! Ending in " + eventsData[eventIndex].timeDisplayed);
        $("#eventDescription").addClass("live")
    }else{
        $("#eventDescription").html(eventsData[eventIndex].name + " will start in " + eventsData[eventIndex].timeDisplayed);
        $("#eventDescription").removeClass("live")
    }
    

    function durationToString(duration){
        if(duration>2*24*3600*1000){
            return numberToString(duration/(24*3600*1000),1) + " days, " + numberToString(duration/(3600*1000)%24,2) + ":" + numberToString(duration/(60*1000)%60,2) + ":" +  numberToString(duration/1000%60,2)
        }else if(duration > 24*3600*1000){
            return numberToString(duration/(24*3600*1000),1) + " day, " + numberToString(duration/(3600*1000)%24,2) + ":" + numberToString(duration/(60*1000)%60,2) + ":" +  numberToString(duration/1000%60,2)
        }else{
            return numberToString(duration/(3600*1000),2) + ":" + numberToString(duration/(60*1000)%60,2) + ":" + numberToString(duration/1000%60,2)
        }
    }

    function numberToString(number, digits){
        var numberRemaining = number;
        var returnString = "";
        for(let i=(digits-1);i>=0;i--){
            returnString+=Math.floor(numberRemaining/Math.pow(10,i));
            numberRemaining=numberRemaining%Math.pow(10,i);
        }
        return returnString;
    }
}




//MINIONS
function generateLinkIndex(){
    let keys = [], values = [];

    //SPECIAL FOR INDEX PAGE
    keys.push("run");
    values.push("1");

    if($("#overallProfileName").val()!=""){
        keys.push("name");
        values.push($("#overallProfileName").val().toLowerCase());
        if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()!=0&&$("#overallProfileProfile").children("option:selected").val()!=undefined){{
            
            keys.push("profile");
            values.push($("#overallProfileProfile").children("option:selected").val());
        }}
    }

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
    let string = "/"
    for(let i=0;i<keys.length;i++){
        string += i==0 ? "?" : "&";
        string += keys[i]+"="+values[i];
    }
    string += "#content";
    
    if(location.origin+string==window.location.href) location.reload();
    else window.location.href=string;
}

function clearInput(){
    $("#overallProfileName").val("");
    $("#overallProfileProfile").addClass("d-none");
    $("#overallProfileProfileLabel").addClass("d-none");
    $("#overallOfflineTimeUnit").val("1");
    $("#overallOfflineTime").val(1);
}