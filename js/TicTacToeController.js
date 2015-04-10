(function(){

	angular
	   .module("TicApp")
	   .controller("TicTacToeController", TicTacToeController);

	TicTacToeController.$inject = ['$firebaseArray', '$firebaseObject'];

	function TicTacToeController ($firebaseArray, $firebaseObject) {

        // Capture Variable - using ttt to mirror the alias used in index.html
        ttt = this;

        // Firebase Reference
        var ref = new Firebase("https://westttapp.firebaseio.com/");
        ttt.game = $firebaseObject(ref);

        // Game Methods
        ttt.getMove = getMove; // Method to place the move to a box based on current turn.
        ttt.gameWinner = gameWinner; // Method to check for win or tie.
        ttt.resetGame = resetGame; // Resets game values back to default.
        ttt.initialize = initialize();
        ttt.setPlayer1 = setPlayer1;
        ttt.setPlayer2 = setPlayer2;

        function setPlayer1(param) {
            if (ttt.playerID == 2) {
                alert("You cant be Player 1, you're already playing as Player 2.");
                return false;
            } else {
            ttt.game.Player1 = param;
            ttt.playerID = 1;
            ttt.game.$save();
            }
        }

        function setPlayer2(param) {
            if (ttt.playerID == 1) {
                alert("You cant be Player 2, you're already playing as Player 1.");
                return false;
            } else {
            ttt.game.Player2 = param;
            ttt.playerID = 2;
            ttt.game.$save();
            }
        }

        function initialize() {
            ttt.game.turn = 1; // Player 1 (X) starts.
            ttt.game.P1Move = true; // Used for the "Your move!" text in game.
            ttt.game.turnCounter = 0; // Turn counter starts at 0.
            ttt.game.grid = [ // Empty game board.
                {box: ""}, {box: ""}, {box: ""},
                {box: ""}, {box: ""}, {box: ""},
                {box: ""}, {box: ""}, {box: ""}
                ];
            ttt.game.$save();
        }

        function getMove(index) {
            if (ttt.game.grid[index].box) { // If there is something in the box the user clicked..
                return false;
            } else if (ttt.game.turn === 1 && !ttt.game.gameOver && ttt.playerID === 1) { // If the current turn is 1, and the game isn't over, and the user playing is Player 1 then..
                ttt.game.grid[index].box = "X"; // Place an X as the value for box.
                ttt.game.turn = 2; // Switch turns.
                ttt.game.P1Move = false; // Used for the "Your move!" text in game.
                ttt.game.P2Move = true; // Used for the "Your move!" text in game.
                ttt.game.turnCounter++; // Increment turn counter.
                ttt.game.$save(); // Save Changes.
                ttt.gameWinner(ttt.game.grid[index].box);
            } else if (ttt.game.turn === 2 && !ttt.game.gameOver && ttt.playerID === 2) { // If the current turn is 2, and the game isn't over, and the user playing is Player 2 then..
                ttt.game.grid[index].box = "O"; // Place an O as the value for box.
                ttt.game.turn = 1; // Switch turns.
                ttt.game.P2Move = false; // Used for the "Your move!" text in game.
                ttt.game.P1Move = true; // Used for the "Your move!" text in game.
                ttt.game.turnCounter++; // Increment turn counter.
                ttt.game.$save(); // Save Changes.
                ttt.gameWinner(ttt.game.grid[index].box);
            } else {
                return false;
            }
        }

        function gameWinner(item) {
            // If any of these win combinations are true then..
            if ((ttt.game.grid[0].box === item && ttt.game.grid[1].box === item && ttt.game.grid[2].box === item) ||
                (ttt.game.grid[3].box === item && ttt.game.grid[4].box === item && ttt.game.grid[5].box === item) ||
                (ttt.game.grid[6].box === item && ttt.game.grid[7].box === item && ttt.game.grid[8].box === item) ||
                (ttt.game.grid[0].box === item && ttt.game.grid[3].box === item && ttt.game.grid[6].box === item) ||
                (ttt.game.grid[1].box === item && ttt.game.grid[4].box === item && ttt.game.grid[7].box === item) ||
                (ttt.game.grid[2].box === item && ttt.game.grid[5].box === item && ttt.game.grid[8].box === item) ||
                (ttt.game.grid[0].box === item && ttt.game.grid[4].box === item && ttt.game.grid[8].box === item) ||
                (ttt.game.grid[2].box === item && ttt.game.grid[4].box === item && ttt.game.grid[6].box === item)) {

                    ttt.game.showWinner = "Player " + item + " is the WINNER!!!!"; // Assign winner message to this variable
                    ttt.game.gameOver = true; // Set the gameOver to true.
                    ttt.game.$save(); // Save Changes

            } else if (ttt.game.turnCounter == 9) { // If no one has won and all 9 turns have been taken then..

                    ttt.game.showCats = "Cat's game!!!"; // it's a tie game.
                    ttt.game.gameOver = true;
                    ttt.game.$save(); // Saving changes.

            }
        }

        function resetGame() {
                    // resetting all values.
                    ttt.game.turn = 1; 
                    ttt.game.turnCounter = 0;
                    ttt.game.showWinner = false;
                    ttt.game.showCats = false;
                    ttt.game.gameOver = false;

                    for (var i = 0; i < ttt.game.grid.length; i++) {
                        ttt.game.grid[i].box = "";
                        console.log(ttt.game.grid[i].box);
                    }
                    ttt.game.$save(); // saving changes.
        }
    
    }

})();



