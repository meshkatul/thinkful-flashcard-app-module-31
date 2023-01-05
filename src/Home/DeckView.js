import React from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckView({ deck }){
    const history = useHistory();

    const deleteHandler = async () => {
        const abortController = new AbortController();
        if(window.confirm("Delete this deck?\nYou will not be able to recover it.")){
            await deleteDeck(deck.id, abortController.signal);
        };
        history.push("/");
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{deck.name}</h4>
                <h6 className="card-subtitle text-muted">{deck.cards.length} cards</h6>
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    );
}

export default DeckView;