master
let grid = document.querySelector("body").appendChild(document.createElement("table")); // the table used for the grid
grid.id = "grid";
let miniMap = document.querySelector('body').appendChild(document.createElement('table')); // the table used for the player's ship view
miniMap.id = "mini-map";
let row = ""; // <tr> html element for table rows
let elem = ""; // grid cell
let start = true; // determines if the game has started or not
let mainMenu = ""; // varaible that represents the canvas for the menu background
let head = ""; // is used to initialize new elements in buildShip(n) before they are appended to the body

/*
	Takes: n => number of the largest ship
	Returns: NONE
	
	function takes in the number of the largest ship in the fleet, and creates a block representation of it. This is purely visual and provides no functionality.
*/
function buildShip(n) {
	for(let i=0;i<n;i++)
	{
    head = document.createElement('div');
    head.style = "position: absolute; left: 500px; top: " + (100+(20*i)) + "px; width: 20px; height: 20px; border-style: solid;";
    document.querySelector('body').appendChild(head);
	}
}

/*
	Takes: id(string) from selected unit
	Returns: the row and column of the id
	
 	function uses the string from the units id to parse the row # and column #
*/
function parseID(num) {
	return [num[0],num[1]];
}

/*	
	Function: init
	Takes: NONE
	Returns: a 10x10 table HTML element
	
	function uses the .appendChild method to add 10 rows and 10 units per row to the table.
	as the column elements are created, they are assigned a unique ID number "##" where the
	first # is the row number and the secnd # is the column number. an eventListener is also
	added to each column elements, that will detect 
*/
function init() {
	let ident = document.createElement('div');
	ident.id = "identifiers";
	document.querySelector("body").appendChild(ident);
	for(let i=0;i<10;i++)
	{	
		// creates identifiers for the rows
		ident = document.createElement('div');
		ident.style = "position: absolute; top: 60px; left: " + ((44*i)+505) + "px; font-size: 20px; text-alight: center; padding: 10px; width: 30px; height: 30px;";
		ident.innerText = i+1
		document.querySelector("#identifiers").appendChild(ident);
		// creates identifiers for the columns
		ident = document.createElement('div');
		ident.style = "position: absolute; top: " + ((44*i)+105) + "px; left: 460px; font-size: 20px; text-alight: center; padding: 10px; width: 30px; height: 30 px;";
		ident.innerText = String.fromCharCode(65+i);
		document.querySelector("#identifiers").appendChild(ident);
		// creates the row element for the table
		row = grid.appendChild(document.createElement("tr"));
		for(let j=0;j<10;j++)
		{
			elem = document.createElement("td");
			elem.className = "grid-element";
			elem.id = "" + i + j;
			elem.addEventListener("click", (() => {	
			if(start) {
				document.getElementById("check").innerText = i + " " + j;
				document.getElementById(i + "" + j).style = "background-color: red;"; /*hitCheck*/
				console.log(i + "" + j);
				} 
				else { 
				/* place player current ship */
				}
			}));
			row.appendChild(elem);
		}
	}
}


function initMiniMap() {
	let ident = document.createElement('div');
	ident.id = "identifiers-mini";
	document.querySelector("body").appendChild(ident);
	for(let i=0;i<10;i++)
	{	
		// creates identifiers for the rows
		ident = document.createElement('div');
		ident.style = "position: absolute; top: 70px; left: " + ((13*i)+973) + "px; font-size: 15px; text-alight: center; padding: 10px; width: 30px; height: 30px;";
		ident.innerText = i+1
		document.querySelector("#identifiers").appendChild(ident);
		// creates identifiers for the columns
		ident = document.createElement('div');
		ident.style = "position: absolute; top: " + ((14*i)+88) + "px; left: 955px; font-size: 13px; text-alight: center; padding: 10px; width: 30px; height: 30 px;";
		ident.innerText = String.fromCharCode(65+i);
		document.querySelector("#identifiers").appendChild(ident);
		// creates the row element for the table
		row = miniMap.appendChild(document.createElement("tr"));
		for(let j=0;j<10;j++)
		{
			elem = document.createElement("td");
			elem.className = "mini-map-elem";
			elem.id = "" + i + j;
			//elem.addEventListener("click", (() => {	
			//document.getElementById("check").innerText = i + " " + j;
			//document.getElementById(i + "" + j).style = "background-color: red;"; /*hitCheck*/
			//console.log(i + "" + j);
			row.appendChild(elem);
		}
	}
}
	
