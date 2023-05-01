import { createContext, useContext, useEffect, useReducer } from "react";
import { productsData } from "../utils/Constans";


export const StoreContext = createContext()

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
export const StoreProvider =({children})=>{

 const [store, dispatch] = useReducer(onlineReducer, initialState);
 useEffect(() => {
    localStorage.setItem("iphones", JSON.stringify(store.product));
  }, [store.product]);

 const incProduct = (id)=> dispatch({ type: "incrementProduct", payload: id });

 const decProduct = (id)=> dispatch({ type: "decrementProduct", payload: id });

  const addProduct = (id)=> dispatch({ type: "addProduct", payload: id });

 const removeProduct = (id)=> dispatch({ type: "removeProduct", payload: id });

 const contextValue = {
    store,
    incProduct,
    decProduct,
    addProduct,
    removeProduct
}
return <StoreContext.Provider value={contextValue} >
{children}
</StoreContext.Provider>
} ;

export const useContextStore = ()=> useContext(StoreContext)
 
