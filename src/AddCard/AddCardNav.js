import React from "react";

function AddCardNav({ deck }) {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-label="page">
            Add Card 
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default AddCardNav;
