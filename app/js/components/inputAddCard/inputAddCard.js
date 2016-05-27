function AddCardController(cardFactory) {

}
AddCardController.$inject = ['cardFactory'];
app.component('inputAddCard', {
    templateUrl: 'js/components/inputAddCard/inputAddCard.html',
    controller: AddCardController,
    bindings: {
        cardDescription: '=',
        onCreate: '&'
    }
});
