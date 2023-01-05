import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardView( { card, url }) {
    const handleCardDelete = async (cardId) => {
        if(window.confirm("Delete this card?\nYou will not be able to recover it.")) {
            await deleteCard(card.id);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-text">
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                </div>
            </div>
            <div>
                <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
                <button className="btn btn-danger" onClick={handleCardDelete}>Delete</button>
            </div>
        </div>
    );
}

export default CardView;