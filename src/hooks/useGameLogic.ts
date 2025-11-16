import {useEffect, useState} from "react";
import type {CardType} from "../types/CardType.ts";

export const useGameLogic = (cardValues: string[]) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0)
  const [gameOver, setGameOver] = useState(false);

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const initialGame = ()=> {
    const finalCards: CardType[] = cardValues.map((value, index)=> (
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }
    ));
    const shuffleCards = shuffleArray(finalCards);
    setCards(shuffleCards);
  }
  useEffect(()=>{
    initialGame()
  },[])
  const handleCardClick = (card: CardType) => {
    if (card.isFlipped || card.isMatched || isChecking || gameOver) return;

    const newCards = cards.map(c =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(prev => prev + 1);

      const [firstCard, secondCard] = newFlippedCards;

      if (firstCard.value === secondCard.value) {
        setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
        setCards(prev =>
          prev.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          )
        );

        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);

          if (matchedCards.length + 2 === cards.length) {
            setScore(prev => prev + 1);
            setGameOver(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };
  return {cards, score, moves, setMoves, setScore, gameOver, setGameOver, initialGame, setFlippedCards, setMatchedCards, handleCardClick}
}