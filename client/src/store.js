import Halls from './MarriageHalls'
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { hallListReducers,hallDetailsReducers, hallCreateReducer, hallUpdateReducer, hallDeleteReducer, hallReviewCreateReducer } from './reducers/hallReducers';
import { userRegisterReducer, userSigninReducer,  userDetailsReducer,userUpdateProfileReducer,  userListReducer, userDeleteReducer, userUpdateReducer, userForgetReducer, } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderAcceptReducer, orderCreateReducer,orderDeleteReducer,orderDetailsReducer, orderListReducer, orderMineListReducer} from './reducers/orderReducers';

const initialState = {

    userSignin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo'))
          : null,
      },
      cart: {
            cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
            cart1: localStorage.getItem('cart1')
            ? JSON.parse(localStorage.getItem('cart1'))
            : {},
      },
}
const reducer = combineReducers({
    HallsList: hallListReducers,
    hallDetails: hallDetailsReducers,
    userForget: userForgetReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer, 
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    HallCreate: hallCreateReducer,
    HallUpdate: hallUpdateReducer,
    hallDelete: hallDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderAccept: orderAcceptReducer,
    hallReviewCreate: hallReviewCreateReducer,
    
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk)) )

export default store