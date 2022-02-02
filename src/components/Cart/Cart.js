import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
//import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  let whatsapptext = "Please send ";
  if (hasItems) {
    cartCtx.items.forEach((x) => {
      whatsapptext += x.amount.toString() + " " + x.name + " ";
    });
    whatsapptext += "of total amount " + totalAmount.toString();
    //console.log(whatsapptext);
  }
  const finalWAText =
    "https://wa.me/918368103143?text=" + encodeURI(whatsapptext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  // const orderHandler = () => {
  //   setIsCheckout(true);
  // };

  // const submitOrderHandler = async (userData) => {
  //   setIsSubmitting(true);
  //   await fetch("https://react-http-6b4a6.firebaseio.com/orders.json", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       user: userData,
  //       orderedItems: cartCtx.items,
  //     }),
  //   });
  //   setIsSubmitting(false);
  //   setDidSubmit(true);
  //   cartCtx.clearCart();
  // };

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
        // <button className={classes.button} onClick={orderHandler}>
        //   Order
        // </button>
        <button className={classes.button}>
          <a target="_blank" href={finalWAText}>
            Order
          </a>
        </button>
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
      {/* {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )} */}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

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