/*
	Function: reset event listener
	Takes: NONE
	Returns: NONE
	
	the EventListener on the button id="reset" waits for a click on the button, and then runs a handler
	function that resets the inner contents of the <table></table> to and empty string(""). It then calls
	the init() function to repopulate the grid
*/
document.querySelector("#reset").addEventListener("click", () => {
	grid.innerHTML = "";
	init();
	initMenu();
});

/*
	Takes: NONE
	Returns: NONE

	function initializes the menu screen. It creates a new menu elements and appends them onto the body/background.
	It also assignes them specific IDs so they will get styled by the css in index.html. After creation,
	the elements are formatted in case of a griz size change.
	
	Creates Elements: "main-menu", "title", "start-button"
*/
function initMenu() {
	let title = "";
	let startBtn = "";
	// main menu
	mainMenu = document.querySelector('body').appendChild(document.createElement('div'));
	mainMenu.id = "main-menu";
		// mainMenu formatting
	mainMenu.style.width = (grid.offsetWidth-2) + "";
	mainMenu.style.height = (grid.offsetHeight-2) + "";
	mainMenu.style.top = grid.offsetTop + "";
	mainMenu.style.left = grid.offsetLeft + "";
	// title text
	title = document.querySelector('#main-menu').appendChild(document.createElement('div'));
	title.id = "title";
	title.innerText = "BATTLESHIP";
		// title formatting
	title.style.top = ((mainMenu.offsetHeight / 2) - (title.offsetHeight)) + "";
	title.style.left = ((mainMenu.offsetWidth / 2) - (title.offsetWidth / 2)) + "";
	// start button
	startBtn = document.querySelector('#main-menu').appendChild(document.createElement('button'));
	startBtn.id = "start-button";
	startBtn.innerText = "Start!";
		//start button formatting
	startBtn.style.top = (title.offsetTop + 40) + "";
	startBtn.style.left = (title.offsetLeft + (title.offsetLeft/2)/2) + "";
	startBtn.addEventListener("click", () => { mainMenu.innerHTML = ""; selMenu();});
	
}

/*
	Takes: NONE
	Returns: NONE
	
	function initilaizes the selection menu and allows user to choose number of ships to play with. each selection
	element has en event listener that listens for a click, and then calls a set ship # function.
*/
function selMenu() {
	let title = document.querySelector('#main-menu').appendChild(document.createElement('div'));
	let startBtn = "";
	title.id = "title";
	title.innerText = "Choose Number of Ships";
		// title formatting
	title.style.top = ((mainMenu.offsetHeight / 3) - (title.offsetHeight)) + "";
	title.style.left = ((mainMenu.offsetWidth / 2) - (title.offsetWidth / 2)) + "";
	// button formatting
	/* 
		you have to save the number i for each button so the event handler can select the specific id with the querySelector. 
		if you don't assign a unique id, the eventListner only works for the last element created.
	*/
	for(let i=0;i<10 ;i++)
	{
		startBtn = document.querySelector('#main-menu').appendChild(document.createElement('div'));
		startBtn.id = "btn" + i;
		startBtn.style = "position: absolute; left: " + ((i*(grid.offsetWidth/6)+9)) + "px; top: " + (grid.offsetHeight/2) + "px; z-index: 1; width: 50px; height: 50px; border-style: solid; font-size: 50; text-align: center;";
		startBtn.innerText = "" + (i+1);
		startBtn.addEventListener("mouseover", () => { document.querySelector(("#btn" + i)).style.backgroundColor = "red"; }); 
		startBtn.addEventListener("mouseout", () => { document.querySelector(("#btn" + i)).style.backgroundColor = ""; });
		startBtn.addEventListener("click", () => { document.querySelector(("#btn" + i)).style.backgroundColor = "green"; /* setNumShips(i); */ mainMenu.innerHTML = ""; mainMenu.remove(); });
		mainMenu.appendChild(startBtn);
	}
}

