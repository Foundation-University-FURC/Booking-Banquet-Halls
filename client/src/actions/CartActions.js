import Axios from 'axios';
import {
    CART_SAVE,
    CART_ADD_ITEM
  } from '../constants/cartConstant';


  export const addToCart = (productId, date, Guests, Shift, hallName, Menu1,Theme,Services,Sitting,style,EventType,Comments,Total,Total1,Total2,Total3,Total4) => async (dispatch, getState) => {
    
   
    const { data } = await Axios.get(`/api/lists/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        HallName: data.HallName,
        Menu: data.Menu,
        Decoration: data.Decoration,
        Other_Services: data.Other_Services,
        product: data._id,
        owner: data.owner,
        date, 
        Guests, 
        Shift, 
        hallName, 
        Menu1,
        Theme,
        Services,
        Sitting,
        style,
        EventType,
        Comments,
        Total,Total1,Total2,Total3,Total4
      },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };


  export const CartActions = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE, payload: data });
    localStorage.setItem('cart1', JSON.stringify(data));
  };
