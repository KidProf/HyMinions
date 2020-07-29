//EVENTS
//Running once per second
setInterval(updateEvents,1000);

function updateEvents(){
    var numberOfEvents = 6;

    //find the event that happen most quickly
    var eventIndex = 0;
    var eventTime = 10*24*3600*1000;
    console.log("updated");
    //calculate the values displayed
    for(let i=0;i<numberOfEvents;i++){
        if(eventsData[i].major){
            timeAfterEvent = (Date.now().valueOf() - eventsData[i].refTime.valueOf())%(eventsData[i].interval);
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
initCalculateMinionsProfit(0, 11, 25, -3, 0, 1).then(()=>{
    //async await
    //sort: descending order by profit
    minions.sort((a,b) =>{
        return b.profit-a.profit;
    });

    minions.forEach((minion,index)=>{
        $("#minion"+index+"Name").html(minion.name);
        $("#minion"+index+"Profit").html(Math.round(minion.profit*10)/10);

    });
});
