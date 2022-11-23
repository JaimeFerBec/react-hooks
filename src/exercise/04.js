// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }
  
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'jaime-tic-tac-toe:history',
    [ Array(9).fill(null) ],
  )
  const [currentMove, setCurrentMove] = useLocalStorageState(
    'jaime-tic-tac-toe:currentMove',
    0,
  )
  const currentSquares = history[currentMove]

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  
  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner || currentSquares[square]) {
      return
    }
    // 🐨 set the value of the square that was selected
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    const newMove = currentMove + 1
    setHistory([ ...history.slice(0, newMove), squaresCopy ])
    setCurrentMove(newMove)
  }

  const moves = history.map((squares, move) => {
    const isCurrent = move === currentMove
    const desc = move === 0 ? `Go to game start` : `Go to move #${move}`
    const squaresSignature = squares.toString()
    return (
      <li key={squaresSignature}>
        <button
          onClick={() => setCurrentMove(move)}
          disabled={isCurrent}
        >
          {desc} {isCurrent ? '(current)' : null}
        </button>
      </li>
    )
  })

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setHistory([ Array(9).fill(null) ])
    setCurrentMove(0)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">
          {calculateStatus(winner, currentSquares, nextValue)}
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
  ? `Winner: ${winner}`
  : squares.every(Boolean)
  ? `Scratch: Cat's game`
  : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
