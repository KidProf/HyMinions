//Running once per second
setInterval(updateEvents,1000);
let manualTime = 0;

function updateEvents(){
    let numberOfEvents = 9;
    let numberOfMajorEvents = 4;
    
    //let currentTime = new Date();
    let currentTime = new Date();
    let totalTimezoneOffset = currentTime.getTimezoneOffset()*1000*60 + manualTime*3600*1000;
    let majorLivePointer = 0;
    let majorPointer = 0;
    let minorLivePointer = numberOfMajorEvents;
    let minorPointer = numberOfMajorEvents;

    //sequence = major live events,     major events,    minor live events,     minor events
    //           ^majorLivePointer      ^ majorPointer   ^minorLivePointer      ^minorPointer

    console.log("updated" + manualTime);
    //calculate the values displayed
    for(let i=0;i<numberOfEvents;i++){
        //since currentTime does not take timezones into account, while events reftime does, so gettimezoneoffset is used to balance off the data, which returns the timezone in MINUTES.
        let timeDifference = currentTime.valueOf() - eventsData[i].refTime.valueOf() +totalTimezoneOffset;
        timeAfterEvent = (timeDifference)%(eventsData[i].interval);
        let numberOfEventsPassed = Math.floor((timeDifference)/(eventsData[i].interval));
        
        if(timeAfterEvent<eventsData[i].duration){
            eventsData[i].isLive = true;
            eventsData[i].timeDisplayed = durationToString(eventsData[i].duration - timeAfterEvent);
            //start time + duration
            eventsData[i].exactDateTime = dateTimeToString((numberOfEventsPassed)*eventsData[i].interval+eventsData[i].duration+eventsData[i].refTime.valueOf() -totalTimezoneOffset);
            
            if(eventsData[i].major) majorPointer++; else minorPointer++;
        }else{
            eventsData[i].isLive = false;
            eventsData[i].timeDisplayed = durationToString(eventsData[i].interval - timeAfterEvent);
            //previous start time + 1
            eventsData[i].exactDateTime = dateTimeToString((numberOfEventsPassed+1)*eventsData[i].interval+eventsData[i].refTime.valueOf() -totalTimezoneOffset);
        
            // if(i==0){
            //     console.log(numberOfEventsPassed);
            //     console.log(eventsData[i].interval);
            //     console.log(numberOfEventsPassed*eventsData[i].interval+eventsData[i].refTime.valueOf());
            // }
        }
    }



    for(let i=0;i<numberOfEvents;i++){
        let sequence;
        if(eventsData[i].isLive){
            if(eventsData[i].major){
                sequence = majorLivePointer;
                majorLivePointer++;
            }else{
                sequence = minorLivePointer;
                minorLivePointer++;
            }
            $("#event"+sequence+" >> .name").html(eventsData[i].name + " LIVE!");
            $("#event"+sequence+" >> .timeDisplayed").html("Ending in "+ eventsData[i].timeDisplayed);
            $("#event"+sequence+" >> img").attr("src","/images/events/"+eventsData[i].name+".png")
            $("#event"+sequence+" >> .exactDateTime").html("("+eventsData[i].exactDateTime+")");
            $("#event"+sequence).addClass("live")
        }else{
            if(eventsData[i].major){
                sequence = majorPointer;
                majorPointer++;
            }else{
                sequence = minorPointer;
                minorPointer++;
            }
            $("#event"+sequence+" >> .name").html(eventsData[i].name);
            $("#event"+sequence+" >> .timeDisplayed").html(eventsData[i].timeDisplayed);
            $("#event"+sequence+" >> img").attr("src","/images/events/"+eventsData[i].name+".png")
            $("#event"+sequence+" >> .exactDateTime").html("("+eventsData[i].exactDateTime+")");
            $("#event"+sequence).removeClass("live")
        }
        //console.log(sequence);
    }

    // let sequence = 0;
    // //print on screen using jquery (for live events)
    // for(let i=0;i<numberOfEvents;i++){
    //     if(eventsData[i].isLive){
    //         $("#event"+sequence+" >> .name").html(eventsData[i].name + " LIVE!");
    //         $("#event"+sequence+" >> .timeDisplayed").html("Ending in "+ eventsData[i].timeDisplayed);
    //         $("#event"+sequence+" >> img").attr("src","/images/events/"+eventsData[i].name+".png")
    //         $("#event"+sequence).addClass("live")
    //         sequence++;
    //     }
    // }
    // //(for not live events)
    // for(let i=0;i<numberOfEvents;i++){
    //     if(!eventsData[i].isLive){
    //         $("#event"+sequence+" >> .name").html(eventsData[i].name);
    //         $("#event"+sequence+" >> .timeDisplayed").html(eventsData[i].timeDisplayed);
    //         $("#event"+sequence+" >> img").attr("src","/images/events/"+eventsData[i].name+".png")
    //         sequence++;
    //     }
    // }

    function durationToString(duration){
        if(duration>2*24*3600*1000){
            return numberToString(duration/(24*3600*1000),1) + " days, " + numberToString(duration/(3600*1000)%24,2) + ":" + numberToString(duration/(60*1000)%60,2) + ":" +  numberToString(duration/1000%60,2)
        }else if(duration > 24*3600*1000){
            return numberToString(duration/(24*3600*1000),1) + " day, " + numberToString(duration/(3600*1000)%24,2) + ":" + numberToString(duration/(60*1000)%60,2) + ":" +  numberToString(duration/1000%60,2)
        }else{
            return numberToString(duration/(3600*1000),2) + ":" + numberToString(duration/(60*1000)%60,2) + ":" + numberToString(duration/1000%60,2)
        }
    }

    function dateTimeToString(dateTime){
        let d = new Date(dateTime);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+numberToString(d.getHours(),2)+":"+numberToString(d.getMinutes(),2)+":"+numberToString(d.getSeconds(),2)
    }
    //create leading zeros
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

function applyManualTime(){
    manualTime = $("#manualTime").val();
}