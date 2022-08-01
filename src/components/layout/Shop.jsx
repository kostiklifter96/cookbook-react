import React, { useEffect, useContext } from "react";
import { API_KEY, API_URL } from "../../config";

import GoodList from "../Goods/GoodList";
import Preloader from "../Preloader/Preloader";
import Cart from "../Basket/Cart";
import BasketList from "../Basket/BasketList";
import Alert from "../Basket/Alert";
import ShowFullOrder from "../ModalShowOrder/ShowFullOrder";
import Search from "../Search/Search";
import { ShopContext } from "../../context";

export default function Shop() {
  const {
    goods,
    setGoods,
    loading,
    order,
    isBasketShow,
    alertName,
    modalItem,
  } = useContext(ShopContext);

  const searchGoods = (str) => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.featured &&
          setGoods(
            data.featured.filter(
              (el) => el.name.toLowerCase() === str.toLowerCase()
            )
          );
      });
  };

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} />
      <Search searchGoods={searchGoods} />
      {loading ? <Preloader /> : <GoodList goods={goods} />}
      {isBasketShow && <BasketList />}
      {alertName && <Alert />}
      {modalItem && <ShowFullOrder />}
    </main>
  );
}
