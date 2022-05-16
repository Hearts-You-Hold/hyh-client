import React, { useState, useEffect, useRef } from "react";
import "./styles/filterBars.css";

export default function Funded({
  itemCategoriesList,
  setItemCategory,
  setPageNumber,
  recipientStatesList,
  setItemRecipientsState,
}) {
  const [isCleared, setIsCleared] = useState(false);
  const firstContainer = useRef(null);
  const secondContainer = useRef(null);

  let recipientStatesOptionList = [];

  recipientStatesOptionList = recipientStatesList.map((state, index) => {
    return (
      <option key={`optionCategory-${index}`} value={state}>
        {state}
      </option>
    );
  });

  let findStateValue = (event) => {
    let optionState = event.target.value;

    setItemRecipientsState(optionState);
    setPageNumber(0);
  };

  let itemCategoriesOptionList = [];

  itemCategoriesOptionList = itemCategoriesList.map((category, index) => {
    return (
      <option key={`optionCategory-${index}`} value={category}>
        {category}
      </option>
    );
  });

  let findCategoryValue = (event) => {
    let optionCategory = event.target.value;

    setItemCategory(optionCategory);
    setPageNumber(0);
  };

  let clearFilters = () => {
    setItemCategory("all");
    setItemRecipientsState("all");
    setPageNumber(0);

    firstContainer.current.selectedIndex = 0
    secondContainer.current.selectedIndex = 0

    if (isCleared) {
      setIsCleared(false);
    } else if (!isCleared) {
      setIsCleared(true);
    }
  };

      return (
        <div className="searchSectionContainer">
          <div>
            <h1 className="categorySearchHeader">Sort By:</h1>
          </div>
          <div className="categorySearch">
            <label htmlFor="categorySelect">Item Category:</label>
            <select
              className="categorySelect"
              ref={firstContainer}
              onChange={findCategoryValue}
            >
              <option value="all" defaultValue hidden>
                Category
              </option>
              <option value="all"> All Categories </option>
              {itemCategoriesOptionList}
            </select>
          </div>

          <div className="categorySearch">
            <label htmlFor="categorySelect">Recipient's State :</label>
            <select
              className="categorySelect"
              ref={secondContainer}
              onChange={findStateValue}
            >
              <option value="all" defaultValue hidden>
                State
              </option>
              <option value="all"> All States </option>
              {recipientStatesOptionList}
            </select>
          </div>

          <button className="clearButton" onClick={clearFilters}>Clear</button>
        </div>
      )
}
