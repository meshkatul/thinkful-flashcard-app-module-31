import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditCardForm from "./EditCardForm";
import EditCardNav from "./EditCardNav";
import { readCard, readDeck } from "../utils/api";

function EditCard() {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState(null);
    const { deckId, cardId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();

        try{
            readDeck(deckId, abortController.signal).then(setDeck);
            readCard(cardId, abortController.signal).then(setCard);
        } catch(error) {
            if(error.name === "AbortError"){
                console.log("Error reading the decks");
            } else {
                throw error;
            }
        }
        return () => abortController.abort();
    }, [cardId, deckId]);

    if(!deck || !card) {
        return <h2>Loading...</h2>
    } else {
        return (
            <div>
                <EditCardNav card={card} deck={deck} deckId={deckId} />
                <EditCardForm card={card} setCard={setCard} deckId={deckId} />
            </div>
        )
    }

}

export default EditCard;