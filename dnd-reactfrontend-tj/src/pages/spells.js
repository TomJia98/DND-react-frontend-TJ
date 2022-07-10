import React, { useState } from "react";
import { getSpells, getSpellInfo } from "../components/dnd-api";
import Select from "react-select";

//used for detecting when the page selector is on last page
let lastPage = false;
const Spells = () => {
  const [options, setOptions] = useState();
  const [page, setPage] = useState(1);
  const [spellInfo, setSpellInfo] = useState();
  const [favButton, setFavButton] = useState();

  const spellsData = async () => {
    //pulls the data from the API and sets as a state
    if (!options) {
      //stops the options from doubling up/recalling on re-render
      const results = await getSpells();
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
    //runs when the favourite button is pressed, saves into localStorage
    const selectedIndex = e.target.parentElement.getAttribute("data-index");
    const selectedName = e.target.parentElement.getAttribute("data-name");
    const selected = [selectedName, selectedIndex];
    if (localStorage.getItem("spells") == undefined) {
      localStorage.setItem("spells", JSON.stringify([selected]));
      setFavButton(<button disabled>Favourited</button>);
    } else {
      let savedSpells = JSON.parse(localStorage.getItem("spells"));
      savedSpells.push(selected);
      localStorage.setItem("spells", JSON.stringify(savedSpells));
      setFavButton(<button disabled>Favourited</button>);
    }
  };

  const isFavouritedinit = (resp) => {
    //the initial check for if a spell is saved in localstorage, for the fav button
    if (localStorage.getItem("spells") == undefined) {
      setFavButton(<button onClick={favourite}>Favourite</button>);
      return;
    }
    const localSpells = JSON.parse(localStorage.getItem("spells"));
    let isFavourited = false;
    for (let i = 0; i < localSpells.length; i++) {
      if (localSpells[i] === resp.name) {
        isFavourited = true;
      }
      if (localSpells[i][0] === resp.name) {
        isFavourited = true;
      }
    }
    if (isFavourited) {
      setFavButton(<button disabled>Favourited</button>);
      isFavourited = false;
    } else {
      setFavButton(<button onClick={favourite}>Favourite</button>);
    }
  };

  const increasePage = () => {
    //increase page
    setPage(page + 1);
  };

  const decreasePage = () => {
    //decrease page
    setPage(page - 1);
  };

  const SetActiveSpellDropdown = async (e) => {
    //the spell selector for the dropdown menu
    setSpellInfo();
    const resp = await getSpellInfo(e.value);
    setSpellInfo(resp);
    isFavouritedinit(resp);
  };
  const SetActiveSpell = async (e) => {
    //spell selector for the side menu
    const resp = await getSpellInfo(e.target.id);
    setSpellInfo(resp);
    isFavouritedinit(resp);
  };
  const pagesFunct = (array, page, amount = 20) => {
    const getWindowWidth = () => {
      const { innerWidth: width } = window;
      return width;
    };
    if (getWindowWidth() < 420) {
      amount = 6;
    }
    //lets the user select a page of results,as well as how many results are on each page
    const min = page * amount - amount;
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
    //returns the correct buttons based on what state the list is in
    //makes sure the user cant go past or under the amount of spells
    if (lastPage === true) {
      return (
        <span id="pageButtons">
          <button onClick={decreasePage}>&#8592;</button>
          <span>Page {page}</span>
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
            <span>Page {page}</span>
            <button onClick={increasePage}>&#8594;</button>
          </span>
        );
      }
      return (
        <span id="pageButtons">
          <button onClick={decreasePage} disabled>
            &#8592;
          </button>
          <span>Page {page}</span>
          <button onClick={increasePage}>&#8594;</button>
        </span>
      );
    }
  };
  //vvv return for the root function vvv
  return (
    <div>
      <div className="selectDropdown">
        <p style={{ textAlign: "center" }}>
          Know what your looking for? Search for it here
        </p>
        <Select
          id="select"
          isMulti={false}
          options={options}
          closeMenuOnSelect={true}
          onChange={SetActiveSpellDropdown}
        />
      </div>
      <br />
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
                  <span
                    id="spellDescSpan"
                    data-index={spellInfo.index}
                    data-name={spellInfo.name}
                  >
                    <h3 className="spellDesc">{spellInfo.name}</h3>
                    {favButton}
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
            <p>loading spells, just a second</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Spells;
