import type {CardType} from "../types/CardType.ts";

type CardsProps ={
    card: CardType;
    onClick?:(card: CardType)=> void;
}

export const Card = ({card, onClick} : CardsProps,) => {
    return (
        <div className={`card ${card.isFlipped ? 'flipped':''} ${card.isMatched ? 'matched' : ''}`} onClick={()=> onClick?.(card)}>
            <div className={'card-front'}>?</div>
            <div className={'card-back'}>{card.value}</div>
        </div>
    );
};