function AddListController(listFactory) {

    this.addList = function () {
        listFactory.addList(this.listName);
        this.listName = '';
    };
}
AddListController.$inject = ['listFactory'];
app.component('inputAddList', {
    templateUrl: 'js/components/inputAddList/inputAddList.html',
    controller: AddListController
});