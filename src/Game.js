import React from 'react'
import Board from './Board'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                x: 0,
                y: 0,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        console.log('new', current)
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? '😈' : '👻';
        this.setState({
            history: history.concat([{
                squares: squares,
                x: Math.floor(i / 3),
                y: i % 3,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move : 
                'To the start of the game';
            const bold = this.state.stepNumber === move ? 'bold' : '';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} className={bold}>{desc}, coordinate - ({step.x + 1} : {step.y + 1})</button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next move: ' + (this.state.xIsNext ? '😈' : '👻');
        }
    
        return (
        <div className="game">
            <h1 className="head">Tic Toc Toe</h1>
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
        <div className="game-info">
            <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
      );
    }
}

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
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
export default Game