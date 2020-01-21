function CaloriesViewModel() {
    var self = this;
    self.caloriesURI = 'http://localhost:5000/todo/api/v1.0/calories'; // TO DO
    self.username = "";
    self.password = "";
    self.calories = ko.observableArray();

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

    // self.beginAdd = function() {
    //     $('#add').modal('show');
    // }
    self.add = function(calories) {
        self.ajax(self.caloriesURI, 'POST', calories).done(function(data) {
            self.calories.push({
                uri: ko.observable(data.calories.uri),
                data: ko.observable(data.calories.data),
                amount: ko.observable(data.calories.amount)
            });
        });
    }

//
//     self.beginLogin = function() {
//         $('#login').modal('show');
//     }
//     self.login = function(username, password) {
//         self.username = username;
//         self.password = password;
//         self.ajax(self.tasksURI, 'GET').done(function(data) {
//             for (var i = 0; i < data.tasks.length; i++) {
//                 self.tasks.push({
//                     uri: ko.observable(data.tasks[i].uri),
//                     title: ko.observable(data.tasks[i].title),
//                     description: ko.observable(data.tasks[i].description),
//                     done: ko.observable(data.tasks[i].done)
//                 });
//             }
//         }).fail(function(jqXHR) {
//             if (jqXHR.status == 403)
//                 setTimeout(self.beginLogin, 500);
//         });
//     }
//
//     self.beginLogin();
 }