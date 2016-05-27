function ListsController(listFactory) {
    
    this.lists = listFactory.getLists();
    
}
ListsController.$inject = ['listFactory'];
app.component('trelloLists', {
    templateUrl: 'js/components/lists/lists.html',
    controller: ListsController
});