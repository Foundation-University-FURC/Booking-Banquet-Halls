import React, {useContext} from 'react'
import  GuestContext  from '../../context/guestContext/GuestContext';
import  M_Card  from "./M_Card";


const Hall_lists = () => {
         {/* hall Cards will display here */}
 const {guests} = useContext(GuestContext)
    return (
      
         <div>
             {/* <Guest /> */}
         {guests.map((guest) =>{
             <M_Card key={guest.id} guest={guest} />
             }
             )}
        
         </div>   
    )
}
export default Hall_lists