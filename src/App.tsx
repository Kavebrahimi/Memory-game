import {GameHeader} from "./components/GameHeader.tsx";
import {Card} from "./components/Card.tsx";
import {useGameLogic} from "./hooks/useGameLogic.ts";


const cardValues: Array<string> = [
    "🦆","🐮","🐷","5",
    "🦁","🐒","🦊","🐺",
    "🦆","🐮","🐷","🐯",
    "🦁","🐒","🦊","🐺",
]

function App() {

    const {cards,
        score,
        moves,
        gameOver,
        initialGame,
        setFlippedCards,
        setMatchedCards,
        handleCardClick,
        setMoves,
        setGameOver,
    } = useGameLogic(cardValues);

    return (
      <div className={'container'}>
          <div className={'inner-container'}>
              <GameHeader score={score} moves={moves}/>
              <div className={`game-over ${gameOver ?'show':''}`}>
                  <p>Well done! <br/> It Took you {moves} Moves to end this</p>
                  <button onClick={()=> {
                      initialGame();
                      setFlippedCards([]);
                      setMatchedCards([]);
                      setMoves(0);
                      setGameOver(false);
                  }}>New game</button>
              </div>
              <div className={'cards-grid'}>
                  {
                      cards.map((card) => (
                          <Card card={card} key={card.id} onClick={handleCardClick}/>
                      ))
                  }
              </div>
          </div>
      </div>
  )
}

export default App
