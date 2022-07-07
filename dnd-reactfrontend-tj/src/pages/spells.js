import React, { useState } from "react";
import { getSpells } from "../components/dnd-api";
import Select from "react-select";

let options = [];
const spellsData = async () => {
  const results = await getSpells();
  if (options.length === 0) {
    //stops the options from doubling up on re-render
    const resultsArr = results.results;
    for (let i = 0; i < resultsArr.length; i++) {
      const el = { value: resultsArr[i].index, label: resultsArr[i].name };
      options.push(el);
    }
  }

  console.log(results.results);
};

const Spells = () => {
  const [selectedSpell, setSelectedSpell] = useState("");
  spellsData();
  const handleSpellSelection = (ev) => {
    setSelectedSpell(ev.label);
  };
  return (
    <div>
      <Select
        isMulti={false}
        options={options}
        closeMenuOnSelect={true}
        onChange={handleSpellSelection}
      />
      <p>{selectedSpell}</p>
    </div>
  );
};

export default Spells;
//need to add a good looking way to display all the ~300 spells, add a search function with autofill. Each element needs to have a dropdown with the info for the spell on hover,
//as well as a fav button. Fav button should save the spell to localStorage for the fav page to pull and display
