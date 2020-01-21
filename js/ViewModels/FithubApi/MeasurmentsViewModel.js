function MeasurmentsViewModel() {
    var self = this;
    self.tasksURI = 'http://localhost:5000/todo/api/v1.0/measurments'; // TO DO
    self.username = "";
    self.password = "";
    self.tasks = ko.observableArray();

    self.ajax = function(uri, method, data) {
        var request = {
            url: uri,
            type: method,
            contentType: "application/json",
            accepts: "application/json",
            cache: false,
            dataType: 'json',

            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",
                    "Basic " + btoa(self.username + ":" + self.password));
            },
            error: function(jqXHR) {
                console.log("ajax error " + jqXHR.status);
            }
        };
        return $.ajax(request);
    }

    self.beginAdd = function() {
        $('#add').modal('show');
    }
    self.add = function(task) {
        self.ajax(self.tasksURI, 'POST', task).done(function(data) {
            self.tasks.push({
                uri: ko.observable(data.task.uri),
                title: ko.observable(data.task.title),
                description: ko.observable(data.task.description),
                done: ko.observable(data.task.done)
            });
        });
    }


    self.beginLogin = function() {
        $('#login').modal('show');
    }
    self.login = function(username, password) {
        self.username = username;
        self.password = password;
        self.ajax(self.tasksURI, 'GET').done(function(data) {
            for (var i = 0; i < data.tasks.length; i++) {
                self.tasks.push({
                    uri: ko.observable(data.tasks[i].uri),
                    title: ko.observable(data.tasks[i].title),
                    description: ko.observable(data.tasks[i].description),
                    done: ko.observable(data.tasks[i].done)
                });
            }
        }).fail(function(jqXHR) {
            if (jqXHR.status == 403)
                setTimeout(self.beginLogin, 500);
        });
    }

    self.beginLogin();
}