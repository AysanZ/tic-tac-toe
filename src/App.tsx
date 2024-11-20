import styles from "./app.module.scss";
import Card from "./components/card.tsx";
import { motion } from "motion/react";
import { useState } from "react";

function SymbolX() {
  return (
    <>
      <motion.span
        className={styles.line}
        animate={{ rotateZ: 225, width: 50, height: 10 }}
        transition={{ duration: 0.4 }}
      ></motion.span>
      <motion.span
        className={styles.line}
        animate={{ rotateZ: -225, width: 50, height: 10 }}
        transition={{ duration: 0.4 }}
      ></motion.span>
    </>
  );
}

function SymbolY() {
  const circleVariants = {
    initial: {
      pathLength: 0,
    },
    animate: {
      pathLength: 1,
      transition: { duration: 0.4 },
    },
  };
  return (
    <>
      <motion.svg className={styles.circle}>
        <motion.circle
          variants={circleVariants}
          initial={circleVariants.initial}
          animate={circleVariants.animate}
          stroke-width="8"
          fill="none"
          cx="90"
          cy="90"
          r="20"
          viewBox="0 0 100 100"
        ></motion.circle>
      </motion.svg>
    </>
  );
}
type SquareSymbol = "X" | "Y" | null;
interface Square {
  squareSymbol: SquareSymbol;
  isPlayed: boolean;
}
const initialSquare: Square = {
  squareSymbol: null,
  isPlayed: false,
};

function Board() {
  //  you can check the type of e by hovering over the `onPointerMove` when you want to pass the updateCursor function
  const updateCursor = (e: React.PointerEvent<HTMLDivElement>) => {
    document.documentElement.style.setProperty("--x", e.clientX.toString());
    document.documentElement.style.setProperty("--y", e.clientY.toString());
  };

  // initializing 9 unplayed squares
  const initialSquares = Array.from({ length: 9 }, () => ({
    ...initialSquare,
  }));
  const [squares, setSquares] = useState<Square[]>(initialSquares);
  // please add type for states even when it is boolean
  const [turn, setTurn] = useState<boolean>(true); // => true for X and false for Y

  const handleClickSquare = (i: number) => {
    // check if square at index i has already been played
    // if is played is true : we do nothing
    if (!squares[i].isPlayed) {
      // updating the squares array
      const nextSquares = squares.map(
        (
          square,
          index // this returns a new array by iterating over the existing squares array
        ) =>
          index === i // if the current squares index  === clicked squares index
            ? {
                // create a new object with updated properties
                ...square,
                isPlayed: true, // changed property
                squareSymbol: turn // as i mentioned we use true for X and false for Y
                  ? ("X" as SquareSymbol)
                  : ("Y" as SquareSymbol),
              }
            : square // otherwise return the unchanged square
      );
      setTurn(!turn);
      setSquares(nextSquares);
    }
  };

  const squareIs = (square: Square) => {
    if (square.squareSymbol === "X") {
      return <SymbolX />;
    } else if (square.squareSymbol === "Y") {
      return <SymbolY />;
    } else {
      return null;
    }
  };
  return (
    <div onPointerMove={updateCursor} className={styles.board}>
      <ul>
        {squares.map((square, i) => (
          <li
            onClick={() => {
              handleClickSquare(i);
            }}
            key={i}
            className={styles.square}
          >
            <span>{squareIs(square)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className={styles.app}>
      <Card />
      <Board />
      <Card inverted={true} />
    </div>
  );
}
