import { useEffect, useReducer } from "react";
import "./App.css";
import { Product } from "./components/Product";
import { TableProducts } from "./components/TableProducts";
import { productsData } from "./utils/Constans";

const initialState = {
  product: JSON.parse(localStorage.getItem("iphones")) || productsData,
};

const onlineReducer = (state, action) => {
  switch (action.type) {
    case "removeProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantiti !== 0) {
            return {
              ...item,
              quantiti: (item.quantiti = 0),
              price: item.staticprice,
            };
          }
          return item;
        }),
      };

    case "addProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantiti: item.quantiti + 1,
              price: item.price + item.staticprice,
            };
          }
          return item;
        }),
      };
    case "incrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              quantiti: +item.quantiti + 1,
              price: item.price + item.staticprice,
            };
          }
          return item;
        }),
      };

    case "decrementProduct":
      return {
        ...state,
        product: state.product.map((item) => {
          if (item.id === action.payload && item.quantiti !== 1) {
            return {
              ...item,
              quantiti: item.quantiti - 1,
              price: item.price - item.staticprice,
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

function App() {
  const [store, dispatch] = useReducer(onlineReducer, initialState);

  useEffect(() => {
    localStorage.setItem("iphones", JSON.stringify(store.product));
  }, [store.product]);

  const incrementProductHandler = (id) => {
    dispatch({ type: "incrementProduct", payload: id });
  };

  const decrementmentProductHandler = (id) => {
    dispatch({ type: "decrementProduct", payload: id });
  };
  const addProductHandler = (id) => {
    dispatch({ type: "addProduct", payload: id });
  };

  const removeProductHandler = (id) => {
    dispatch({ type: "removeProduct", payload: id });
  };

  return (
    <div className="App">
      <Product addProductHandler={addProductHandler} store={store.product} />
      <TableProducts
        store={store.product}
        removeProductHandler={removeProductHandler}
        incrementProductHandler={incrementProductHandler}
        decrementmentProductHandler={decrementmentProductHandler}
      />
    </div>
  );
}

export default App;
