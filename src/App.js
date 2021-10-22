/* eslint-disable react/button-has-type */
import React, { useMemo, useState } from 'react';
import './App.css';

function Square( props ) {
    const { value, onClick } = props;
    const [ clickValue, setClickValue ] = useState( null );
    useMemo( () => setClickValue( value ), [ value ]);

    return (
        <button className="square" onClick={ onClick }>
            {clickValue}
            {/* TODO */}
        </button>
    );
}

function Board() {
    const [ squares, setSquares ] = useState( Array( 9 ).fill( null ) );
    const [ xIsNext, setXIsNext ] = useState( true );
    const winner = calculateWinner( squares );
    let status;
    if ( winner ) {
        status = `Winner: ${ winner }`;
    } else {
        status = `Next player: ${ xIsNext ? 'X' : 'O' }`;
    }

    const handleClick = ( i ) => {
        // .slice()를 호출하는 것으로 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정
        const squaresTemp = squares.slice();
        if ( calculateWinner( squares ) || squares[i]) {
            return;
        }
        squaresTemp[i] = xIsNext ? 'X' : 'O';
        setSquares( squaresTemp );
        setXIsNext( !xIsNext );
    };
    const renderSquare = ( i ) => (
        <Square
            value={ squares[i] }
            onClick={ () => handleClick( i ) }
        />
    );

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare( 0 )}
                {renderSquare( 1 )}
                {renderSquare( 2 )}
            </div>
            <div className="board-row">
                {renderSquare( 3 )}
                {renderSquare( 4 )}
                {renderSquare( 5 )}
            </div>
            <div className="board-row">
                {renderSquare( 6 )}
                {renderSquare( 7 )}
                {renderSquare( 8 )}
            </div>
        </div>
    );
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

export default Game;

function calculateWinner( squares ) {
    const lines = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ],
    ];
    for ( let i = 0; i < lines.length; i += 1 ) {
        const [ a, b, c ] = lines[i];
        if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
