function CardController(cardFactory, listFactory) {

    this.isEditing = false;
    this.editingCard = null;

    this.lists = listFactory.getLists();

    this.deleteCard = function (card) {
        cardFactory.deleteCard(card);
    };

    this.editCard = function (card) {
        this.isEditing = true;
        this.editingCard = angular.copy(card);
    };

    this.updateCard = function () {
        cardFactory.updateCard(this.editingCard);
        this.editingCard = null;
        this.isEditing = false;
    };
}
CardController.$inject = ['cardFactory', 'listFactory'];
angular.module('app').component('trelloCard', {
    templateUrl: 'js/components/card.html',
    controller: CardController,
    bindings: {
        card: '<'
    }
});