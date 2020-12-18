//for ref time, month need to be -1, hours need to -8 (UTC time is needed), the time is the start time of the event, the ref time must be a time from the past

var eventsData = [
    {
        name: "Spooky Festival",
        refTime: new Date(2020,3-1,15,7-8,35,0),
        interval: (5*24+4)*3600*1000,
        duration: 3600*1000,
        major: true,
    },{
        name: "Season Of Jerry",
        refTime: new Date(2020,3-1,11,19-8,15,0),
        interval: (5*24+4)*3600*1000, //5 days 4 hours
        duration: 3600*1000,
        major: true,
    },{
        name: "New Year Celebration",
        refTime: new Date(2020,3-1,11,20-8,55,0),
        interval: (5*24+4)*3600*1000, //5 days 4 hours
        duration: 3600*1000,
        major: true,
    },{
        name: "Travelling Zoo",
        refTime: new Date(2020,3-1,13,4-8,55,0),
        interval: (2*24+14)*3600*1000, //2 days 14 hours
        duration: 3600*1000,
        major: true,
    },{
        name: "Winter Island",
        refTime: new Date(2020,6-1,7,7-8,35,00),
        interval: (5*24+4)*3600*1000, //5 days 4 hours,
        duration: 31*20*60*1000, //10 hours, 20 mins
        major: false,
    },{
        name: "Mayor Election",
        refTime: new Date(2020,12-1,18,10-8,15,0),
        interval: (5*24+4)*3600*1000, //5 days 4 hours
        duration: (3*24+21)*3600*1000, //3 days 21 hours
        major: false,
    },{
        name: "Bank Interest",
        refTime: new Date(2020,3-1,11,21-8,55,0),
        interval: 31*3600*1000, //31 hours
        duration: 0,
        major: false,
    },{
        name: "Jacob's Farming Contest",
        refTime: new Date(2020,12-1,18,16-8,15,0),
        interval: 3600*1000, //1 hour
        duration: 20*60*1000, //20 minutes
        major: false,
    },{
        name: "Dark Auction",
        refTime: new Date(2020,3-1,11,12-8,55,0),
        interval: 3600*1000, //1 hour
        duration: 0,
        major: false,
    },
];