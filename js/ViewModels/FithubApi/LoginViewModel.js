function LoginViewModel() {
    var self = this;
    self.username = ko.observable();
    self.password = ko.observable();

    self.login = function() {
        tasksViewModel.login(self.username(), self.password());
    }
}

// ko.applyBindings(loginViewModel, $('#login')[0]);