import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import { Link } from "react-router-dom";
import DeckView from "./DeckView";


function DeckList() {
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        setDecks([]);
        const abortController = new AbortController();
        async function loadDecks(){
            try{
                const decksList = await listDecks(abortController.signal);
                setDecks(decksList);
            } catch(error) {
                if(error.name === "AbortError"){
                    console.log("Error creating deck list");
                } else {
                    throw error;
                }
            }
            
        };
        loadDecks();
        return () => abortController.abort;
    }, []);

    if(!decks) {
        return <h1>Loading...</h1>
    } else {
        const deckView = decks.map((deck) => <DeckView key={deck.id} deck={deck} />);
        return (
            <div className="container">
                <Link to="/decks/new" className="btn btn-primary">+ Create Deck</Link>
                <div>{ deckView }</div>
            </div>
        )
    }

}

export default DeckList;