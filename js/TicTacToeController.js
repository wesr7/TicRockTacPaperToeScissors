(function(){

angular
	.module("TicApp").controller("TicTacToeController", TicTacToeController);

	function TicTacToeController(){

 		var self=this;
 		//this is my gameboard
 		self.board = [
 		{
 			box: "1",
 			piece: null
 		}, {
 			box: "2",
 			piece: null
 		}, {
 			box: "3",
 			piece: null
 		}, {
 			box: "4",
 			piece: null
 		}, {
 			box: "5",
 			piece: null
 		}, {
 			box: "6",
 			piece: null
 		}, {
 			box: "7",
 			piece: null
 		}, {
 			box: "8",
 			piece: null
 		}, {
 			box: "9",
 			piece: null
 		}];

 		//two players
		self.turn = 0;
		self.isDisabled = false;
		self.winCombos = [["1", "2", "3"], []]
		//
		self.setSquare = function ($index){
			self.board[$index].piece = self.turn;
			self.toggle();
			console.log(self.board[$index]);
			};
		self.toggle = function () {
			if(self.turn===0) {
				self.turn++ ;
			} else if (self.turn===1) {
				self.turn--;
			}

		};
	}



})();




