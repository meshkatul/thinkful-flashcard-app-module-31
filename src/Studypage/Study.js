import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyNav from "./StudyNav";
import CardDisplay from "./CardDisplay";

function Study() {
    const [deck, setDeck] = useState(null);
    const { deckId } = useParams();

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

        return () => abortController.abort();
    }, [deckId]);

    if(!deck) {
        return <h2>Loading...</h2>
    } else {
        return (
            <div>
                <StudyNav deck={deck}/>
                <div className="container">
                    <h1>Study: {deck.name}</h1>
                </div>
                <CardDisplay deck={deck}/>
            </div>
        );
    }

}

export default Study;