/* BISWAJIT SARKAR */

// TODO document this
var board = document.getElementsByTagName("td");

// assuming we index the 9 tic tac toe cells from left to right, top to
// bottom, as 0-8, these would be all of the winning combinations:
var winSets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

// X always gets to go first
var player = "X";

// keep track of how many cells are empty at any time
var empty = 9;

// keep track of game status - false if still playing
var gameOver = false;

// keep track of the winners
var winnerX = 0, winnerO = 0;

//create place for displaying winners
let winners = document.createElement("div");
winners.innerHTML = "<p>X won <span id='Xcount'></span> games!</p><p>O won <span id='Ocount'></span> games!</p>"
document.getElementById("message").insertBefore(winners, document.getElementById("winner").nextSibling);

// set center aligment for all elements in the table.
document.getElementsByTagName("TABLE")[0].style = "text-align:center";

// clear the text of all the cell.
for ( i = 0; i < board.length; i++) {
	board[i].innerHTML = "";
}

/* Function resetGame() is called when user clicks on the "game reset" button
 1. sets content of all 9 cells to nothing
 2. sets the starting player (this version, X always starts the game)
 3. updates the message to the current player
 4. resets the number of empty cells to 9
 5. sets the game over flag to false to indicate that the game is in progress
 */
function resetGame() {

    // Set the content of all 9 cells to nothing
    for ( i = 0; i < board.length; i++) {
        board[i].innerHTML = "";
    }
  
    // TODO reset player back to X and update it on the page
    player = "X";
	
    document.getElementById("player").innerHTML = player;

    // TODO reset gameOver and # of empty cells
	empty = 9;
	
	gameOver = false;

	// remove the existing highlighted cell
	removeHighlight();
	
	// remove winner cells highlight 
	document.querySelectorAll(".winner").forEach((win, index, array)=>{
		win.classList.remove("winner");
	});
}

/* Function cellClicked() is called
 when the event listeners for the "td" cells fire which occurs
 when the user clicks on one of the nine cells of the board
 1. decreases # of empty cells by 1
 2. sets the content of the clicked cell to the current player's mark
 3. checks whether or not there is a winner
 4. flips (changes) the current player
 5. updates the message to the current player
 */
function cellClicked(cell) {

    //TODO: 1-5 should occur only when the selected cell is empty and the game is 
    // still in progress!
	if(cell.innerHTML != ""){
		alert("You have to click an empty cell!");
		return;
	}
	if(gameOver == "game is now over"){
		alert("The game is now over!\nPlease click the Reset Game to start a new game.");
		return;
	}

	// remove the existing highlighted cell
	removeHighlight();

	// highlight the clicked cell
	cell.classList.add("clicked");

    // TODO: decrease # of empty cells by 1
	empty --;
	
    // TODO: document this code from class
    cell.innerHTML = player;
    checkWin();    
    player = (player === "X") ? "O" : "X";
    document.getElementById("player").innerHTML = player;
}

/* Function checkWin() is called to check all winning combinations and display results
 */
function checkWin() {

    // checks whether any condition matches with winSets
    for ( i = 0; i < winSets.length; i++) {
        if (board[winSets[i][0]].innerHTML == board[winSets[i][1]].innerHTML 
            && board[winSets[i][1]].innerHTML == board[winSets[i][2]].innerHTML 
            && board[winSets[i][0]].innerHTML != "") {
                
			gameOver = "game is now over";
			
			if(player == "X"){
				winnerX ++;
			}else{
				winnerO ++;
			}
			
			document.getElementById("Xcount").innerText = winnerX;
			document.getElementById("Ocount").innerText = winnerO;
			
            document.getElementById("winner").innerHTML = player+" Wins!";
			
			//highlight the winning cells
			for(j = 0; j < 3; j++){
				board[winSets[i][j]].classList.add("winner");
			}
			
			displayWin(true);
			
			return;

            // TODO: replace console.log("We have a winner!") with:
            //  - set gameOver variable: game is now over  
            //  - display "X Wins!" or "O Wins!" in the winner H3
            //  - call displayWin(true) function
            //  - break out of this loop: no point in continuing
        }
    }

	if(empty == 0){
		gameOver = "game is now over";
		
		document.getElementById("winner").innerHTML = "No one wins! :(";
		
		displayWin(true);
	}
	
    // TODO: if there are no empty cells left and game is not yet over,
    //       it means that there is no winner for this game
    // - set gameOver variable: game is now over  
    // - display "No one wins! :(" in the winner H3
    // - call displayWin(true) function
    
}

function removeHighlight(){
	document.querySelectorAll(".clicked").forEach((cell, index, array)=>{
		cell.classList.remove("clicked");
	});
}

/* Enhancements you can try:
- highlight (change background colour) of the cell that was just clicked to indicate that it was the last move; make sure it goes back to the regular background when the next user clicks
- make the starting player random
- keep track of statistics (how many times each player wins)
- hide the "Player X Go!" on startup; show it only while game is playing
- when a winner is determined, the player information still swaps: would be nice if it didn't (I would
automatically hide those things before the game starts and when it ends (Week 3))
- change the font colour of the winning combination (don't forget to change it back when the game is reset)
*/

// ==========================================================================
// DON'T TOUCH THESE LINES OF CODE  (we'll learn this stuff in a later lesson)
document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("message").addEventListener("click", function() {
    displayWin(false);
});
for ( i = 0; i < board.length; i++) {
    document.getElementsByTagName("td")[i].addEventListener("click", function() {
        cellClicked(this);
    });
}
// displays the results window with the winner inside it: the method will
// either show the results or hide them (displayWin(true) shows and 
// displayWin(false) hides)
function displayWin(show) {
    if (show) {
        document.getElementById("message").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("message").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }
}

// ===============================================================