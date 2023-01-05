import React, { useState, useEffect } from "react";
import { readDeck, createCard } from "../utils/api";

function AddCardForm({ deck }) {
  const [currentDeck, setCurrentDeck] = useState({ ...deck });
  const initialFormState = {
    front: "",
    back: "",
    deckId: deck.id,
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    const abortController = new AbortController();
    try {
      readDeck(deck.id, abortController.signal).then(setCurrentDeck);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Error reading the decks");
      } else {
        throw error;
      }
    }
    return () => abortController.abort();
  }, [deck.id]);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      createCard(deck.id, formData).then(setFormData({ ...initialFormState }));
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Error creating card form");
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea className="form-control" name="front" placeholder="Front side of card." rows={3} value={formData.front} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea className="form-control" name="back" placeholder="Back side of card." rows={3} value={formData.back} onChange={handleChange}></textarea>
                </div>
                <a href={`/decks/${deck.id}`} className="btn btn-secondary">Done</a>
                <button className="btn btn-primary" type="submit">Save</button>
        </form>
    </div>
  )
}

export default AddCardForm;
