/* eslint-disable react/button-has-type */
import React, { useMemo, useState } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import './App.css';

const ROW = 3;
const COLUMN = 3;

/** 추가 개발 건 */
// 1. 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요.
// 2. 이동 목록에서 현재 선택된 아이템을 굵게 표시해주세요.
// 3. 사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성해주세요.
// 4. 오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가해주세요.
// 5. 승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조해주세요.
// 6. 승자가 없는 경우 무승부라는 메시지를 표시해주세요.

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

function Board( props ) {
    // const [ squares, setSquares ] = useState( Array( 9 ).fill( null ) );
    // const [ xIsNext, setXIsNext ] = useState( true );

    const renderSquare = ( i ) => (
        <Square
            value={ props.squares[i] }
            onClick={ () => props.onClick( i ) }
        />
    );

    return (
        <div className="board-box">
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
    const [ history, setHistory ] = useState([ {
        squares: Array( ROW * COLUMN ).fill( null ),
        coordinates: [],
    } ]);
    const [ xIsNext, setXIsNext ] = useState( true );
    const [ stepNumber, setStepNumber ] = useState( 0 );

    const current = history[stepNumber];

    const moves = history.map( ( step, move ) => {
        const desc = move
            ? `Go to move #${ move } [${ history[move].coordinates.x }, ${ history[move].coordinates.y }]`
            : 'Go to game start';
        return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={ move }>
                <button
                    className={ ( stepNumber === move ) ? 'move-history-bold' : undefined }
                    onClick={ () => jumpTo( move ) }
                >
                    {desc}
                </button>
            </li>
        );
    });

    const winner = calculateWinner( current.squares );
    let status;
    if ( winner ) {
        status = `Winner: ${ winner }`;
    } else {
        status = `Next player: ${ xIsNext ? 'X' : 'O' }`;
    }

    const handleClick = ( i ) => {
        const historyT = history.slice( 0, stepNumber + 1 );
        const squares = current.squares.slice();
        const x = Math.floor( i / ROW ) + 1;
        const y = Math.floor( i % COLUMN ) + 1;
        const coordinates = { x, y };
        // .slice()를 호출하는 것으로 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정
        // const squaresTemp = squares.slice();
        if ( calculateWinner( squares ) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory( historyT.concat([ { squares, coordinates } ]) );
        setStepNumber( historyT.length );
        setXIsNext( !xIsNext );
    };

    const jumpTo = ( step ) => {
        setStepNumber( step );
        setXIsNext( ( step % 2 ) === 0 );
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={ current.squares }
                    onClick={ ( i ) => handleClick( i ) }
                />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <ol>{moves}</ol>
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
