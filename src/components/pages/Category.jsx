import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getFilteredCategory } from "../../api";
import Preloader from "../Preloader/Preloader";
import MealList from "../RecipeListPages/MealList";
import Search from "../Search/Search";

export default function Category() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);

  const [filteredMeals, setFilteredMeals] = useState([]);

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handleSearch = (str) => {
    setFilteredMeals(
      meals.filter((item) =>
        item.strMeal.toLowerCase().includes(str.toLowerCase())
      )
    );

    navigate(`${pathname}?s=${str}`);
  };

  useEffect(() => {
    getFilteredCategory(name).then((data) => {
      setMeals(data.meals);
      setFilteredMeals(
        search
          ? data.meals.filter((item) =>
              item.strMeal
                .toLowerCase()
                .includes(search.split("=")[1].toLowerCase())
            )
          : data.meals
      );
    });
  }, [name]);

  useEffect(() => {
    getFilteredCategory(name).then((data) => {
      setFilteredMeals(
        search
          ? data.meals.filter((item) =>
              item.strMeal
                .toLowerCase()
                .includes(search.split("=")[1].toLowerCase())
            )
          : data.meals
      );
    });
  }, [search]);

  return (
    <>
      <Search handleSearch={handleSearch} />
      {!meals.length ? <Preloader /> : <MealList meals={filteredMeals} />}
    </>
  );
}
