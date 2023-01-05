import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";

//use createDeck method from utils
//

function CreateDeckForm() {
  const initialFormState = {
    name: "",
    descripion: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      createDeck(formData, abortController.signal).then((response) =>
        history.push(`decks/${response.id}`)
      );
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Error creating deck form");
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="container">
      <h3>Create Deck</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            name="name"
            placeholder="Deck Name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <textarea className="form-control"
            name="description"
            placeholder="Brief description of the deck"
            rows={3}
            value={formData.descripion}
            onChange={handleChange}>
            </textarea>
        </div>
        <a href="/" className="btn btn-secondary">Cancel</a>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeckForm;