init();
initMiniMap();
initMenu();









let player = function () {
	this.hm = new Array(10);
	this.ship = new Array(10);
	this.shipcount = 0;
	this.hitstowin = 0;
	this.hits = 0;
	this.incoming = function (col, row) {
		if (ship[row][col] == 'S') {
			ship[row][col] = 'X';
			return (true);
		}
		else {
			ship[row][col] = 'o';
			return (false);
		}
	};
	this.gameover= function(){
		return (hits == hitstowin);
	};
	this.setup = function (ships) {
		for (let i = 0; i < 10; i++) {
			hm[i] = new Array(10);
			ship[i] = new Array(10);
        }
		
		
		for (let i= 1; i < 10; i++) {
			hm[i][0] = i;
			ship[i][0] = i;
		}
		for (let i = 1; i < 10; i++) {
			for (let j = 1; j < 10; j++) {
				ship[i][j] = '-';
				hm[i][j] = '-';
			}
		}

		for (let i = 1; i <= shipcount; i++) {
			hitstowin += i;
		}
	};
	this.fire=function(other, row, col){
		let hit = false;

		if (other.incoming(col, row)) {

			hm[row][col] = 'X';
			hit = true;
			hits += 1;
		}
		else {
			hm[row][col] = 'o';
			hit = false;
		}

		return (hit);
	};
	this.setdown=function(length, col, row, vert){
		if (length == 1) {

			if (ship[row][col] == '-') {
				ship[row][col] = 'S';
			}


		}
		else {
			let checkifempty = 0;

			if (vert == 'V') {

				for (let i = 0; i < length; i++) {
					if (ship[row + i][col] != '-') {
						checkifempty += 1;

					}
				}

				if (checkifempty == 0) {
					for (let i = 0; i < length; i++) {
						ship[row + i][col] = 'S';
					}
				}

			}
			else {
				for (let i = 0; i < length; i++) {
					if (ship[row][col + i] != '-') {
						checkifempty += 1;

					}
				}

				if (checkifempty == 0) {
					for (let i = 0; i < length; i++) {
						ship[row][col + i] = 'S';
					}
				}
			}
		}
	};
}

=======
main_row = document.getElementById("main-row");

window.onload = function() {
	display.init();
	// TODO: initialize game object.
};

