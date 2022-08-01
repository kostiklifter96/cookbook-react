import React from "react";
import { useNavigate } from "react-router-dom";
import MealItem from "./MealItem";

export default function MealList({ meals }) {
  const navigate = useNavigate();
  return (
    <>
      <button className="btn" onClick={() => navigate(-1)}>
        Go Back
      </button>

      <div className="list">
        {meals.map((el) => (
          <MealItem key={el.idMeal} {...el} />
        ))}
      </div>
    </>
  );
}
