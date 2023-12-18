var express = require('express');
var router = express.Router();

router.get("/:ipAddr",function(req, res) {
    var ipStr = req.params.ipAddr;
    var ipArr = ipStr.split("-");
    var ipAddr = ipArr[0] + "." + ipArr[1] + "."  + ipArr[2] + "." + ipArr[3];
    if (ipArr.length != 4) {
        res.status(400).send("Invalid IP address");
    } else {
        var exec = require('child_process').exec;
        var cmd = "ping -c 3 " + ipAddr;
        exec(cmd, function(err, stdout, stderr) {
            if (err) {
                const data = {status: "offline", time: 0};
                
                return res.status(500).send(JSON.stringify(data));
                
            }
            if (stderr) {
                const data = {status: "offline", time: 0};
                return;
            }
            
            const data = {status: "online", time: parseStdOut(stdout).toFixed(2)};
            res.status(200).send(JSON.stringify(data));
        })
    }

    
})

function parseStdOut(input) {
    var rx = /time=(\d+\.\d+) ms/g;
    var timeSum = 0.00;
    var count = 0;
    var timeAvg = 0.00;
    var match;
    while ((match = rx.exec(input)) !== null) {
        const timeValue = parseFloat(match[1]);
        
        timeSum += timeValue;
        count++;
    }
    timeAvg = timeSum / count;
    return timeAvg;
    
}

module.exports = router;