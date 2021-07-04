import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsHall, updateHall } from '../../actions/HallsActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Footer from "./Footer";
import Axios from 'axios';
import { HALL_UPDATE_RESET } from '../../constants/HallsConstant';
import Footer2 from './Footer2';

export default function EditHallPage(props) {

  const hallId = props.match.params.id;
  const hallDetails = useSelector((state) => state.hallDetails);
  const { loading, error, data1 } = hallDetails;

  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [Contact_No, setContact] = useState('');
  const [Email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [HallName, setHallName] = useState([]);
  const [Capacity, setCapacity] = useState([]);
  const [HallPrice, setHallPrice] = useState([]);

  const [MenuName, setMenuName] = useState([]);
  const [MenuPrice, setMenuPrice] = useState([]);
  
  const [DecorationName, setDecorationName] = useState([]);
  const [DecorationPrice, setDecorationPrice] = useState([]);
  
  const [ServiceName, setServiceName] = useState([]);
  const [ServicePrice, setServicePrice] = useState([]);
 

 
  const HallUpdate = useSelector((state)=> state.HallUpdate)
  const { loading: loadingUpdate, error: errorUpdate,success: successUpdate} = HallUpdate; // HallUpdate is set in store
  
  
  
  const dispatch = useDispatch();
  useEffect(() => {

    if (successUpdate){
      props.history.push('/HallsList/owner');
    }
    if (!data1 || data1._id !== hallId || successUpdate) {
      dispatch({type: HALL_UPDATE_RESET});
      dispatch(detailsHall(hallId));
    } else {
      setName(data1.name);
      setPrice(data1.price);
      setImage(data1.image);
      setContact(data1.Contact_No);
      setEmail(data1.Email);
      setWebsite(data1.website);
      setLocation(data1.location);
      setHallName(data1.HallName.map((val)=>(
       val.name
      )));
   
      setCapacity(data1.HallName.map((val)=>(
        val.capacity
      )));
      setHallPrice(data1.HallName.map((val)=>(
        String(val.price)
      )));
     
      setMenuName(data1.Menu.map((val)=>(
        val.name
      )));
      setMenuPrice(data1.Menu.map((val)=>(
        String(val.price)
      )));

      setDecorationName(data1.Decoration.map((val)=>(
        val.name
      )));
      setDecorationPrice(data1.Decoration.map((val)=>(
        String(val.price)
      )));
      setServiceName(data1.Other_Services.map((val)=>(
        val.name
      )));
      setServicePrice(data1.Other_Services.map((val)=>(
        String(val.price)
      )));
    }
  }, [data1, dispatch, hallId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    
   
    // for hall name
    let arrayname = "";
   var a = arrayname.concat(HallName);
    console.log("arrayName: ",a);
    var hall = a.split(',');
    console.log("arrayName after split: ",hall);

    // for hall capacity
    let arrayname1 = "";
   var a1 = arrayname1.concat(Capacity);
    console.log("arrayName1: ",a1);
    var capacity = a1.split(',');
    console.log("arrayName1 after split: ",capacity);

     // for hall price
     let arrayname2 = "";
     var a1 = arrayname2.concat(HallPrice);
      console.log("arrayName1: ",a1);
      var hprice = [];
      var val= hprice.push(a1.split(','));
      console.log("arrayName2 after split: ",hprice);
      for(var i=0;i<hprice.length;i++){
          var Hprice = hprice[i].map((val)=>Number(val));
      }

    // for Menu Name
     let arrayname3 = "";
     var a = arrayname3.concat(MenuName);
      var menu = a.split(',');
      console.log("arrayName3 after split: ",menu); 

       // for Menu price
     let arrayname4 = "";
     var a4 = arrayname4.concat(MenuPrice);
      console.log("arrayName1: ",a4);
      var mprice = [];
      var val= mprice.push(a4.split(','));
      console.log("arrayName2 after split: ",mprice);
      for(var i=0;i<mprice.length;i++){
          var Mprice = mprice[i].map((val)=>Number(val));
      }


      // for Decoration Name
     let arrayname5 = "";
     var a5 = arrayname5.concat(DecorationName);
      var decoration = a5.split(',');
      console.log("arrayName5 after split: ",decoration); 

       // for Decoration price
     let arrayname6 = "";
     var a6 = arrayname6.concat(DecorationPrice);
      console.log("arrayName6: ",a6);
      var dprice = [];
      var val= dprice.push(a6.split(','));
      console.log("arrayName6 after split: ",dprice);
      for(var i=0;i<dprice.length;i++){
          var Dprice = dprice[i].map((val)=>Number(val));
      }


    // for Service Name
     let arrayname7 = "";
     var a7 = arrayname7.concat(ServiceName);
      var Sname = a7.split(',');
      console.log("arrayName7 after split: ",Sname); 

       // for Services price
     let arrayname8 = "";
     var a8 = arrayname8.concat(ServicePrice);
      console.log("arrayName8: ",a8);
      var sprice = [];
      var val= sprice.push(a8.split(','));
      console.log("arrayName8 after split: ",sprice);
      for(var i=0;i<sprice.length;i++){
          var Sprice = sprice[i].map((val)=>Number(val));
      }

    


    dispatch(updateHall({
      _id: hallId,
      name,
      Email,
      image,
      price,
      location,
      Contact_No,
      website,
      hall,
      capacity,
      Hprice,
      menu,
      Mprice,
      decoration,
      Dprice,
      Sname,
      Sprice

    }))
  };

// for upload image following
const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

// const HallNam = data1.HallName.map((val)=>(
//   val
// ))

  return (
    <div>
      <div className="container mb-5 fonttt">
        <div>
          <h1>Edit Hall {name}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox varient="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <form className="form" onSubmit={submitHandler}>
  <div className="form-group">
    <h5><label for="exampleInputEmail1">Name</label></h5>
    <input type="text" className="form-control" id="name" aria-describedby="name"  value={name}
                onChange={(e) => setName(e.target.value)} />
  </div>
  <div className="form-group">
  <h5><label for="exampleInputEmail1">Email</label> </h5>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={Email}
                onChange={(e) => setEmail(e.target.value)} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Image</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={image} onChange={(e) => setImage(e.target.value)} />
  </div>

  <div>
              <label htmlFor="imageFile">Image File &nbsp;</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox varient="danger">{errorUpload}</MessageBox>
              )}
            </div>

  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Price</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={price}  onChange={(e) => setPrice(e.target.value)} />
  </div>
  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Address</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={location}  onChange={(e) => setLocation(e.target.value)} />
  </div>
  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Contact No</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={Contact_No}  onChange={(e) => setContact(e.target.value)} />
  </div>
  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Website</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={website}  onChange={(e) => setWebsite(e.target.value)} />
  </div>
  {/* for Hall price */}
  <div className="card row padding mt-5" >
  <div className="form-group">
  <h5> <label for="exampleInputPassword1"  style={{textAlign:"center",borderBottom:"2px solid red"}}>Hall Info</label> </h5>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Hall Names</label> </h5>
        <input type="text" className="form-control" id="exampleInputPassword1" value={HallName} onChange={(e)=> setHallName(e.target.value)} />
     </div>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Hall Capacity</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={Capacity} onChange={(e)=> setCapacity(e.target.value)} />
    </div>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Hall Prices</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={HallPrice} onChange={(e)=> setHallPrice(e.target.value)} />
    </div>
  </div>
  </div>

{/* for Menu*/}
  <div className="card row padding mt-2">
  <div className="form-group">
  <h5> <label for="exampleInputPassword1"  style={{textAlign:"center",borderBottom:"2px solid red"}}>Menu Info</label> </h5>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Menu Names</label> </h5>
        <input type="text" className="form-control" id="exampleInputPassword1" value={MenuName} onChange={(e)=> setMenuName(e.target.value)} />
     </div>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Menu Price</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={MenuPrice} onChange={(e)=> setMenuPrice(e.target.value)} />
    </div>
  </div>
  </div>

{/* for Decoration*/}
<div className="card row padding mt-2">
  <div className="form-group">
  <h5> <label for="exampleInputPassword1"  style={{textAlign:"center",borderBottom:"2px solid red"}}>Decoration Info</label> </h5>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Decoration Names</label> </h5>
        <input type="text" className="form-control" id="exampleInputPassword1" value={DecorationName} onChange={(e)=> setDecorationName(e.target.value)} />
     </div>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Decoration Price</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={DecorationPrice} onChange={(e)=> setDecorationPrice(e.target.value)} />
    </div>
  </div>
  </div>


{/* for Menu*/}
<div className="card row padding mt-2">
  <div className="form-group">
  <h5> <label for="exampleInputPassword1"  style={{textAlign:"center",borderBottom:"2px solid red"}}>Other Services Info</label> </h5>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Services Names</label> </h5>
        <input type="text" className="form-control" id="exampleInputPassword1" value={ServiceName} onChange={(e)=> setServiceName(e.target.value)} />
     </div>
    <div className="m-2">
    <h5> <label for="exampleInputPassword1">Services Price</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={ServicePrice} onChange={(e)=> setServicePrice(e.target.value)} />
    </div>
  </div>
  </div>



  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Update</button>
</form>
          </>
        )}
      </div>
      <Footer2 />
    </div>
  );
}