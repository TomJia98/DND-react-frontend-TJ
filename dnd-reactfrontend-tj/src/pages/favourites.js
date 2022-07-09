import React, { useState } from "react";
import { getSpells, getSpellInfo } from "../components/dnd-api";

const Favourites = () => {
  const [activeSpell, setActiveSpell] = useState();
  const showSpellDesc = async (e) => {
    const spellInfo = await getSpellInfo(e.target.id);
    console.log(spellInfo);
    setActiveSpell(spellInfo);
  };

  const storedFavourites = () => {
    if (!localStorage.getItem("spells")) {
      return <p>you have no saved spells</p>;
    } else {
      const spellsArr = JSON.parse(localStorage.getItem("spells"));
      console.log(spellsArr);
      return (
        <ul>
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
    <div>
      {storedFavourites()}
      {activeSpell ? (
        <>
          <p>{activeSpell.name}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Favourites;