let display = {
	red_big_grid: document.getElementById("redBigGrid"),
	red_small_grid: document.getElementById("redSmallGrid"),
	blue_big_grid: document.getElementById("blueBigGrid"),
	blue_small_grid: document.getElementById("blueSmallGrid"),
	start_menu: document.getElementById("start-menu"),
	reset_btn: document.getElementById("reset"),
	start_btn: document.getElementById("start"),
	ship_selectors: document.getElementsByClassName("ship-sel"),

	gameStart: true, // determines if the game has started or not
	mainMenu: "", // varaible that represents the canvas for the menu background

	init: function() {
		this.reset();
		this.setEventListeners();

		// Initialize grids.
		this.initGrid(this.blue_big_grid);
		this.initGrid(this.blue_small_grid);
		this.initGrid(this.red_big_grid);
		this.initGrid(this.red_small_grid);
	},

	/*
	Sets event listeners for the elements existing when the page is loaded, e.i. not the grids.
	 */
	setEventListeners: function() {
		this.start_btn.addEventListener("click", () => {
			for(let i=0; i < this.ship_selectors.length; i++)
			{
				if(this.ship_selectors[i].classList.contains("selected"))
					game.shipNum = i+1;
			}
			if(game.shipNum != 0)
			{
				this.hideStartBtn();
				this.showResetBtn();
				this.hideStartMenu();
				this.showBlueBigGrid();
				this.showBlueSmallGrid();
			}
			else
			{
				console.log("please select a ship"); //display this in a text box in display
			}
			

		});

		this.reset_btn.addEventListener("click", () => {
			this.reset();
		});

		// Mouseover, mouseout, and selection for ship selection buttons.
		for(let i=0; i < this.ship_selectors.length; i++) {
			this.ship_selectors[i].addEventListener("mouseover", () => {
				this.ship_selectors[i].classList.add("hover")
			});
			this.ship_selectors[i].addEventListener("mouseout", () => {
				this.ship_selectors[i].classList.remove("hover")
			});
			this.ship_selectors[i].addEventListener("click", () => {
				// First deselect if any other box was selected.
				for(let j=0; j < this.ship_selectors.length; j++) {
					if(j !== i) {
						this.ship_selectors[j].classList.remove("selected");
					}
				}

				// Now select or deselect depending on state.
				if(this.ship_selectors[i].classList.contains("selected")) {
					this.ship_selectors[i].classList.remove("selected");
				} else {
					this.ship_selectors[i].classList.add("selected");
				}
			});
		}
	},

	/*
	Sets event listeners on a given box.
	 */
	setBoxEventListeners: function(grid_box_ref) {
		grid_box_ref.addEventListener("mouseover", () => {
			grid_box_ref.classList.add("hover");
		});

		grid_box_ref.addEventListener("mouseout", () => {
			grid_box_ref.classList.remove("hover");
		});

		return grid_box_ref;
	},

	hideResetBtn: function() {
		this.reset_btn.style.display = "none";
	},

	showResetBtn: function() {
		this.reset_btn.style.display = "block";
	},

	hideStartBtn: function() {
		this.start_btn.style.display = "none";
	},

	showStartBtn: function() {
		this.start_btn.style.display = "block";
	},

	hideStartMenu: function() {
		this.start_menu.style.display = "none";
	},

	showStartMenu: function() {
		this.start_menu.style.display = "block";
	},

	hideRedBigGrid: function() {
		this.red_big_grid.style.display = "none";
	},

	showRedBigGrid: function() {
		this.red_big_grid.style.display = "table";
	},

	showRedSmallGrid: function() {
		this.red_small_grid.style.display = "table";
	},

	hideRedSmallGrid: function () {
		this.red_small_grid.style.display = "none";
	},

	hideBlueBigGrid: function() {
		this.blue_big_grid.style.display = "none";
	},

	showBlueBigGrid: function() {
		this.blue_big_grid.style.display = "table";
	},

	hideBlueSmallGrid: function() {
		this.blue_small_grid.style.display = "none";
	},

	showBlueSmallGrid: function() {
		this.blue_small_grid.style.display = "table";
	},

	hideAll: function() {
		this.hideStartMenu();
		this.hideBlueBigGrid();
		this.hideRedBigGrid();
		this.hideBlueSmallGrid();
		this.hideRedSmallGrid();
		this.hideStartBtn();
		this.hideResetBtn();
	},

	reset: function() {
		this.hideAll();
		this.showStartMenu();
		this.showStartBtn();
	},

	/*
	Initializes a grid given a node of a table element. Only called once per table, unless you want to
	reset it.
	 */
	initGrid: function(table_ref) {
		let headrow = document.createElement('tr');
		let box = document.createElement("th"); // adds an extra th element to offset the column labels
		box.classList.add("grid-box");
		box.classList.add("head");
		headrow.appendChild(box);
		for(let i=0; i < 10; i++) {
			box = document.createElement("th");
			box.classList.add("grid-box");
			box.classList.add("head");
			box.innerText = String.fromCharCode(65+i); // labels the columns
			headrow.appendChild(box);
		}
		table_ref.appendChild(headrow);

		for(let i=0; i < 10; i++) {
			let row = document.createElement('tr');
			row.classList.add("grid-row");
			let tempBox = document.createElement('td'); // creates an extra td element on the front of each row to hold the row label
			tempBox.classList.add("grid-box");
			tempBox.classList.add("head");
			tempBox.style.borderStyle = "none";
			tempBox.innerText = i + "";
			row.appendChild(tempBox);
			for(let j=0; j < 10; j++) {
				let box = document.createElement('td');
				box.classList.add("grid-box");
				box = this.setBoxEventListeners(box);

				row.appendChild(box);
			}
			table_ref.appendChild(row);
		}
	},

	/*
		Takes: n => number of the largest ship
		Returns: NONE
	
		function takes in the number of the largest ship in the fleet, and creates a block representation of it. This is purely visual and provides no functionality.
	*/
	drawShip: function(n) {
		let head = "";
		for(let i=0;i<n;i++)
		{
			head = document.createElement('div');
			head.style = "position: absolute; left: 100px; top: " + (100+(20*i)) + "px; width: 20px; height: 20px; border-style: solid;";
			document.querySelector('body').appendChild(head);
		}
	}
};

