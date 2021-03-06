/**
 * Created by alex on 12/14/15.
 */

var fs = require('fs');
var path = require('path');
var express = require("express");

var appPath = path.dirname(process.mainModule.filename);

var app = express();


const taskListText = fs.readFileSync(appPath + '/data/tasks.json');
const taskList = JSON.parse(taskListText);

app.get('/tasks', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(taskListText);
});

app.get(/^\/task\/([0-9]+)$/, function (req, res) {
    var taskId = req.params[0], result = '';

    for (var i in taskList) {
        if (taskList[i].changelist == taskId) {
            result = JSON.stringify(taskList[i]);
            break;
        }
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(result);
});

app.use(express.static(appPath));

app.listen(8000);