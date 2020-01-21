//TO DO

function AddMeasurmentsViewModel() {
    var self = this;
    self.data = ko.observable();
    self.amount = ko.observable();

    self.addCalories = function() {
        let dt = Date();
        CaloriesViewModel.add({
            data: dt.toLocaleDateString(),
            amount: self.amount()
        });
        self.data("");
        self.amount("");
    }
}