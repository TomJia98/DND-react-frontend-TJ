import React from "react";
import { getSpells, getSpellInfo } from "../components/dnd-api";

const Favourites = () => {
  const storedFavourites = () => {
    if (!localStorage.getItem("spells")) {
      return <p>you have no saved spells</p>;
    } else {
      const spellsArr = JSON.parse(localStorage.getItem("spells"));
      return (
        <ul>
          {spellsArr.map((el) => {
            // return <li onClick={showSpellDesc} id=""></li>;
          })}
        </ul>
      );
    }
  };
  return <div>favourites</div>;
};

export default Favourites;
