//Running once per second
setInterval(updateEvents,1000);

function updateEvents(){
    var numberOfEvents = 6;
    
    console.log("updated");
    //calculate the values displayed
    for(let i=0;i<numberOfEvents;i++){
        timeAfterEvent = (Date.now().valueOf() - eventsData[i].refTime.valueOf())%(eventsData[i].interval);
        if(timeAfterEvent<eventsData[i].duration){
            eventsData[i].isLive = true;
            eventsData[i].timeDisplayed = durationToString(eventsData[i].duration - timeAfterEvent);
        }else{
            eventsData[i].isLive = false;
            eventsData[i].timeDisplayed = durationToString(eventsData[i].interval - timeAfterEvent);
        }
    }

    let sequence = 0;
    //print on screen using jquery (for live events)
    for(let i=0;i<numberOfEvents;i++){
        if(eventsData[i].isLive){
            $("#event"+sequence+" >> .name").html(eventsData[i].name + " LIVE!");
            $("#event"+sequence+" >> .timeDisplayed").html("Ending in "+ eventsData[i].timeDisplayed);
            $("#event"+sequence+" >> img").attr("src","/images/events/"+eventsData[i].name+".png")
            $("#event"+sequence).addClass("live")
            sequence++;
        }
    }
    //(for not live events)
    for(let i=0;i<numberOfEvents;i++){
        if(!eventsData[i].isLive){
            $("#event"+sequence+" >> .name").html(eventsData[i].name);
            $("#event"+sequence+" >> .timeDisplayed").html(eventsData[i].timeDisplayed);
            $("#event"+sequence+" >> img").attr("src","/images/events/"+eventsData[i].name+".png")
            sequence++;
        }
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
