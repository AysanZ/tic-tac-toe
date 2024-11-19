import styles from './app.module.scss'
import Card from "./components/card.tsx";
import {motion} from "motion/react"
import {useState} from "react";

function SymbolX() {
    return (
        <>
            <motion.span className={styles.line} animate={{rotateZ: 225, width: 50, height: 10}}
                         transition={{duration: 0.4}}></motion.span>
            <motion.span className={styles.line} animate={{rotateZ: -225, width: 50, height: 10}}
                         transition={{duration: 0.4}}></motion.span>
        </>
    )
}

function SymbolY() {
    const circleVariants = {
        initial: {
            pathLength: 0,
        },
        animate: {
            pathLength: 1,
            transition: {duration: 0.4},
        }
    }
    return (
        <>
            <motion.svg className={styles.circle}>
                <motion.circle variants={circleVariants} initial={circleVariants.initial}
                               animate={circleVariants.animate} stroke-width="8" fill="none" cx="90"
                               cy="90" r="20" viewBox='0 0 100 100'></motion.circle>
            </motion.svg>
        </>
    )
}
type SquareSymbol = 'X' | 'Y' | null;
interface Square{
    squareSymbol: SquareSymbol,
    isPlayed: boolean,
}
const initialSquare: Square = {
    squareSymbol: null,
    isPlayed: false,
}
function Board() {
    const updateCursor = (e) => {
        document.documentElement.style.setProperty('--x', e.clientX)
        document.documentElement.style.setProperty('--y', e.clientY)
    }
    const initialSquares = [];
    for (let i = 0; i < 9; i++) {
        initialSquares.push(initialSquare);
    }
    const [squares, setSquares] = useState<Square[]>(initialSquares);
    const [turn, setTurn] = useState(true);

    const handleClickSquare = (i:number) => {
        if (!squares[i].isPlayed){
            const nextSquares = squares.slice();
            console.log(nextSquares)
            nextSquares[i].isPlayed = true;
            nextSquares[i].squareSymbol = turn ? 'X' : 'Y';
            console.log(nextSquares);
            setTurn(!turn);
            setSquares(nextSquares);
        }
    }
    const squareIs = (square: Square) => {
        if (square.squareSymbol === 'X') {
            return (<SymbolX/>);
        }else if (square.squareSymbol === 'Y') {
            return (<SymbolY/>);
        }else {
            return null
        }
    }
    return (
        <div onPointerMove={updateCursor} className={styles.board}>
            <ul>
                {squares.map((square, i) => (
                    <li onClick={() => {handleClickSquare(i)}} key={i} className={styles.square}><span>{squareIs(square)}</span></li>
                ))}
            </ul>

        </div>
    );
};

export default function App() {
    return (
        <div className={styles.app}>
            <Card/>
            <Board/>
            <Card inverted={true}/>
        </div>
    );
};