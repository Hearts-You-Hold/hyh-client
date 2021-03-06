import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import ShoppingCart from "./ShoppingCart.js";
import NotFundedPagination from "./NotFundedPagination.js";
import Checkout from "./Checkout";
import FilterBars from "./FilterBars.js";
import ScrollToTop from "./ScrollToTop.js";
import Loading from "./Loading.js";

import "./styles/home.css";

import Hearts from "./assets/hearts.png";

export default function Home({
  itemCategoriesList,
  isFunded,
  notFunded,
  setNotFunded,
  recipientStatesList,
  setSuccessfulPayment,
  displayError,
  setItemCategoriesList,
  loaded
}) {
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
  const [showShoppingCartButton, setShowShoppingCartButton] = useState(false);
  const [totalDonation, setTotalDonation] = useState(0);
  const [payPalOpen, setPayPalOpen] = useState(false);
  const [itemCategory, setItemCategory] = useState("all");
  const [itemRecipientsState, setItemRecipientsState] = useState("all");
  const [pageNumber, setPageNumber] = useState(0);
  const [formData, setFormData] = useState([]);

  let totalFunded = isFunded.length;

  let openShoppingCart = () => {
    setShoppingCartIsOpen(true);
    setPayPalOpen(false);
  };

  //function displays shopping cart model if an item has been selected
  useEffect(() => {
    let shoppingCartItem = notFunded.filter((item) => {
      return item.inShoppingCart === true;
    });

    if (shoppingCartItem[0]?.inShoppingCart === true) {
      setShowShoppingCartButton(true);
    } else return;
  }, []);

  useEffect(() => {
    setPayPalOpen(false);
  }, [notFunded]);

  return (
    <>
      {/* hero - page intro information */}
      <ScrollToTop />
      <div className="body">
        <div className="heroContainer">
          <h1 className="heroHeader">
            Requests:<br></br>Organizations & Individual
          </h1>
          <p className="heroText">
            Would you like to fund a request in someone's name as a gift? No
            problem, just let us know the name and email of the person as well
            as a little note from you and we will send a nice email to them!
            Leave this info in the comment box when you check out!
          </p>

          <section className="totalFunded">
            <div>
              {`${totalFunded} Requests `}
              <Link className="fundedLink" to="/Funded">
                Funded!
              </Link>
            </div>
          </section>
        </div>

        {/* go to cart modal */}
        <section>
          {showShoppingCartButton && (
            <div id="shoppingCartButtonContainer">
              <img id="heartsLogo" src={Hearts} alt="Hearts You Hold Logo" />

              <Link id="shoppingCartButton" to="#donation-cart">
                <button className="goToShoppingCart" onClick={openShoppingCart}>
                  Go To Cart
                </button>
              </Link>
            </div>
          )}

          {/* filters */}
          <FilterBars
            itemCategoriesList={itemCategoriesList}
            setItemCategory={setItemCategory}
            setPageNumber={setPageNumber}
            recipientStatesList={recipientStatesList}
            setItemRecipientsState={setItemRecipientsState}
            setItemCategoriesList={setItemCategoriesList}
          />

          {/* hno matches for filtering */}
          {displayError && (
            <>
              <p className="donationCard noListing textCenter">
                We're sorry, but we can't seem to find our requested items!
                Check back soon!
              </p>
            </>
          )}

          {/* list of items, pagination */}
          { loaded ? 
          <NotFundedPagination
            notFunded={notFunded}
            setNotFunded={setNotFunded}
            setShowShoppingCartButton={setShowShoppingCartButton}
            itemCategory={itemCategory}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemRecipientsState={itemRecipientsState}
          /> : <Loading/> }
        </section>

        {/* shoppingCart */}
        {shoppingCartIsOpen && (
          <ShoppingCart
            notFunded={notFunded}
            setNotFunded={setNotFunded}
            setShowShoppingCartButton={setShowShoppingCartButton}
            setShoppingCartIsOpen={setShoppingCartIsOpen}
            totalDonation={totalDonation}
            setTotalDonation={setTotalDonation}
            setPayPalOpen={setPayPalOpen}
            setFormData={setFormData}
          />
        )}

        {/* checkout */}
        {payPalOpen && (
          <>
            <div id="paypal">
              <Checkout
                totalDonation={totalDonation}
                notFunded={notFunded}
                setSuccessfulPayment={setSuccessfulPayment}
                setShowShoppingCartButton={setShowShoppingCartButton}
                formData={formData}
                setPayPalOpen={setPayPalOpen}
                itemCategory={itemCategory}
                setItemCategory={setItemCategory}
                setItemRecipientsState={setItemRecipientsState}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
