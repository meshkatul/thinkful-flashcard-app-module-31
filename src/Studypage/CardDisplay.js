import React, { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";


function CardDisplay( { deck }) {
    const cards = deck.cards;
    const [card, setCard] = useState({});
    const [cardId, setCardId] = useState(1);
    const [flipped, setFlipped] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        setCard({...cards[cardId-1]});
        return () => abortController.abort();
    }, [cardId]);

    const handleFlip = () => {
        setFlipped(true);
    };

    const handleNext = () => {
        setCardId(cardId + 1);
        setFlipped(false);
    };

    if(flipped === true && cardId === cards.length){
        if(window.confirm("Restart cards?\nClick 'cancel' to return to the home page.")){
            setCardId(1);
            setFlipped(false);
        } else {
            history.push("/");
        }
    }

    if(!cards) {
        return <h2>Loading...</h2>
    } else if (cards.length > 2) {
        return (
            <div className="container">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card {cardId} of {cards.length}</h5>
                    {!flipped ? (<p className="card-text">{card.front}</p>) :
                        (<p className="card-text">{card.back}</p>)
                    }
                    <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {flipped && (<button className="btn btn-primary" onClick={handleNext}>Next</button>)}
                </div>
            </div>
            </div>
        );
    } else {
        return (
            <div>
                <NotEnoughCards deck={deck}/>
            </div>
        )
    }


}

export default CardDisplay;