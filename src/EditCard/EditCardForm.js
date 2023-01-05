import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateCard } from "../utils/api";

function EditCardForm({ card, setCard, deckId }) {
  const [formData, setFormData] = useState({ ...card });
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateCard(formData)
        .then(setCard)
        .then((response) => history.push(`/decks/${response.id}`));
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
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea className="form-control" name="front" value={formData.front} onChange={handleChange} rows={3}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea className="form-control" name="back" value={formData.back} onChange={handleChange} rows={3}></textarea>
                </div>
        <a href={`/decks/${deckId}`} className="btn btn-secondary">Cancel</a>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditCardForm;
