import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";
import Log from "./Components/log";
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
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

function deriveGameBoard(gameTurns) {
  let board = [...INITIAL_GAME_BOARD.map(row => [...row])];
  for (const turns of gameTurns) {
    const { square, player } = turns;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

function deriveWinner(board, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = board[combination[0].row][combination[0].column];
    const secondSquare = board[combination[1].row][combination[1].column];
    const thirdSquare = board[combination[2].row][combination[2].column];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const board = deriveGameBoard(gameTurns);
  const winner = deriveWinner(board, players)
  const draw = gameTurns.length===9 && !winner;

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

  function handleNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      }
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName={PLAYERS.X} symbol='X' onNameChange={handleNameChange} />
          <Player isActive={activePlayer === 'O'} initialName={PLAYERS.O} symbol='O' onNameChange={handleNameChange} />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSquareSelect} gameBoard={board} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
