function ListController(listFactory, cardFactory, $scope) {
    var self = this;

    this.arrOfCards = cardFactory.getCards(this.list);

    this.removeList = function () {
        listFactory.removeList(this.list);
    };

    this.getCards = function () {
        console.log('getCards');
        return cardFactory.getCards(this.list);
    };

    this.deleteCard = function (card) {
        cardFactory.deleteCard(card);
        this.arrOfCards = cardFactory.getCards(this.list);
    };

    this.createCard = function () {
        cardFactory.createCard(this.list, this.cardDescription);
        this.arrOfCards = cardFactory.getCards(this.list);
        this.cardDescription = '';
    };
    
    this.dragControlListeners = {
        accept: function (sourceItemHandleScope, destSortableScope) {
            return true
        },
        itemMoved: function (event) {
            cardFactory.changeSortIndicesBetweenLists(event.source, event.dest);
        },
        orderChanged: function (event) {
            cardFactory.changeSortIndicesInsideList(event.source, event.dest);
        },
        containment: '#lists-container'
    };
    $scope.$on('updateCard', function (event, updatedList) {
        self.arrOfCards = cardFactory.getCards(self.list);
    });
}
ListController.$inject = ['listFactory', 'cardFactory', '$scope'];
app.component('trelloList', {
    templateUrl: 'js/components/list.html',
    controller: ListController,
    bindings: {
        list: '<'
    }
});