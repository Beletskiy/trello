function ListController(listFactory, cardFactory) {

    this.arrOfCards = cardFactory.getCards(this.list);

    this.removeList = function () {
        listFactory.removeList(this.list);
    };

    this.getCards = function () {
        return cardFactory.getCards(this.list);
    };

    this.createCard = function () {
        cardFactory.createCard(this.list, this.cardDescription);
        this.arrOfCards = cardFactory.getCards(this.list);   //how to get rid this duplication ???
        this.cardDescription = '';
    };
    this.dragControlListeners = {
        accept: function (sourceItemHandleScope, destSortableScope) {
            //console.log('accept');
            return true
        },
        itemMoved: function (event) {
            //console.log('item Move');
            cardFactory.changeSortIndicesBetweenLists(event.source, event.dest);
        },
        orderChanged: function (event) {
            //console.log('order change');
            cardFactory.changeSortIndicesInsideList(event.source, event.dest);
        },
        containment: '#lists-container'
    }
}
ListController.$inject = ['listFactory', 'cardFactory', '$rootScope'];
angular.module('app').component('trelloList', {
    templateUrl: 'js/components/list.html',
    controller: ListController,
    bindings: {
        list: '<'
    }
});