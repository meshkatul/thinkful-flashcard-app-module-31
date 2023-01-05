import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import AddCardNav from "./AddCardNav";
import AddCardForm from "./AddCardForm";


function AddCard() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        try {
          readDeck(deckId, abortController.signal).then(setDeck);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Error reading the decks");
          } else {
            throw error;
          }
        }
        return () => abortController.abort();
      }, [deckId]);

      if(!deck.id) {
        return <h2>Loading...</h2>
      } else {
        return (
            <div>
                <AddCardNav deck={deck} />
                <AddCardForm deck={deck} />
            </div>
        )
      }

}

export default AddCard;