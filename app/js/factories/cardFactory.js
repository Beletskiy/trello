    app.factory('cardFactory', function () {
    var service = {};

    var cards = [
        {
            id: 1,
            description: 'Fix bug in player',
            list_id: 1,
            sortIndex: 0
        },
        {
            id: 2,
            description: 'Add feature with D3',
            list_id: 1,
            sortIndex: 1
        },
        {
            id: 3,
            description: 'Learn AngularJS',
            list_id: 3,
            sortIndex: 0
        }
    ];

    service.getCards = function (list) {
        return _.filter(cards, {list_id: list.id});
    };

    service.createCard = function (list, cardDescription) {
        cards.push({
            id: _.uniqueId('card_'),
            description: cardDescription,
            list_id: list.id,
            sortIndex: getSortIndex(list)
        });
    };

    service.deleteCard = function (card) {
        _.pull(cards, card);
        changeSortIndicesAfterRemovingCard(card);
    };

    service.updateCard = function (updatingCard, destinationList) {
        var card = _.find(cards, {id: updatingCard.id});

        card.description = updatingCard.description;
        if (card.list_id !== updatingCard.list_id) {
            changeSortIndicesAfterRemovingCard(card);
            card.sortIndex = getSortIndex(destinationList);
            // todo change this.arrOfCards
        }
        card.list_id = updatingCard.list_id;
    };

    service.changeSortIndicesInsideList = function (source, destination) {
        var destIndex = destination.index;
        source.itemScope.modelValue.sortIndex = destIndex;
        if (source.index > destination.index) {
            destIndex++;
            while ((destIndex < destination.sortableScope.modelValue.length)
            && (destination.sortableScope.modelValue[destIndex].sortIndex < destination.sortableScope.modelValue.length - 1)) {
                destination.sortableScope.modelValue[destIndex].sortIndex++;
                destIndex++;
            }
        } else {
            destIndex--;
            while ((destIndex > -1) && (destination.sortableScope.modelValue[destIndex].sortIndex > 0)) {
                destination.sortableScope.modelValue[destIndex].sortIndex--;
                destIndex--;
            }
        }
    };
    service.changeSortIndicesBetweenLists = function (source, destination) {
        source.itemScope.modelValue.list_id = destination.sortableScope.$parent.$ctrl.list.id;
        destination.sortableScope.modelValue[destination.index].sortIndex = destination.index;
        if (source.index < source.sortableScope.modelValue.length) {
            for (var i = source.index; i < source.sortableScope.modelValue.length; i++) {
                source.sortableScope.modelValue[i].sortIndex--;
            }
        }
        if (destination.index < destination.sortableScope.modelValue.length - 1) {
            for (i = ++destination.index; i < destination.sortableScope.modelValue.length; i++) {
                destination.sortableScope.modelValue[i].sortIndex++;
            }
        }
    };

    var getSortIndex = function (list) {
        return service.getCards(list).length;
    };

    var changeSortIndicesAfterRemovingCard = function (card) {
        var removedIndex = card.sortIndex;
        var cardsFromCurrentList = _.filter(cards, {list_id: card.list_id});

        if (removedIndex < cardsFromCurrentList.length) {
            for (var i = removedIndex; i < cardsFromCurrentList.length; i++) {
                cardsFromCurrentList[i].sortIndex--;
            }
        }
    };
    return service;
});
