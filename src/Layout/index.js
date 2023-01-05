import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import DeckList from "../Home/DeckList";
import CreateDeck from "../CreateDeck/CreateDeck";
import Decks from "../DeckPage/Decks";
import Study from "../Studypage/Study";
import EditDeck from "../EditDeck/EditDeck";
import EditCard from "../EditCard/EditCard";
import AddCard from "../AddCard/AddCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
          <Decks />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
          <NotFound />
        </Switch>
        
      </div>
    </>
  );
}

export default Layout;
