function ListsController(listFactory) {
    
    this.lists = listFactory.getLists();

    this.addList = function () {
        listFactory.addList(this.listName);
        this.listName = '';
    };
}
ListsController.$inject = ['listFactory'];
    app.component('trelloLists', {
    templateUrl: 'js/components/lists.html',
    controller: ListsController
});