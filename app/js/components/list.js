function ListController(listFactory, cardFactory) {

    this.arrOfCards = cardFactory.getCards(this.list);

    this.removeList = function () {
        listFactory.removeList(this.list);
    };

    this.getCards = function () {
        return cardFactory.getCards(this.list);
    };

    this.deleteCard = function (card) {
        cardFactory.deleteCard(card);
        this.arrOfCards = cardFactory.getCards(this.list);  //how to get rid this duplication ???
    };

    this.createCard = function () {
        cardFactory.createCard(this.list, this.cardDescription);
        this.arrOfCards = cardFactory.getCards(this.list);   //how to get rid this duplication ???
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
    }
}
ListController.$inject = ['listFactory', 'cardFactory'];
angular.module('app').component('trelloList', {
    templateUrl: 'js/components/list.html',
    controller: ListController,
    bindings: {
        list: '<'
    }
});