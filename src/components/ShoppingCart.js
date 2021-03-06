import React, { useState, useEffect } from "react";
import Percentage from "./Percentage.js";
import Form from "./Form.js";
import "./styles/shoppingCart.css";

export default function ShoppingCart({
  setPayPalOpen,
  totalDonation,
  setTotalDonation,
  notFunded,
  setNotFunded,
  setShowShoppingCartButton,
  setShoppingCartIsOpen,
  setFormData,
}) {
  const [isChecked, setIsChecked] = useState(false);

  //changing inShoppingCart value to true
  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true;
  });

  //making an array of the itemPrices in the shopping cart
  let totalDonationArray = shoppingCartItem.map((item) => {
    return item.itemPricePlusFifteen;
  });

  //if there is nothing in the shopping cart it will not display the cart or the go to cart button anymore
  if (totalDonationArray.length === 0) {
    setShowShoppingCartButton(false);
    setShoppingCartIsOpen(false);
  }

  //totaling the donation prices and and setting it to totalDonation state
  useEffect(() => {
    function addDonations() {
      let donationTotal = 0;

      for (let i = 0; i < totalDonationArray.length; i++) {
        donationTotal = donationTotal + totalDonationArray[i];

        if (i === totalDonationArray.length - 1) {
          setTotalDonation(donationTotal);
        }
      }
    }

    addDonations();
  }, [notFunded]);

  //onClick function to change inShoppingCart boolean
  function removeFromCart(event, id) {
    let removedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, inShoppingCart: false };
      } else {
        return item;
      }
    });
    setNotFunded(removedItem);
    setIsChecked(false);
  }

  //shopping cart item list: name, price and remove button
  let shoppingCart = shoppingCartItem.map((item, index) => {
    return (
      <li className="shoppingCartItem" key={`shoppingCartItem-${index}`}>
        <div className="namePriceContainer">
          <h2 className="itemName">{`${item.itemName}:`}</h2>
          <h2 className="itemPrice">{`$${item.itemPricePlusFifteen}`}</h2>
        </div>
        <button
          className="shoppingCartButton"
          onClick={(event) => {
            removeFromCart(event, item._id);
          }}
        >
          Remove from Donation
        </button>
      </li>
    );
  });

  //forcing donation percentage form to close when items are added or removed from cart
  useEffect(() => {
    setIsChecked(false);
  }, [notFunded]);

  //function for rendering percentage component percentage component
  let checkedBox = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  //function for rendering checkout component and closing shopping cart
  let payPal = () => {
    setPayPalOpen(true);
    setShoppingCartIsOpen(false);
  };

  return (
    <>
      <div id="donation-cart">
        <div className="shoppingCartLeft">
          <h1 className="shoppingCartHeader">Your Donation</h1>
          {/* items in the shopping cart */}
          <ul>{shoppingCart}</ul>
        </div>
        <div className="donationTotal">
          {`Donation Total: $ ${totalDonation}`}
        </div>

        <section className="percentageContainer">
          <h3 className="percentageHeader">Support Hearts You Hold</h3>
          <div id="checkLabel">
            <label htmlFor="checkInput">
              <input
                id="checkInput"
                type="checkbox"
                checked={isChecked}
                onChange={checkedBox}
              />
              I would like to adjust the amount.
            </label>
          </div>
          <p className="percentageHeader">
            This donation includes an optional 15% donation to support Hearts
            You Hold.
          </p>

          {/* percentage component */}
          {isChecked && (
            <Percentage
              totalDonation={totalDonation}
              setTotalDonation={setTotalDonation}
              notFunded={notFunded}
            />
          )}
        </section>
      </div>
      {/* form component */}
      <Form setFormData={setFormData} payPal={payPal} />
    </>
  );
}
