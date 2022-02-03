import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const [userD, setUserData] = useState();

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  let whatsapptext = "https://wa.me/918800649339?text=I would like to order ";
  if (hasItems) {
    cartCtx.items.forEach((x) => {
      whatsapptext += x.amount.toString() + " " + x.name + " ";
    });
    whatsapptext += "of total amount " + totalAmount.toString() + ". ";
    console.log(userD);
    if (userD) {
      whatsapptext +=
        "Please send to " +
        userD.name +
        ", " +
        userD.street +
        ", " +
        userD.city +
        " - " +
        userD.postalCode;
    }
    whatsapptext = encodeURI(whatsapptext);
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setUserData(userData);
    setIsSubmitting(true);
    // await fetch(whatsapptext, {
    //   method: "GET",
    //   // body: JSON.stringify({
    //   //   user: userData,
    //   //   orderedItems: cartCtx.items,
    //   // }),
    // });
    // setIsSubmitting(false);
    // setDidSubmit(true);
    // cartCtx.clearCart();
  };

  const proceedToWA = () => {
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Continue
        </button>
        // <button className={classes.button}>
        //   <a target="_blank" href={finalWAText}>
        //     Order
        //   </a>
        // </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>&#8377; {totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <React.Fragment>
      <p>Proceed with the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={proceedToWA}>
          <a target="_blank" rel="noreferrer" href={whatsapptext}>
            Send Order
          </a>
        </button>
      </div>
    </React.Fragment>
  );
  // <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
