var express = require('express');
var router = express.Router();
var os = require('node:os');

router.get("/",function(req, res) {
    var cmd;

    if (req.query.host !== undefined) {
        //ping host
        const host = req.query.host;
        if (os.platform() === 'linux') {
            //linux
            cmd = "ping -c 3 " + host;
        } else {
            //windows
            cmd = "ping -n 3 " + host;            
        }
    } else {
        return;
    }
    var exec = require('child_process').exec;
    exec(cmd, function(err, stdout, stderr) {
        if (err) {
            const data = {status: "offline", time: 0};
            console.log(err);
            return res.status(500).send(JSON.stringify(data));
            
        }
        if (stderr) {
            console.log(stderr);
            const data = {status: "offline", time: 0};
            return;
        }
        console.log(stdout);
        const data = {status: "online", time: parseStdOut(stdout).toFixed(2)};
        res.status(200).send(JSON.stringify(data));
    })
    
    
})

function parseStdOut(input) {
    var rx = /time=(\d+(\.\d+)?|<\d+) ms/g;
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