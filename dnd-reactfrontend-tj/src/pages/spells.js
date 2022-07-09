import React, { useState } from "react";
import { getSpells, getSpellInfo } from "../components/dnd-api";
import Select from "react-select";

let lastPage = false;
const Spells = () => {
  let [options, setOptions] = useState();
  const [page, setPage] = useState(1);
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

  const favourite = (e) => {
    if (localStorage.getItem("spells") == undefined) {
      console.log("no spells saved so far"); //----------------clog
      const savedSpells = [spellInfo.index];
      localStorage.setItem("spells", JSON.stringify(savedSpells));
    } else {
      let savedSpells = JSON.parse(localStorage.getItem("spells"));
      savedSpells.push(spellInfo.index);
      localStorage.setItem("spells", JSON.stringify(savedSpells));
    }
  };
  const increasePage = () => {
    setPage(page + 1);
  };

  const decreasePage = () => {
    setPage(page - 1);
  };

  const SetActiveSpellDropdown = async (e) => {
    const resp = await getSpellInfo(e.value);
    setSpellInfo(resp);
    // console.log(resp.index); //--------------------clog this is the index of the spell, use for saving to favourites
  };
  const SetActiveSpell = async (e) => {
    const resp = await getSpellInfo(e.target.id);
    setSpellInfo(resp);
  };
  const pagesFunct = (array, page, amount = 20) => {
    //lets the user select a page of results,as well as how many results are on each page

    const min = page * amount - 20;
    const returnArr = [];
    let enteredLast = false;
    let max = min + amount;
    if (array.length < max) {
      max = array.length;
      lastPage = true;
      enteredLast = true;
    }
    for (let i = min; i < max; i++) {
      if (array[i] !== undefined) {
        returnArr.push(array[i]);
      } else {
        return;
      }
    }
    if (!enteredLast) {
      lastPage = false;
    }
    return returnArr;
  };
  const pageDisplay = () => {
    if (lastPage === true) {
      return (
        <span id="pageButtons">
          <button onClick={decreasePage}>&#8592;</button>
          <span>{page}</span>
          <button onClick={increasePage} disabled>
            &#8594;
          </button>
        </span>
      );
    } else {
      if (page !== 1) {
        return (
          <span id="pageButtons">
            <button onClick={decreasePage}>&#8592;</button>
            <span>{page}</span>
            <button onClick={increasePage}>&#8594;</button>
          </span>
        );
      }
      return (
        <span id="pageButtons">
          <button onClick={decreasePage} disabled>
            &#8592;
          </button>
          <span>{page}</span>
          <button onClick={increasePage}>&#8594;</button>
        </span>
      );
    }
  };
  return (
    <div>
      <div className="selectDropdown">
        <p>Know what your looking for? Search for it here</p>
        <Select
          isMulti={false}
          options={options}
          closeMenuOnSelect={true}
          onChange={SetActiveSpellDropdown}
        />
      </div>
      {pageDisplay()}
      <div id="infoSection">
        {options ? (
          <>
            <ul className="alphabetSection">
              {pagesFunct(options, page)?.map((el) => {
                if (el.label !== undefined) {
                  return (
                    <li onClick={SetActiveSpell} key={el.value} id={el.value}>
                      {el.label}
                    </li>
                  );
                } else return;
              })}
            </ul>
            <span id="spellInfo">
              {spellInfo ? (
                <>
                  <span id="spellDescSpan">
                    <h3 id="spellDesc">{spellInfo.name}</h3>
                    <button onClick={favourite}>Favourite</button>
                    {spellInfo.desc.map((el) => {
                      return <p className="spellP">{el}</p>;
                    })}
                  </span>
                </>
              ) : (
                <></>
              )}
            </span>
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

//change the page
