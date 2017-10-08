

var cardsInPlay = [];
var players = [];
var turns = -1;
var playerTurnIndex =[];


function player(id,score,turn){
	this.id = id;
	this.score = score;
	this.turn = turn;
}


var cards = [{
	rank:"queen",
	suit:"hearts",
	cardImage:"images/queen-of-hearts.png"},
	{
	rank:"queen",
	suit:"diamonds",
	cardImage:"images/queen-of-diamonds.png"},
	{
	rank:"king",
	suit:"hearts",
	cardImage:"images/king-of-hearts.png"},
	{
	rank:"king",
	suit:"diamonds",
	cardImage:"images/king-of-diamonds.png"},
];


var checkForMatch = function(player){
	var playerRow = document.getElementById('player-'+player.id);
	if(cardsInPlay[0]===cardsInPlay[1]){
		alert("Good job!")
		player.score += 1;
		playerRow.childNodes[1].innerText = player.score;
	}
	else{
		alert("Sorry try again!");
	}
	player.turn += 1;
	playerRow.childNodes[2].innerText = player.turn -1;
	playerRow.classList.remove('current-player');
	resetTurn();

	if(turns === playerTurnIndex.length -1){
		findWinner();
		resetAll();
	}

	if(playerRow.nextSibling){
		playerRow.nextSibling.classList.add('current-player');
	}
	else{	
		playerRow.parentNode.childNodes[1].classList.add('current-player');
	}
}

var findWinner = function(){
	var maxScore;
	var scores = [];
	var winners = [];


	for(i=0;i<players.length;i++){		
		scores.push(players[i].score);
		}

	maxScore = scores.reduce(function(a,b){
		return Math.max(a,b);
	});

	var sumScore = scores.reduce(function(a,b){
		return a + b;
	});


	for(i=0;i<players.length;i++){	
		if (players[i].score === maxScore){
			winners.push(players[i]);
		}
	}

	if(sumScore==0){
		alert("Looks like it's a total loss!");
	}
	else if(winners.length === 1){
		alert("Player " + winners[0].id + " wins the game!");
	}
	else{
		alert("It's a tie!");
	}
}



var resetAll = function(){
	cardsInPlay = [];
	clearBoard();
	createBoard();
	createPlayers();
	createTurns();
}


var resetTurn = function(){
cardsInPlay = [];
clearBoard();
createBoard();
}


var clearBoard = function(){
var gameboard = document.getElementById('gameboard');
while (gameboard.hasChildNodes()){
		gameboard.removeChild(gameboard.lastChild)
	};
}




var flipCard = function(){
	var cardId = this.getAttribute('data-id');
	cardsInPlay.push(cards[cardId].rank);
	this.setAttribute('src',cards[cardId].cardImage);
	if (cardsInPlay.length === 2){
	checkForMatch(checkTurn());
	};
}


var checkTurn = function(){
	turns += 1;
	return players[playerTurnIndex[(turns)]];
}




//Creation
var createBoard = function(){
	for(i=0;i<=cards.length -1;i++){		
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src','images/back.png');
		cardElement.setAttribute('data-id',i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('gameboard').appendChild(cardElement);
	}
}

var createPlayers = function(){
	players = [];
	var numPlayers = document.getElementById('players').value;
	var playerTable = document.getElementById('player-table');
	playerTable.innerHTML = "<tr><th>Player</th><th>Current Score</th><th>Turn</th></tr>"

	for(i=1;i<=numPlayers;i++){
		var newPlayer = new player();
		newPlayer.id = i;
		newPlayer.score = 0;
		newPlayer.turn = 1;
		players.push(newPlayer);


		//Player-Table Setup
		var tr = document.createElement('tr');
		tr.setAttribute('id', 'player-'+i)
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var txt1 = document.createTextNode("Player " + i)
		var txt2 = document.createTextNode(0);
		var txt3 = document.createTextNode(0);


		td1.appendChild(txt1);
		td2.appendChild(txt2);
		td3.appendChild(txt3);

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		playerTable.appendChild(tr);
	}

	document.getElementById('player-1').className = 'current-player';
}



var createTurns = function(){
	turns = -1;
	playerTurnIndex = [];
	var x = 0;
	while(x<3){
		for(i=0;i< players.length;i++){
			playerTurnIndex.push(i)
		}
	x +=1;
	}
}





createTurns();
resetAll();


