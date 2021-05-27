const { HALLS_LISTS_REQUESTS, HALLS_LISTS_SUCCESS, HALLS_LISTS_FAIL, HALL_DELETE_REQUEST, HALL_DELETE_SUCCESS, HALL_DELETE_FAIL, HALL_DELETE_RESET } =require ("../constants/HallsConstant");
const { HALLS_DETAILS_REQUESTS, HALLS_DETAILS_SUCCESS, HALLS_DETAILS_FAIL } =require ("../constants/HallsConstant");
const { HALL_CREATE_REQUEST,HALL_CREATE_SUCCESS,HALL_CREATE_FAIL,HALL_CREATE_RESET, } =require ("../constants/HallsConstant");
const { HALL_UPDATE_REQUEST,HALL_UPDATE_SUCCESS,HALL_UPDATE_FAIL,HALL_UPDATE_RESET, } =require ("../constants/HallsConstant");
const {  HALL_REVIEW_CREATE_REQUEST,
  HALL_REVIEW_CREATE_SUCCESS,
  HALL_REVIEW_CREATE_FAIL,
  HALL_REVIEW_CREATE_RESET, } =require ("../constants/HallsConstant");


export const hallListReducers = (state={loading: true, data:[]}, action)=>{

    switch (action.type) {
        case HALLS_LISTS_REQUESTS:
            return {loading: true}
            
        case HALLS_LISTS_SUCCESS:
            return {loading: false, data: action.payload}
        case HALLS_LISTS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
           
    }

}


export const hallDetailsReducers = (state={loading: true, data1:{}}, action)=>{

    switch (action.type) {
        case HALLS_DETAILS_REQUESTS:
            return {loading: true}
            
        case HALLS_DETAILS_SUCCESS:
            return {loading: false, data1: action.payload}
        case HALLS_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
           
    }

}



export const hallCreateReducer = (state = { loading: false }, action) => {
    switch (action.type) {
      case HALL_CREATE_REQUEST:
        return { loading: true };
      case HALL_CREATE_SUCCESS:
        return { loading: false, success: true, Hall: action.payload };
      case HALL_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case HALL_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };


  export const hallUpdateReducer = (state = {}, action)=>{
      switch (action.type) {
          case HALL_UPDATE_REQUEST:
            return {loading: true};
          case HALL_UPDATE_SUCCESS:
              return {loading: false, success: true};
          case HALL_UPDATE_FAIL:
              return {loading: false, error: action.payload}
          case HALL_UPDATE_RESET:
                return {};
          default:
              return state;
      }
  };



  export const hallDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case HALL_DELETE_REQUEST:
        return { loading: true };
      case HALL_DELETE_SUCCESS:
        return { loading: false, success: true };
      case HALL_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case HALL_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };



  export const hallReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case HALL_REVIEW_CREATE_REQUEST:
        return { loading: true };
      case HALL_REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case HALL_REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case HALL_REVIEW_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };