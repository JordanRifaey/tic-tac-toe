import React from 'react';
import Confetti from 'react-confetti'


function Square({ value, index,  winningLine, onSquareClick }) {
    const isWinningSquare = winningLine && winningLine.includes(index)
    return (
        <button className={`square ${value && ' has-value'} ${isWinningSquare && ' winning-square'}`} onClick={() => {
            if (!value) {
                onSquareClick()
            }
        }}>
            <h1 className="square-text">{value}</h1>
        </button>
    );
}

function checkWinner(squares) {
    const winningLines = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // top-left to bottom-right diagonal
        [2, 4, 6], // top-right to bottom-left diagonal
    ]
    for (const line of winningLines) {
        const [a, b, c] = line
        if (squares[a]
            && squares[a] === squares[b]
            && squares[a] === squares[c]
        ) {
            console.info('Winner is', squares[a])
            return {
                winner: squares[a],
                winningLine: line,
            }
        }
    }
    return false;
}

export default function Board() {
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    console.clear()
    console.info(squares)
    const [winningLine, setWinningLine] = React.useState(null)
    const winner = checkWinner(squares)
    if (winner && !winningLine) {
        setWinningLine(winner.winningLine)
    }
    const [isXTurn, setIsXTurn] = React.useState(true)

    const onSquareClick = (index) => {
        if (winner) {
            return
        }
        setIsXTurn(!isXTurn)
        let newSquares = squares
        newSquares[index] = isXTurn ? 'X' : 'O'
        setSquares(newSquares)
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null))
        setWinningLine(null)
        setIsXTurn(true) // X always starts first
    }

    const message = winner ? `Winner: ${winner.winner}` : `Your Turn: ${isXTurn ? 'Player 1' : 'Player 2'}`
    return (
        <div className="board-container">
            <div className="board">
                <h2 className="message">{message}</h2>
                <div className="board-row">
                    <Square value={squares[0]} index={0} winningLine={winningLine} onSquareClick={() => onSquareClick(0)} />
                    <Square value={squares[1]} index={1} winningLine={winningLine} onSquareClick={() => onSquareClick(1)} />
                    <Square value={squares[2]} index={2} winningLine={winningLine} onSquareClick={() => onSquareClick(2)} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} index={3} winningLine={winningLine} onSquareClick={() => onSquareClick(3)} />
                    <Square value={squares[4]} index={4} winningLine={winningLine} onSquareClick={() => onSquareClick(4)} />
                    <Square value={squares[5]} index={5} winningLine={winningLine} onSquareClick={() => onSquareClick(5)} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} index={6} winningLine={winningLine} onSquareClick={() => onSquareClick(6)} />
                    <Square value={squares[7]} index={7} winningLine={winningLine} onSquareClick={() => onSquareClick(7)} />
                    <Square value={squares[8]} index={8} winningLine={winningLine} onSquareClick={() => onSquareClick(8)} />
                </div>
                {winner && <Confetti />}
                <button className="btn-reset-game" onClick={resetGame}>Reset Game</button>
            </div>
        </div>
    )
}
