import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api";

function EditDeckForm({ deck }) {
  const [currentDeck, setCurrentDeck] = useState({ ...deck });
  const [formData, setFormData] = useState({ ...currentDeck });

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
      updateDeck(formData).then(setCurrentDeck);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Error updating the decks");
      } else {
        throw error;
      }
    }
    
  };

  return (
    <div className="container">
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <a href={`/decks/${deck.id}`} className="btn btn-secondary">
          Cancel
        </a>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeckForm;
