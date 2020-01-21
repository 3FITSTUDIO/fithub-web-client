function AddWeightsViewModel() {
    var self = this;
    self.data = ko.observable();
    self.amount = ko.observable();

    self.addWeight = function() {
        let dt = Date();
        WeightsViewModel.add({
            data: dt.toLocaleDateString(),
            amount: self.amount()
        });
        self.data("");
        self.amount("");
    }
}