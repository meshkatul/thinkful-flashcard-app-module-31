import React from "react";

function EditCardNav({ card, deck, deckId }) {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-label="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default EditCardNav;
