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
		self.winCombos = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"], ["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "9"]];
		//
		self.setSquare = function ($index){
			self.board[$index].piece = self.turn;
			self.toggle();
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




