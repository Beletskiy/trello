function CardController(cardFactory, listFactory) {

    this.isEditing = false;
    this.editingCard = null;

    this.lists = listFactory.getLists();
    
    this.editCard = function () {
        this.isEditing = true;
        this.editingCard = angular.copy(this.card);
    };

    this.updateCard = function () {
        var list = _.filter(this.lists, {id: this.editingCard.list_id})[0];
        
        cardFactory.updateCard(this.editingCard, list);
        this.editingCard = null;
        this.isEditing = false;
    };
}
CardController.$inject = ['cardFactory', 'listFactory'];
angular.module('app').component('trelloCard', {
    templateUrl: 'js/components/card.html',
    controller: CardController,
    bindings: {
        card: '<',
        onDelete: '&'
    }
});