import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeckPageView from "./DeckPageView";
import DecksNav from "./DecksNav";
import { readDeck } from "../utils/api";

function Decks() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        try{
            readDeck(deckId, abortController.signal).then(setDeck);
        } catch(error) {
            if(error.name === "AbortError"){
                console.log("Error reading the decks");
            } else {
                throw error;
            }
        }
        //readDeck(deckId, abortController.signal).then(setDeck);

        return () => abortController.abort();
    }, [deckId]);

    if(!deck) {
        return <h2>Loading...</h2>;
    } else {
        return (
            <div className="container">
                <DecksNav deck={deck}/>
                <DeckPageView deck={deck}/>
            </div>
        );
    }

}

export default Decks;