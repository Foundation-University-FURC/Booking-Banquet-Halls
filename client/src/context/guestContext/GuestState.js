import React, {useReducer} from 'react'
import GuestContext from './GuestContext'
import guestReducer from './GuestReducer'


const GuestState = (props) => {
    
   const initialstate ={
       guests:[
           {
              id: 1,
              name: "CASABALANCA BANQUET HALL GARRISON",
              price: "1250",
              loaction: "Garrison Golf Hall No 10" 
           },
           {
              id: 2,
              name: "CASABALANCA BANQUET HALL GARRISON",
              price: "1250",
              loaction: "Garrison Golf Hall No 10" 
           },
           {
              id: 3,
              name: "CASABALANCA BANQUET HALL GARRISON",
              price: "1250",
              loaction: "Garrison Golf Hall No 10" 
           }
       ]
   }
const [state, dispatch] = useReducer(guestReducer,initialstate)
    return (
        <GuestContext.Provider value ={{
            guests: state.guests
            // console.log(props.chilederen)
        }}
        >{props.cholderen}</GuestContext.Provider>
    )
}

export default GuestState