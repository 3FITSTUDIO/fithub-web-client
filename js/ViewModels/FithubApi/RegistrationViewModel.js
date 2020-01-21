function RegistrationViewwModel() {
    var self = this;
    self.email = ko.observable();
    self.name = ko.observable();
    self.surname = ko.observable();

    self.addUser = function() {
        UserViewModel.add({
            email: self.email(),
            name: self.name(),
            surname: self.surname()
        });
        self.email("");
        self.name("");
        self.surname("");
    }
}