// display.drawGrid();
// display.drawMainMenu();
// display.drawMiniMap();

/*
	Takes: id(string) from selected unit
	Returns: the row and column of the id
	
 	function uses the string from the units id to parse the row # and column #
*/
function parseID(num) {
	return [num[0],num[1]];
}

let player = function () {
	this.hm = new Array(11);
	this.ship = new Array(11);
	this.shipcount = 0;
	this.hitstowin = 0;
	this.hits = 0;
	this.incoming = function (col, row) {
		if (ship[row][col] === 'S') {
			ship[row][col] = 'X';
			return (true);
		}
		else {
			ship[row][col] = 'o';
			return (false);
		}
	};
	this.gameover= function(){
		return (hits === hitstowin);
	};
	this.setup = function (ships) {
		for (let i = 0; i < 11; i++) {
			hm[i] = new Array(11);
			ship[i] = new Array(11);
        }
		hm[0][0] = ' ';
		ship[0][0] = ' ';
		ship[0][1] = 'A';
		ship[0][2] = 'B';
		ship[0][3] = 'C';
		ship[0][4] = 'D';
		ship[0][5] = 'E';
		ship[0][6] = 'F';
		ship[0][7] = 'G';
		ship[0][8] = 'H';
		ship[0][9] = 'I';
		ship[0][10] = 'J';
		hm[0][1] = 'A';
		hm[0][2] = 'B';
		hm[0][3] = 'C';
		hm[0][4] = 'D';
		hm[0][5] = 'E';
		hm[0][6] = 'F';
		hm[0][7] = 'G';
		hm[0][8] = 'H';
		hm[0][9] = 'I';
		hm[0][10] = 'J';

		for (let i = 1; i < 10; i++) {
			hm[i][0] = i;
			ship[i][0] = i;
		}
		for (let i = 1; i < 11; i++) {
			for (let j = 1; j < 11; j++) {
				ship[i][j] = '-';
				hm[i][j] = '-';
			}
		}

		for (let i = 1; i <= shipcount; i++) {
			hitstowin += i;
		}
	};
	this.fire=function(other, row, col){
		let hit = false;

		if (other.incoming(col, row)) {

			hm[row][col] = 'X';
			hit = true;
			hits += 1;
		}
		else {
			hm[row][col] = 'o';
			hit = false;
		}

		return (hit);
	};
	this.setdown=function(length, col, row, vert){
		if (length === 1) {

			if (ship[row][col] === '-') {
				ship[row][col] = 'S';
			}


		}
		else {
			let checkifempty = 0;

			if (vert === 'V') {

				for (let i = 0; i < length; i++) {
					if (ship[row + i][col] !== '-') {
						checkifempty += 1;

					}
				}

				if (checkifempty === 0) {
					for (let i = 0; i < length; i++) {
						ship[row + i][col] = 'S';
					}
				}

			}
			else {
				for (let i = 0; i < length; i++) {
					if (ship[row][col + i] !== '-') {
						checkifempty += 1;

					}
				}

				if (checkifempty === 0) {
					for (let i = 0; i < length; i++) {
						ship[row][col + i] = 'S';
					}
				}
			}
		}
	};
}

let play = function(){
	this.gamestart=function(){
		var p1;
		var p2;
		player ();
		alert("Let the battle commence");
		midgame();
	}

	this.midgame=function(){
		do{
			p1.fire(p2, row, col);
			if (one.gameover() == false){
				p2.fire(p1, row, col);
				if (p2.gameover() == true){
					return p2.gameover()==true;
				}
			}

		}while (!(p1.gameover()) && !(p2.gameover()));
		endgame();
	}

	this.endgame=function(){
		alert("GAME OVER");
		if (p1.gameover() == true){
			alert("Player 1 WINS!!!!!!!!");
		}else{
			alert("Player 2 WINS!!!!!!!!");
		}
	}
}

let game = {
	shipNum: 0,
	placeShips: function(p1,p2) {
	}
}
	
 master
