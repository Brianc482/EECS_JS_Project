var boardSize = 3;
var empty = "&nbsp;";
var boxes = [];
var currentTurn = "X";
var score = 0;
var moves = 0;

function run(){
	var board = document.createElement('table');
	board.setAttribute("border", 1);
	board.setAttribute("cellspacing", 0);
	var identifier = 1;
	for(var i = 0; i < boardSize; i++){
		var row = document.createElement('tr');
		board.appendChild(row);
		for (var j = 0; j < boardSize; j++) {
			var cell = document.createElement('td');
			cell.setAttribute('height', 150);
			cell.setAttribute('width', 150);
			cell.setAttribute('align', 'center');
			cell.setAttribute('valign', 'center');
			cell.classList.add('col' + j,'row' + i);
			if (i == j) {
				cell.classList.add('diagonal0');
			}
			if (j == boardSize - i - 1) {
				cell.classList.add('diagonal1');
			}
			cell.identifier = identifier;
			cell.addEventListener("click", setBoard);
			row.appendChild(cell);
			boxes.push(cell);
			identifier += identifier;
		}
	}
	document.getElementById("tictactoe").appendChild(board);
	startNewGame();
}

function startNewGame(){
	score = {"X": 0, "O": 0};
	moves = 0;
	currentTurn = "X";
	boxes.forEach(function(square){square.innerHTML = empty;});
}

function hasWon(clicked){
	var memberOf = clicked.className.split(/\s+/);
	for (var i = 0; i < memberOf.length; i++) {
		var testClass = '.' + memberOf[i];
		var items = contains('#tictactoe ' + testClass, currentTurn);
		if (items.length == boardSize) {
			return true;
		}
	}
	return false;
}

function contains(selector, text){
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element){
    return RegExp(text).test(element.textContent);
  });
}

function setBoard(){
	if (this.innerHTML !== empty){
		return;
	}
	else{
		this.innerHTML = currentTurn;
		moves = moves + 1;
		score[currentTurn] += this.identifier;
	}	
	
	if(hasWon(this)){
		if(currentTurn == "X"){
			this.innerHTML = currentTurn;
			alert('Player ' + 1 + ' has set the last \'X\' and won the game! Rock Chalk Jayhawk!');
		}
		else{
			this.innerHTML = currentTurn;
			alert('Player ' + 2 + ' has set the last \'O\' and won the game! Rock Chalk Jayhawk!');

		}
		startNewGame();
	}
	else if(moves == 9) {
		alert("The game is a draw!");
		startNewGame();
	}
	else{
		currentTurn = currentTurn === "X" ? "O" : "X";
		if(currentTurn == "X"){
			document.getElementById('currentTurn').textContent = 'Current turn: Player ' + 1 + ' is X\'s';
		}
		else{
			document.getElementById('currentTurn').textContent = 'Current turn: Player ' + 2 + ' is O\'s';		
		}
	}
}
run();
