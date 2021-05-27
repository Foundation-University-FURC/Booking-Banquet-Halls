import {
    CART_SAVE,
    CART_ADD_ITEM,
    CART_EMPTY

  } from '../constants/cartConstant';


  export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_SAVE:
        return { ...state, cart1: action.payload };
        case CART_ADD_ITEM:
          const item = action.payload;
          const existItem = state.cartItems.find((x) => x.product === item.product);
          if (existItem) {
            return {
              ...state,
              cartItems: state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
              ),
            };
          } else {
            return { ...state, cartItems: [...state.cartItems, item] };
          };
          case CART_EMPTY:
      return { ...state, cartItems: [] };
      default:
        return state;
    }    


}