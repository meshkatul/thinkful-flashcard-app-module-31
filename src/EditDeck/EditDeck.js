import React, { useEffect, useState } from "react";
import EditDeckForm from "./EditDeckForm";
import EditDeckNav from "./EditDeckNav";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function EditDeck() {
    const [deck, setDeck] = useState(null);
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

      if(!deck) {
        return <h2>Loading...</h2>
      } else {
        return (
            <div>
                <EditDeckNav deck={deck}/>
                <EditDeckForm deck={deck}/>
            </div>
        )
      }

}

export default EditDeck;