function CardController(cardFactory, listFactory, $scope) {

    this.isEditing = false;
    this.editingCard = null;

    this.lists = listFactory.getLists();
    
    this.editCard = function () {
        this.isEditing = true;
        this.editingCard = angular.copy(this.card);
    };

    this.updateCard = function () {
        var destinationList = _.filter(this.lists, {id: this.editingCard.list_id})[0];

        cardFactory.updateCard(this.editingCard, destinationList);
        //listFactory.triggerCardUpdate({ listIds: [ this.editingCard.list_id, list.id ] });//todo emit event
        $scope.$emit('updateCard', destinationList);

        this.editingCard = null;
        this.isEditing = false;
    };
}
CardController.$inject = ['cardFactory', 'listFactory', '$scope'];
    app.component('trelloCard', {
    templateUrl: 'js/components/card/card.html',
    controller: CardController,
    bindings: {
        card: '<',
        onDelete: '&'
    }
});