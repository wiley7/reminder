var proxyData = "";
function showReminderTasks() {
    //var tasks = JSON.parse(localStorage['reminderTasks']);
    proxyData = localStorage['reminderTasks'];
    Process();
    $(".expandimg").each(function (idx){
        $(this)[0].onclick = onExpImgClick;
    });
}

function getNewTaskInfo() {
    var info = {}
    info['name'] = document.getElementById("add_name").value;
    info['title'] = document.getElementById("add_title").value;
    info['body'] = document.getElementById("add_body").value;
    info['url'] = document.getElementById("add_url").value;
    info['cycle'] = {};
    info['cycle']['type'] = document.getElementById("add_cycle_type").value;
    if (document.getElementById('add_cycle_hour')){
        info['cycle']['h'] = parseInt(document.getElementById("add_cycle_hour").value);
    }
    if (document.getElementById('add_cycle_min')){
        info['cycle']['min'] = parseInt(document.getElementById("add_cycle_min").value);
    }
    if (document.getElementById('add_cycle_day')){
        info['cycle']['wd'] = parseInt(document.getElementById("add_cycle_day").value);
    }
    if (document.getElementById('add_cycle_date')){
        info['cycle']['d'] = parseInt(document.getElementById("add_cycle_date").value);
    }
    if (document.getElementById('add_cycle_mon')){
        info['cycle']['m'] = parseInt(document.getElementById("add_cycle_mon").value);
    }
    return info;
}

function clearInfo() {
    document.getElementById("add_name").value = null;
    document.getElementById("add_title").value = null;
    document.getElementById("add_body").value = null;
    document.getElementById("add_url").value = null;
    document.getElementById("add_cycle_type").value = '';
    $(".cycleinfo").html('');
}

function addReminderTask(task) {
    var tasks;
    if (localStorage['reminderTasks']) {
        tasks = JSON.parse(localStorage['reminderTasks']);
    }else{
        tasks = {}
    }
    if (tasks[task['name']]) {
        alert("error, alreay exists");
        console.log("error, " + task['name'] + " already exsits!");
        return;
    }
    tasks[task['name']] = task;
    localStorage['reminderTasks'] = JSON.stringify(tasks);
    showReminderTasks();
}
function clearReminderTasks() {
    localStorage['reminderTasks'] = '';
}

function removeReminderTask(name) {
    var tasks = JSON.parse(localStorage['reminderTasks']);
    if (tasks[name]) {
        delete tasks[name];
    }
    localStorage['reminderTasks'] = JSON.stringify(tasks);
    showReminderTasks();
}

function onTypeChange(e) {
    var selector = e.currentTarget;
    var value = selector.value;
    var html = getInfoHtmlByType(value);
    $('.cycleinfo').html(html);
    // clean
}

function getInfoHtmlByType(type) {
    if (type == "daily"){
        return getDailyHtml();
    }else if (type == "weekly") {
        return getWeeklyHtml();
    }else if (type == "monthly") {
        return getMonthlyHtml();
    }else if (type == "yearly") {
        return getYearlyHtml();
    }else{
        return '';
    }
}

function getDailyHtml() {
    var html = '<tr><td>Hour:</td><td><input type=text id=add_cycle_hour><br/></td></tr><tr><td>Minutes:</td><td><input type=text id=add_cycle_min><br/></td></tr>';
    return html;
}
function getWeeklyHtml() {
    var html = '<tr><td>Day(0-6):</td><td><input type=text id=add_cycle_day><br/></td></tr><tr><td>Hour:</td><td><input type=text id=add_cycle_hour><br/></td></tr>';
    return html;
}
function getMonthlyHtml() {
    var html = '<tr><td>Date(1-31):</td><td><input type=text id=add_cycle_date><br/></td></tr><tr><td>Hour:</td><td><input type=text id=add_cycle_hour><br/></td></tr>';
    return html;
}
function getYearlyHtml() {
    var html = '<tr><td>Month(1-12):</td><td><input type=text id=add_cycle_mon><br/></td></tr><tr><td>Date:</td><td><input type=text id=add_cycle_date><br/></td></tr><tr><td>Hour:</td><td><input type=text id=add_cycle_hour><br/></td></tr>';
    return html;
}

function onBtnAddClick() {
    addReminderTask(getNewTaskInfo());
    clearInfo();
}

function onBtnDelClick() {
    var name = document.getElementById('del_name').value;
    if (name != ''){
        removeReminderTask(name);
    }
    document.getElementById('del_name').value = null;
}

showReminderTasks();
$(".btnadd")[0].onclick = onBtnAddClick;
$(".btndel")[0].onclick = onBtnDelClick;
$("#add_cycle_type")[0].onchange = onTypeChange;
