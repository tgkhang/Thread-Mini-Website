'use strict'
const helper= {};

helper.createStarList= (stars)=>{
    // let star= Math.floor(stars);
    // let half= stars- star;

    // let str= '<div class="ratting">';
    // let i;
    // for(i=0;i<star;i++)
    // {
    //     str+= '<i class"fa fa-star"></i>';
    // }
    // if(half>0){
    //     str+= '<i class="fa fa-star-half"></i>'
    //     i++;
    // }
    // for(;i<5;i++){
    //     str+= '<i class="fa fa-star-o"></i>'
    // }
    // str+='</div>' 
    // return str;
}

helper.formatDate= (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

helper.arrayInclude= (array,value) => {
    //console.log("arrayInclude", array, value);
    return array.includes(value);
}


helper.eq = (a,b) => {
    if(b===undefined)b=a;
    //console.log("eq", a, b);
    return a === b;
}

helper.timeExpectation = (createdAt) => {
    const now = new Date(); // Current time
    const targetDate = new Date(createdAt); // Input date
    const diffInSeconds = Math.floor((now - targetDate) / 1000);

    // Time intervals in seconds
    const timeIntervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    // Determine the appropriate interval
    for (const interval of timeIntervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {
            return count === 1
                ? `${count} ${interval.label} ago`
                : `${count} ${interval.label}s ago`;
        }
    }
    return "just now";
};

module.exports= helper;