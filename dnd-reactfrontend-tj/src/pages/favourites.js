import React, { useState } from "react";
import { getSpells, getSpellInfo } from "../components/dnd-api";

const Favourites = () => {
  const [activeSpell, setActiveSpell] = useState();
  const showSpellDesc = async (e) => {
    const spellInfo = await getSpellInfo(e.target.id);
    console.log(spellInfo); //----------------------clog
    setActiveSpell(spellInfo);
  };
  const unFav = () => {
    const spellsArr = JSON.parse(localStorage.getItem("spells"));
    const newArr = spellsArr.filter((data) => data[0] != activeSpell.name);
    localStorage.setItem("spells", JSON.stringify(newArr));
    setActiveSpell();
  };
  const storedFavourites = () => {
    if (!localStorage.getItem("spells")) {
      return <p>you have no saved spells</p>;
    } else {
      const spellsArr = JSON.parse(localStorage.getItem("spells"));
      console.log(spellsArr); //----------------------clog
      return (
        <ul id="favSpells">
          {spellsArr.map((el) => {
            return (
              <li onClick={showSpellDesc} id={el[1]}>
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
    <div id="favSection">
      {storedFavourites()}
      {activeSpell ? (
        <>
          <div id="favDesc">
            <h2>{activeSpell.name}</h2>
            <button onClick={unFav}>Un-favourite</button>
            <h4>Description</h4>
            {activeSpell.desc.map((el) => {
              return <p>{el}</p>;
            })}
            <span>
              <h4>Duration</h4>
              <p>{activeSpell.duration}</p>
            </span>
            <span>
              <h4>Range</h4>
              <p>{activeSpell.range}</p>
            </span>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Favourites;
