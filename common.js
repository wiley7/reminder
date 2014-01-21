function prepareDb(ready, error) {
    return openDatabase('tasks', '1.0', 'the reminder tasks', 5 * 1024 * 1024, function (db) {
        db.changeVersion('', '1.0', function (t) {
            t.executeSql('CREATE TABLE tasks (name, desc, title, body, url)');
        }, error);
    });
}
