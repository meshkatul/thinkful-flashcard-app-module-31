import React from "react";
import { deleteDeck } from "../utils/api";
import CardView from "./CardView";
import { useRouteMatch, Link } from "react-router-dom";

function DeckPageView({ deck }) {
  const { url } = useRouteMatch();

  const handleDetele = async (deckId) => {
    if (
      window.confirm("Delete this deck?\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deck.id);
    }
  };

  const cardList = deck.cards.map((card) => (
    <CardView key={card.id} card={card} url={url} />
  ));

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-subtitle">{deck.description}</p>
          <Link to={`${url}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <Link to={`${url}/study`} className="btn btn-primary">
            Study
          </Link>
          <Link to={`${url}/cards/new`} className="btn btn-primary"> +Add Cards</Link>
          <button className="btn btn-danger" onClick={handleDetele}>
            Delete
          </button>
        </div>
      </div>
      <h3>Cards</h3>
      {cardList}
    </div>
  );
}

export default DeckPageView;
