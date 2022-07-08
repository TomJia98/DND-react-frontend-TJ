import React, { useState } from "react";
import { getSpells } from "../components/dnd-api";
import Select from "react-select";

const Spells = () => {
  let [options, setOptions] = useState();
  const [page, setPage] = useState(1);
  const [selectedSpell, setSelectedSpell] = useState("");
  const [pageSettings, setPageSettings] = useState(page, 20);

  const spellsData = async () => {
    const results = await getSpells();
    if (!options) {
      //stops the options from doubling up on re-render
      const resultsArr = results.results;
      const returnArr = [];
      for (let i = 0; i < resultsArr.length; i++) {
        const el = { value: resultsArr[i].index, label: resultsArr[i].name };
        returnArr.push(el);
      }
      setOptions(returnArr);
      console.log(returnArr);
    }
  };
  console.log();
  spellsData();

  const increasePage = () => {
    setPage(page + 1);
  };

  const decreasePage = () => {
    setPage(page - 1);
  };

  const pageDisplay = () => {
    if (page != 1) {
      return (
        <div>
          <button onClick={decreasePage}>-</button>
          <span>{page}</span>
          <button onClick={increasePage}>+</button>
        </div>
      );
    } else {
      return (
        <div>
          <span>{page}</span>
          <button onClick={increasePage}>+</button>
        </div>
      );
    }
  };

  const pagesFunct = (array, page, amount = 20) => {
    //lets the user select a page of results,as well as how many results are on each page
    const min = page * amount;
    const returnArr = [];
    for (let i = min; i < min + amount; i++) {
      returnArr.push(array[i]);
    }
    return returnArr;
  };
  const handleSpellSelection = (ev) => {
    setSelectedSpell(ev.label);
  };
  return (
    <div>
      <div className="selectDropdown">
        <p>Know what your looking for? Search for it here</p>
        <Select
          isMulti={false}
          options={options}
          closeMenuOnSelect={true}
          onChange={handleSpellSelection}
        />
      </div>
      <p>{selectedSpell}</p>
      <div className="alphabetSection">
        {options ? (
          <>
            <ul>
              {pagesFunct(options, page, 20).map((el) => {
                console.log(el);
                return <li>{el.label}</li>;
              })}
            </ul>
            {pageDisplay()}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Spells;
//need to add a good looking way to display all the ~300 spells, add a search function with autofill. Each element needs to have a dropdown with the info for the spell on hover,
//as well as a fav button. Fav button should save the spell to localStorage for the fav page to pull and display
