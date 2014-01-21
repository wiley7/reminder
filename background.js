function show(info) {
    var notification = window.webkitNotifications.createNotification(
        'logo.png',                      // The image.
        info.title,
        info.body
    );
    notification.onclick = function() {
          // Handle action from notification being clicked.
          window.open(info.url);
    }
    notification.show();
    info['finished'] = 1;
}

var tasks;
var taskIntervIds = {};

// need daily or weekly or yearly

function initTasks() {
    tasks = null;
    if (localStorage['reminderTasks']){
        tasks = JSON.parse(localStorage['reminderTasks']);
    }else{
        tasks = {};
    }
}

function clearIntervals() {
    for(taskid in taskIntervIds) {
        self.clearInterval(taskIntervIds[taskid]);
    }
}

function addNotifications() {
    // clear Interval
    for (taskid in tasks) {
        var task = tasks[taskid];
        if (taskIntervIds[taskid]) {
            self.clearInterval(taskIntervIds[taskid]);
        }
        if (task['cycle']['type'] == 'daily') {
            taskIntervIds[taskid] = self.setInterval(function(){
                var date = new Date();
                var hour = date.getHours();
                var min = date.getMinutes();
                console.log(hour + ":" + min);
                if (!task['finished'] && task['cycle']['h'] == hour && task['cycle']['min'] == min){
                    show(task);
                }
            },10000);
        }else if (task['cycle']['type'] == 'weekly') {
            //self.setInterval(function(){
                var date = new Date();
                var day  = date.getDay();// 0-6, 0 表示星期日
                var hour = date.getHours();
                console.log(day + " " + hour);
                if (!task['finished'] && task['cycle']['wd'] == day && task['cycle']['h'] == hour) {
                    show(task);
                }
            //},10000);
        }else if (task['cycle']['type'] == 'monthly') {
            //self.setInterval(function(){
                var date = new Date();
                var day  = date.getDate();
                var hour = date.getHours();
                console.log(day + " " + hour);
                if (!task['finished'] && task['cycle']['d'] == day && task['cycle']['h'] == hour) {
                    show(task);
                }
            //},1000000);
        }else if (task['cycle']['type'] == 'yearly') {
            //self.setInterval(function(){
                var date = new Date();
                var mon = date.getMonth();
                var day  = date.getDay();
                var hour = date.getHours();
                console.log(day + " " + hour);
                if (!task['finished'] && task['cycle']['m'] == mon && task['cycle']['d'] == day && task['cycle']['h'] == hour) {
                    show(task);
                }
            //},10000);
        }
    }
}


initTasks();
addNotifications();

chrome.extension.onRequest.addListener(
    function (request,sender,callback) {
        if (request.command == "update"){
            initTasks();
            clearIntervals();
            addNotifications();
            callback({s:'ok',msg:"update tasks"});
        }
    }
);
