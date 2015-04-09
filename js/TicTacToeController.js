(function(){

	angular
	.module("TicApp")
	.controller("TicTacToeController", TicTacToeController);

	TicTacToeController.$inject = ['$firebaseArray', '$firebaseObject'];

	function TicTacToeController ($firebaseArray, $firebaseObject) {

                // Capture Variable
                self = this;

                // Firebase Reference
                var ref = new Firebase("https://westttapp.firebaseio.com/");
                self.game = $firebaseObject(ref);

                // Properties
                self.game.turn = 1;
                self.game.turnCounter = 0;
                self.game.grid = [
                {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}];

                // self.player1 = "";
                // self.player2 = "";
                      self.getMove = getMove;
                      self.gameWinner = gameWinner;
                self.resetGame = resetGame;
                self.assignPlayer = assignPlayer();
                self.playerID = "";
                self.game.Slot1 = "false";
                self.game.Slot2 = "false";
                self.game.$save();

                // Firebase Slot for Player 1 and Player 2 - true - true
                // function to determine if slot 1 is full, assign next player that opens browser to slot 2

                function assignPlayer() {
                    if (!self.game.Slot1) {
                        self.playerID = 1;
                        self.game.Slot1 = true;
                        self.game.$save();
                    } else if (self.game.Slot1) {
                        self.playerID = 2;
                        self.game.Slot2 = true;
                        self.game.$save();
                    } else if (self.game.Slot1 && self.game.Slot2) {
                        alert("Game is occupied.");
                    }
                }

            // function player1() {

            //             self.player1 = "";

            // }
            // function player2() {

            //             self.player2 = "";

            // }

            function getMove (index) {
                self.game.turnCounter++;

                        if (self.game.grid[index].box){
                                    return false;
                        } if (self.game.turn===1 && !self.game.gameOver && self.playerID === 1){
                        self.game.grid[index].box = "X";
                                    self.game.turn++;
                        self.game.$save();
                        } else if (self.game.turn ===2 && !self.game.gameOver && self.playerID ===2) {
                        self.game.grid[index].box = "O";
                                    self.game.turn--;
                        self.game.$save();
                        }
                        gameWinner(self.game.grid[index].box);
                        self.game.$save();
            }

            function gameWinner(item) {
                        console.log(item);

                        if((self.game.grid[0].box === item && self.game.grid[1].box === item && self.game.grid[2].box === item) ||

                            (self.game.grid[3].box === item && self.game.grid[4].box === item && self.game.grid[5].box === item) ||

                            (self.game.grid[6].box === item && self.game.grid[7].box === item && self.game.grid[8].box === item) ||

                            (self.game.grid[0].box === item && self.game.grid[3].box === item && self.game.grid[6].box === item) ||

                            (self.game.grid[1].box === item && self.game.grid[4].box === item && self.game.grid[7].box === item) ||

                            (self.game.grid[2].box === item && self.game.grid[5].box === item && self.game.grid[8].box === item) ||

                            (self.game.grid[0].box === item && self.game.grid[4].box === item && self.game.grid[8].box === item) ||

                            (self.game.grid[2].box === item && self.game.grid[4].box === item && self.game.grid[6].box === item)
                            ){
                                self.game.showWinner = item + " is the WINNER!!!!";
                                self.game.gameOver = true;
                                self.game.$save();
                            }
                                else {
                            if(
                                self.game.turnCounter === 9
                                )
                            self.game.showCats = "CATS GAME!!!";
                            self.game.$save();
                            }
                        }


            function resetGame() {
                        self.game.turn = 1;
                        self.game.turnCounter = 0;
                        self.game.showWinner = "";
                        self.game.showCats = "";
                        self.game.gameOver = false;

                        for (var i = 0; i < self.game.grid.length; i++) {
                            self.game.grid[i].box = "";
                            console.log(self.game.grid[i].box);
                        }
                        self.game.$save();
            }
}
})();






