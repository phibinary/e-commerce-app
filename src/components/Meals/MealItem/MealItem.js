import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";
// import bangleImage from "../../../assets/bbangles.jpg";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `${props.price.toFixed(2)}`;
  const jimage = `${props.image}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      image: props.image,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>
          <span>&#8377; </span>
          {price}
        </div>
      </div>
      <div>
        <img src={jimage} className={classes.image} alt={props.description} />
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
