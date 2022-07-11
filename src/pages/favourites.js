import React, { useState } from "react";
import { getSpellInfo } from "../utils/dnd-api";

const Favourites = () => {
  const [activeSpell, setActiveSpell] = useState();
  const showSpellDesc = async (e) => {
    //sets the state after a spell has been selected
    const spellInfo = await getSpellInfo(e.target.id);
    setActiveSpell(spellInfo);
  };
  const unFav = () => {
    //once the unfavourite button has been clicked, remove from LS and refresh the state
    const spellsArr = JSON.parse(localStorage.getItem("spells"));
    const newArr = spellsArr.filter((data) => data[0] != activeSpell.name);
    localStorage.setItem("spells", JSON.stringify(newArr));
    setActiveSpell();
  };
  const storedFavourites = () => {
    //displays the items saved in LS
    if (!localStorage.getItem("spells")) {
      return <p>you have no saved spells</p>;
    } else {
      const spellsArr = JSON.parse(localStorage.getItem("spells"));
      return (
        <ul id="favSpells">
          {spellsArr.map((el) => {
            return (
              <li onClick={showSpellDesc} id={el[1]} className="favLi">
                {el[0]}
              </li>
            );
          })}
        </ul>
      );
    }
  };
  //vvv below is the return of the core function vvv
  return (
    <div>
      <h2 id="favTitle">Favourites</h2>

      <div id="favSection">
        <br />
        {storedFavourites()}
        {activeSpell ? (
          <>
            <div id="favDesc">
              <h2 className="spellDesc">{activeSpell.name}</h2>
              <button onClick={unFav}>Un-favourite</button>
              <h4 className="spellDescSmall">Description</h4>
              {activeSpell.desc.map((el) => {
                return <p>{el}</p>;
              })}
              <span>
                <h4 className="spellDescSmall">Duration</h4>
                <p>{activeSpell.duration}</p>
              </span>
              <span>
                <h4 className="spellDescSmall">Range</h4>
                <p>{activeSpell.range}</p>
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Favourites;
