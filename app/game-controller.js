app.controller('GameController', function ($scope, $timeout, GameService) {

    $scope.numGuesses = 0;
    $scope.totalMatches = 0;
    
    //Create two card variables to keep track of the current selections
    //Add to $scope a way to track number of guesses, and total matches
    $scope.card1 = 0;
    $scope.card2 = 0;

    //This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    $scope.deck = GameService.getDeck();
	
	
    //Write a function that accepts a card object on click.
    $scope.selectCard = function (card) {
       if($scope.card1 && $scope.card2){
           return;
       }
        if (card.show) {
            return;
        } else {
            card.show = true;
        }
        if ($scope.card1) {
            $scope.card2 = card;
        } else {
            $scope.card1 = card;
            return;
        }
        if ($scope.card1.title === $scope.card2.title) {
            $scope.totalMatches++;
            $scope.numGuesses++;
            $scope.clearCard();
            	$scope.checkVictory($scope.totalMatches);
        } else {
           $timeout(function(){ $scope.numGuesses++;
            $scope.card1.show = false;
            $scope.card2.show = false;
            $scope.clearCard();
        }, 1000)

    }
    }
    //Before assingning card1 or card2 check to make sure both cards are falsey 
    //This function should set either card1 or card2 depending on the order of selection
    //set card.show to true
    //if this is card 1 then return to short circut the function
    //if card2 and card2 isMatch of card 1 then resetCards() increase the totalMatches and checkVictory()
    //otherwise this is where we will need to use $timeout with a delay of 1000 
    //set card1.show = false
    //card2.show = false
    //resetCards() 
    $scope.clearCard = function () {
        $scope.card1 = 0;
        $scope.card2 = 0;
    }
	
    //write a function to resetCards
    //it will empty the two card variables above and increase the number of attempts
	
	
    //write a checkVictory function that will set $scope.victory = true if the totalMatches is half the length of the deck
	$scope.checkVictory = function(totalMatches){
        if(totalMatches === 12){
            $scope.victory =true;
        }
    }
    //write an isMatch function that accepts two cards and returns true or false if the card titles match.
	
	$scope.startFresh = function(){
        $scope.clearCard();
        $scope.numGuesses = 0;
        $scope.totalMatches = 0;
                    $scope.victory =false;
        $scope.deck = GameService.getDeck();
 }
    //Bonus: Write a function that can reset the game
	
});