
let winX = 0;
let winO = 0;
let i = 0; 

let isBlock = false;

let cells = document.querySelectorAll('.field td');

let counterX = document.querySelector('.counter-wins__x');
let counterO = document.querySelector('.counter-wins__o');
let button = document.querySelector('.btn');
let winnerText = document.querySelector('.winner');

//Задание начальных значений
counterX.innerHTML = "0"
counterO.innerHTML = "0"

button.addEventListener('click', () => {
	restartGame(cells)
})

//Начало игры
startGame(cells);

let isWin = (cells) => {
	let combos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let comb of combos) {
		if (
			cells[comb[0]].innerHTML == cells[comb[1]].innerHTML &&
			cells[comb[1]].innerHTML == cells[comb[2]].innerHTML &&
			cells[comb[0]].innerHTML != ''
		) {
			return true;
		}
	}
	
	return false;
}

function eventListener() {
	if (isBlock) {
		return;
	}

	if (this.innerHTML != '') {
		return
	}

	this.innerHTML = ['X', 'O'][i % 2];
	//Проверка победителя
	if (isWin(cells)) {
		alert(`Победил, ${this.innerHTML}`, this.innerHTML); 
		if (this.innerHTML == 'X') {
			winX += 1;
			counterX.innerHTML = winX;
		} else {
			winO += 1;
			counterO.innerHTML = winO;
		}
		isBlock = true;
	} else if (i == 8) {
		isBlock = true;
		alert("Ничья"); 
	}

	i++;
}

//Функция старта игры
function startGame(cells) {
	for (let cell of cells) {
		cell.addEventListener('click', eventListener, {once : false});
	}
}

//Функция рестарта игры
function restartGame(cells) {
	for (let cell of cells) {
		cell.innerHTML = '';
		cell.removeEventListener('click', eventListener);
	}
	isBlock = false;
	i = 0;
	startGame(cells)
}
