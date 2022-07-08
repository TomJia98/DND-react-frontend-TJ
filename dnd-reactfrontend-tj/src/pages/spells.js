import React, { useState } from "react";
import { getSpells, getSpellInfo } from "../components/dnd-api";
import Select from "react-select";

const Spells = () => {
  let [options, setOptions] = useState();
  const [page, setPage] = useState(1);
  const [selectedSpell, setSelectedSpell] = useState("");
  const [pageSettings, setPageSettings] = useState(page, 20);
  const [spellInfo, setSpellInfo] = useState();
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
    }
  };
  spellsData();

  const increasePage = () => {
    setPage(page + 1);
  };

  const decreasePage = () => {
    setPage(page - 1);
  };

  const pageDisplay = () => {
    if (page !== 1) {
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

  const thing = async (e) => {
    console.log(e.target.id);
    const resp = await getSpellInfo(e.target.id);
    console.log(resp);
    setSpellInfo(resp);
  };
  const pagesFunct = (array, page, amount = 20) => {
    //lets the user select a page of results,as well as how many results are on each page

    const min = page * amount - 20;
    const returnArr = [];
    let max = min + amount;
    if (array.length < max) {
      max = array.length;
    }
    for (let i = min; i < max; i++) {
      if (array[i] !== undefined) {
        returnArr.push(array[i]);
      } else return;
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
      <div id="infoSection">
        {options ? (
          <>
            <ul className="alphabetSection">
              {pagesFunct(options, page)?.map((el) => {
                if (el.label !== undefined) {
                  return (
                    <li onMouseEnter={thing} key={el.value} id={el.value}>
                      {el.label}
                    </li>
                  );
                } else return <li></li>;
              })}
            </ul>
            {pageDisplay()}
            <div className="spellInfo">
              {spellInfo ? (
                <>
                  <h3 id="spellDesc">Spell Description</h3>
                  {spellInfo.desc.map((el) => {
                    return <p>{el}</p>;
                  })}
                  <p>{spellInfo.desc}</p>
                </>
              ) : (
                <>
                  <p>no spell info</p>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <p>loading spells</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Spells;
//need to add a good looking way to display all the ~300 spells, add a search function with autofill. Each element needs to have a dropdown with the info for the spell on hover,
//as well as a fav button. Fav button should save the spell to localStorage for the fav page to pull and display
