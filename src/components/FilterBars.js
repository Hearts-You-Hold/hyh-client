import React, { useState, useEffect } from "react";
import "./styles/filterBars.css";

export default function Funded({
  itemCategoriesList,
  setItemCategory,
  setPageNumber,
  recipientStatesList,
  setItemRecipientsState,
  setItemCategoriesList,
  itemCategory,
  itemRecipientsState, 
  notFunded
}) {

  const [isCleared, setIsCleared] = useState(false)

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

  let findCategoryValue = (event) => {
    let optionCategory = event.target.value;

    setItemCategory(optionCategory);
    setPageNumber(0);
  };

  itemCategoriesOptionList = itemCategoriesList.map((category, index) => {
    return (
      <option key={`optionCategory-${index}`} value={category}>
        {category}
      </option>
    );
  });

  let clearFilters = () => {

    setItemCategory("all");
    setItemRecipientsState("all")

    if(isCleared) {
      setIsCleared(false)
    } else if (!isCleared) {
      setIsCleared(true)
    }
  };

  const [filterBarsTest, setFilterBarsTest] = useState(null)

//   let filterBarsTest = 
//   (<div className="searchSectionContainer">
//   <div>
//     <h1 className="categorySearchHeader">Sort By:</h1>
//   </div>
//   <div className="categorySearch">
//     <label htmlFor="categorySelect">Item Category:</label>
//     <select className="categorySelect" onChange={findCategoryValue}>
//       <option value="all" defaultValue hidden>
//         Category
//       </option>
//       <option value="all"> All Categories </option>
//       {itemCategoriesOptionList}
//     </select>
//   </div>

//   <div className="categorySearch">
//     <label htmlFor="categorySelect">Recipient's State :</label>
//     <select className="categorySelect" onChange={findStateValue}>
//       <option value="all" defaultValue hidden>
//         State
//       </option>
//       <option value="all"> All States </option>
//       {recipientStatesOptionList}
//     </select>
//   </div>
//   <button onClick={clearFilters}>Clear</button>
// </div>) 



useEffect(() => {

  function buildBars(){

    console.log("fired");

  let filterBars = 
  (<div className="searchSectionContainer">
  <div>
    <h1 className="categorySearchHeader">Sort By:</h1>
  </div>
  <div className="categorySearch">
    <label htmlFor="categorySelect">Item Category:</label>
    <select className="categorySelect" onChange={findCategoryValue}>
      <option value="all" defaultValue hidden>
        Category
      </option>
      <option value="all"> All Categories </option>
      {itemCategoriesOptionList}
    </select>
  </div>

  <div className="categorySearch">
    <label htmlFor="categorySelect">Recipient's State :</label>
    <select className="categorySelect" onChange={findStateValue}>
      <option value="all" defaultValue hidden>
        State
      </option>
      <option value="all"> All States </option>
      {recipientStatesOptionList}
    </select>
  </div>
  <button onClick={clearFilters}>Clear</button>
</div>) 

return setFilterBarsTest(filterBars)
  }

  buildBars()


} ,[isCleared, itemCategory, itemRecipientsState, notFunded])  

  return (
    <> 
      {isCleared ? filterBarsTest : filterBarsTest}

       {/* (<div className="searchSectionContainer">
        <div>
          <h1 className="categorySearchHeader">Sort By:</h1>
        </div>
        <div className="categorySearch">
          <label htmlFor="categorySelect">Item Category:</label>
          <select className="categorySelect" onChange={findCategoryValue}>
            <option value="all" defaultValue hidden>
              Category
            </option>
            <option value="all"> All Categories </option>
            {itemCategoriesOptionList}
          </select>
        </div>

        <div className="categorySearch">
          <label htmlFor="categorySelect">Recipient's State :</label>
          <select className="categorySelect" onChange={findStateValue}>
            <option value="all" defaultValue hidden>
              State
            </option>
            <option value="all"> All States </option>
            {recipientStatesOptionList}
          </select>
        </div>
        <button onClick={clearFilters}>Clear</button>
      </div>)  */}
    </>
  );
}
