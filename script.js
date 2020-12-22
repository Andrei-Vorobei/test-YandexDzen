// Если надо, чтоб M и N задавал пользователь, можно применить prompt.
// const M = +prompt('Введите значение "M"');
// const N = +prompt('Введите значение "N"');

const M = 10;
const N = 10;
let timerId;

const createBoard = async (M, N, source) => {
	try {
		let board;
	
		if (source) { // Если задана матрица source, как аргумент, то доска примет ее значение.
			const getFile = async (src) => {
				const res = await fetch(src);
	
				if (!res.ok) {
					throw new Error(`Could not fetch ${src}, status: ${res.status}`);
				}
	
				const json = await res.json();

				return json;
			};
	
			await getFile(source).then((res) => board = res);
	
			console.log(board);
		} else {
			board = new Array(M).fill().map(() => new Array(N).fill('')); // Создаем матрицу.
			board = board.map(row => row.map(() => Math.round(Math.random()))); // Перебираем матрицу и заполняем случайно 1 или 0.
			
			console.log(board);
		}
	
		function startLife() {
			board = board.map((row, i, arr) => row.map((col, j) => { // Перебираем матрицу и считаем живых соседей.
				let aliveNeighbors = 0;
	
				const startRow = i - 1; // Задаем границы поиска живых соседей.
				const endRow = i + 1;
				const startCol = j - 1;
				const endCol = j + 1;
	
				if (col === 0) { // Проверяем на жизнь перебираемую клетку.
					for (let x = startRow; x <= endRow; x++) {
						for (let y = startCol; y <= endCol; y++) {
							if (x === i && y === j || x < 0 || y < 0 || x >= M || y >= N) { // Проверяем, чтоб границы поиска соседей не выходили за границы доски.
								continue;
							}
	
							aliveNeighbors += arr[x][y]
						}
					}
	
					if (aliveNeighbors === 3) {
						return 1;
					} else {
						return 0;
					}
				} else {
					for (let x = startRow; x <= endRow; x++) {
						for (let y = startCol; y <= endCol; y++) {
							if (x === i && y === j || x < 0 || y < 0 || x >= M || y >= N) {
								continue;
							}
	
							aliveNeighbors += arr[x][y]
						}
					}
	
					if (aliveNeighbors < 2 || aliveNeighbors > 3) {
						return 0;
					} else {
						return 1;
					}
				}
			}));
		
			console.log(board);
		};
	
		timerId = setInterval(startLife, 1000);
	} catch (err) {
		console.error(err);
	}
};

const start = src => createBoard(M, N, src); // Старт программы

const stop = () => clearInterval(timerId); // Стоп
