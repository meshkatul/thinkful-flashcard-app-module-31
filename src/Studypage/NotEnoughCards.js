import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ deck }){
    const cards = deck.cards;

    return (
        <div className="container">
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {cards.length} cards in your deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary"> +Add Cards</Link>
        </div>
    )

}

export default NotEnoughCards;