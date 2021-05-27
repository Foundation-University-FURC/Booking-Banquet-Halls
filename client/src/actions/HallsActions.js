import Axios from "axios";
import { HALLS_LISTS_REQUESTS, HALLS_LISTS_SUCCESS, HALLS_LISTS_FAIL } from "../constants/HallsConstant";
import { HALLS_DETAILS_REQUESTS, HALLS_DETAILS_SUCCESS, HALLS_DETAILS_FAIL } from "../constants/HallsConstant";
import {  HALL_CREATE_FAIL,HALL_CREATE_REQUEST,HALL_CREATE_SUCCESS } from "../constants/HallsConstant";
import {  HALL_UPDATE_FAIL,HALL_UPDATE_REQUEST,HALL_UPDATE_SUCCESS } from "../constants/HallsConstant";
import {  HALL_DELETE_REQUEST, HALL_DELETE_FAIL, HALL_DELETE_SUCCESS, HALL_DELETE_RESET} from "../constants/HallsConstant";
import {   HALL_REVIEW_CREATE_REQUEST,HALL_REVIEW_CREATE_SUCCESS,HALL_REVIEW_CREATE_FAIL,} from "../constants/HallsConstant";
import SimpleReactLightbox from 'simple-react-lightbox'


export const hallList = ({ owner = '', name='', location ='' }) => async(dispatch)=>{
    dispatch({ 
        type: HALLS_LISTS_REQUESTS
    })

    try {
        const {data} = await Axios.get(`/api/lists?owner=${owner}&name=${name}&location=${location}`)
        dispatch({type: HALLS_LISTS_SUCCESS, payload: data})
        console.log("Data is: ",data);
    } catch (error) {
        dispatch({type: HALLS_LISTS_FAIL, payload: error.message})
        console.log("error is: ",error.message);
    }
}


export const detailsHall = (hallsId)=> async (dispatch)=>{

    dispatch({
        type: HALLS_DETAILS_REQUESTS,
        payload: hallsId
    })
    try {
        // <SimpleReactLightbox>
        const {data}= await Axios.get(`/api/lists/${hallsId}`)
        dispatch({
            type: HALLS_DETAILS_SUCCESS,
            payload: data
        })
        // </SimpleReactLightbox>
    } catch (error) {
        dispatch({
            type: HALLS_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}



export const createHall = () => async (dispatch, getState) => {
    dispatch({ type: HALL_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/listss',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: HALL_CREATE_SUCCESS,
        payload: data.Hall,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: HALL_CREATE_FAIL, payload: message });
    }
  };


  export const updateHall=(data)=> async(dispatch,getState)=> {
    dispatch({type: HALL_UPDATE_REQUEST, payload: data});
    
    const {userSignin: {userInfo}} = getState();
    try {
      const {data1} = await Axios.put(`/api/lists/${data._id}`,data,{
        headers:{Authorization:`Bearer ${userInfo.token}`}  // proceed our token that is expected in backend
      })
      dispatch({type: HALL_UPDATE_SUCCESS, payload:data1})

    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({type: HALL_UPDATE_FAIL, error: message})
    }
  }



  // For delete Marriage Hall

  export const deleteHall = (hallId) => async (dispatch, getState) => {
    dispatch({ type: HALL_DELETE_REQUEST, payload: hallId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/lists/${hallId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: HALL_DELETE_SUCCESS });
    }catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: HALL_DELETE_FAIL, payload: message });
    }
  };



  export const createReview = (hallId, review) => async (
    dispatch,
    getState
  ) => {
    dispatch({ type: HALL_REVIEW_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/api/lists/${hallId}/reviews`,
        review,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type:HALL_REVIEW_CREATE_SUCCESS,
        payload: data.review,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: HALL_REVIEW_CREATE_FAIL, payload: message });
    }
  }