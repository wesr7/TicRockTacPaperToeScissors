(function(){

	angular
	.module("TicApp")
	.controller("TicTacToeController", TicTacToeController);

	TicTacToeController.$inject = ['$firebaseArray', '$firebaseObject'];

	function TicTacToeController ($firebaseArray, $firebaseObject) {

		var self = this;
                        self.turn = 1;
                        self.turnCounter = 0;
                        self.player1 = player1;
                        self.player2 = player2;
                        self.game = tttGame();
                        self.getMove = getMove;
                        self.gameWinner = gameWinner;
		self.resetGame = resetGame;
 		self.grid = [
 		{box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}, {box: ""}];
                          console.log(self.grid);

            function tttGame() {

                        var ref = new Firebase("https://westttapp.firebaseio.com/");
                        var game = $firebaseObject(ref);
                        return game;
                        }
                        self.game.$save();

            function player1() {

                        self.game.player1 = player1;
                        self.game.$save();
            }
            function player2() {

                        self.game.player2 = player2;
                        self.game.$save();
            }

            function getMove (index) {
                self.turnCounter++;

                        if (self.grid[index].box){
                                    return false;
                        } if (self.turn===1){
                        self.grid[index].box = "X";
                                    self.turn++;
                        self.game.$save();
                        } else {
                        self.grid[index].box = "O";
                                    self.turn--;
                        self.game.$save();
                        }
                        gameWinner(self.grid[index].box);
                        self.game.$save();
            }

            function gameWinner(item) {
                        console.log(item);

                        if((self.grid[0].box === item && self.grid[1].box === item && self.grid[2].box === item) ||

                            (self.grid[3].box === item && self.grid[4].box === item && self.grid[5].box === item) ||

                            (self.grid[6].box === item && self.grid[7].box === item && self.grid[8].box === item) ||

                            (self.grid[0].box === item && self.grid[3].box === item && self.grid[6].box === item) ||

                            (self.grid[1].box === item && self.grid[4].box === item && self.grid[7].box === item) ||

                            (self.grid[2].box === item && self.grid[5].box === item && self.grid[8].box === item) ||

                            (self.grid[0].box === item && self.grid[4].box === item && self.grid[8].box === item) ||

                            (self.grid[2].box === item && self.grid[4].box === item && self.grid[6].box === item)
                            ){
                                self.showWinner = item + " is the WINNER!!!!";
                                console.log(item + " win");
                            }
                                else {
                            if(
                                self.turnCounter === 9
                                )
                            self.showCats = "CATS GAME!!!";

                            }
                        }


            function resetGame() {
                        self.turn = 1;
                        self.turnCounter = 9;
                        self.showWinner = "";
                        self.showCats = "";

                        for (var i = 0; i < self.grid.length; i++) {
                            self.grid[i].box = "";
                            console.log(self.grid[i].box);
                        }
            }
	}
})();






