import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //const [httpError, setHttpError] = useState();

  useEffect(() => {
    // const fetchMeals = async () => {
    //   const response = await fetch(
    //     'https://react-http-6b4a6.firebaseio.com/meals.json'
    //   );

    //   if (!response.ok) {
    //     throw new Error('Something went wrong!');
    //   }

    //   const responseData = await response.json();

    const loadedMeals = [
      {
        id: "m1",
        name: "Bengali Bangles",
        description: "Pola (Coral bangles)",
        price: 4299,
        image: "bbangles.jpg",
      },
      {
        id: "m2",
        name: "Earring",
        description: "Ethnic Gold White Pearl!",
        price: 565,
        image: "earring.jpg",
      },
      {
        id: "m3",
        name: "Choker",
        description: "Pearl Bar Gold Choker",
        price: 799,
        image: "choker.jpg",
      },
      {
        id: "m4",
        name: "Pendant",
        description: "2 Carat Solitaire Pendant",
        price: 1899,
        image: "pendant.jpg",
      },
    ];

    // for (const key in responseData) {
    //   loadedMeals.push({
    //     id: key,
    //     name: responseData[key].name,
    //     description: responseData[key].description,
    //     price: responseData[key].price,
    //   });
    // }

    setMeals(loadedMeals);
    setIsLoading(false);
    // };

    // fetchMeals().catch((error) => {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  // if (httpError) {
  //   return (
  //     <section className={classes.MealsError}>
  //       <p>{httpError}</p>
  //     </section>
  //   );
  // }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.image}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
