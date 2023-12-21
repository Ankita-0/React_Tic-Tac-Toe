import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let board = [...INITIAL_GAME_BOARD.map(row => [...row])];
  for (const turns of gameTurns){
    const {square, player} = turns;
    const {row, col} = square;
    board[row][col] = player;
  }
  return board;
}

function App() {
const [players, setPlayers] = useState(PLAYERS);
const [gameTurns, setGameTurns] = useState([]);
const activePlayer = deriveActivePlayer(gameTurns);
const board = deriveGameBoard(gameTurns);

function handleSquareSelect(rowIndex, colIndex) {
  setGameTurns((prevTurns) => {
    const currentPlayer = deriveActivePlayer(prevTurns);

    const updatedTurns = [
      { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...prevTurns,
    ];

    return updatedTurns;
  });
}
  function handleNameChange(symbol, newName){
    setPlayers(prevPlayer=>{
      return {
        ...prevPlayer,
        [symbol]: newName,
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer==='X'} initialName={PLAYERS.X} symbol='X' onNameChange={handleNameChange} />
          <Player isActive={activePlayer==='O'} initialName={PLAYERS.O} symbol='O' onNameChange={handleNameChange}/>
        </ol>
        <GameBoard onSelectSquare={handleSquareSelect} gameBoard={board}/>
      </div></main>
  )
}

export default App