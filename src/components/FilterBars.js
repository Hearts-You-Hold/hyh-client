import React, { useRef } from "react";
import "./styles/filterBars.css";

export default function Funded({
  itemCategoriesList,
  setItemCategory,
  setPageNumber,
  recipientStatesList,
  setItemRecipientsState,
}) {
  //using useRef to grab each filter section to reset selectedIndex when clear button clicked
  const categoryContainer = useRef(null);
  const statesContainer = useRef(null);

  let recipientStatesOptionList = [];

  //building list of states
  recipientStatesOptionList = recipientStatesList.map((state, index) => {
    return (
      <option key={`optionCategory-${index}`} value={state}>
        {state}
      </option>
    );
  });

  //finding selected state and setting state for filtering list in NotFundedPagination
  let findStateValue = (event) => {
    let optionState = event.target.value;

    setItemRecipientsState(optionState);
    setPageNumber(0);
  };

  let itemCategoriesOptionList = [];

  //building list of categories
  itemCategoriesOptionList = itemCategoriesList.map((category, index) => {
    return (
      <option key={`optionCategory-${index}`} value={category}>
        {category}
      </option>
    );
  });

  //finding selected category and setting state for filtering list in NotFundedPagination
  let findCategoryValue = (event) => {
    let optionCategory = event.target.value;

    setItemCategory(optionCategory);
    setPageNumber(0);
  };

  //function to clear filters by setting states back to all and resetting section index
  let clearFilters = () => {
    setItemCategory("all");
    setItemRecipientsState("all");
    setPageNumber(0);

    categoryContainer.current.selectedIndex = 0;
    statesContainer.current.selectedIndex = 0;
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
          ref={categoryContainer}
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
          ref={statesContainer}
          onChange={findStateValue}
        >
          <option value="all" defaultValue hidden>
            State
          </option>
          <option value="all"> All States </option>
          {recipientStatesOptionList}
        </select>
      </div>

      <button className="clearButton" onClick={clearFilters}>
        Clear
      </button>
    </div>
  );
}
