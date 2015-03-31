(function(){

angular
	.module("TicApp").controller("TicTacToeController", TicTacToeController);

	function TicTacToeController(){

 		var self=this;
 		//this is my gameboard
 		self.board = [
 		{
 			name: "square1",
 			piece: null
 		}, {
 			name: "square2",
 			piece: null
 		}, {
 			name: "square3",
 			piece: null
 		}, {
 			name: "square4",
 			piece: null
 		}, {
 			name: "square5",
 			piece: null
 		}, {
 			name: "square6",
 			piece: null
 		}, {
 			name: "square7",
 			piece: null
 		}, {
 			name: "square8",
 			piece: null
 		}, {
 			name: "square9",
 			piece: null
 		}];

 		//two players
		self.turn = 0;
		self.player2 = '0';
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

		

					
	