import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Funded from "./components/Funded.js";
import Home from "./components/Home.js";

import "./normalizer.css";
import "./Styles.css";

export default function App() {
  const [notFunded, setNotFunded] = useState([]);
  const [isFunded, setIsFunded] = useState([]);
  const [itemCategoriesList, setItemCategoriesList] = useState([]);
  const [recipientStatesList, setRecipientStatesList] = useState([]);
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [loaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isConnectedToServer = true;

    //function sets funded and not funded state, adds 15% price increase to items, reverses list to display most recent items, adds shopping cart and readmore booleans
    async function getData() {
      try {
        let response = await fetch(`https://hyh-server.herokuapp.com/`);

        response = await response.json();

        setItemCategoriesList(response[1]);

        setRecipientStatesList(response[2]);

        response = response[0];

        let notFundedVariable = response[0];

        let fundedVariable = response[1];

        notFundedVariable = notFundedVariable.reverse();

        fundedVariable = fundedVariable.reverse();

        //adding 15% to item prices
        fundedVariable = fundedVariable.map((fundedObject, index) => {
          let donationItemPrice = fundedObject.itemPrice;

          donationItemPrice = donationItemPrice * 0.15 + donationItemPrice;

          donationItemPrice = Math.ceil(donationItemPrice);

          setIsLoaded(true)

          return {
            ...fundedObject,
            itemPriceRoundedUp: donationItemPrice,
          };
        });

        //mapping over response object to add inShoppingCart = false
        notFundedVariable = notFundedVariable.map((notFundedObject, index) => {
          let donationItemPrice = notFundedObject.itemPrice;

          donationItemPrice = donationItemPrice * 0.15 + donationItemPrice;

          donationItemPrice = Math.ceil(donationItemPrice);

          return {
            ...notFundedObject,
            inShoppingCart: false,
            readMoreOpen: false,
            itemPricePlusFifteen: donationItemPrice,
            categorySelected: false,
          };
        });

        setNotFunded(notFundedVariable);

        setIsFunded(fundedVariable);
      } catch (error) {
        console.log(error, "Error 404: Request not found");

        setDisplayError(true);
      }
    }

    if (isConnectedToServer) {
      getData();
    }

    // cleanup function to stop getData from running more than needed
    return () => {
      isConnectedToServer = false;
    };
  }, [successfulPayment]);

  return (
    <>
      <div id="body">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                displayError={displayError}
                notFunded={notFunded}
                setNotFunded={setNotFunded}
                isFunded={isFunded}
                itemCategoriesList={itemCategoriesList}
                setItemCategoriesList={setItemCategoriesList}
                recipientStatesList={recipientStatesList}
                setSuccessfulPayment={setSuccessfulPayment}
                loaded={loaded}
              />
            }
          />
          <Route
            path="/Funded"
            element={
              <Funded
                notFunded={notFunded}
                isFunded={isFunded}
                setIsFunded={setIsFunded}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
