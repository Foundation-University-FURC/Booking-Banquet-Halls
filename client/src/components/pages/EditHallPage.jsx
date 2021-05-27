import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsHall, updateHall } from '../../actions/HallsActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Footer from "./Footer";
import Axios from 'axios';
import { HALL_UPDATE_RESET } from '../../constants/HallsConstant';

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
  // const [HallName, setHallName] = useState({
  //   name: "",
  //   capacity: "",
  //   price: "",
  // })
  
  // const updateField = e => {
  //   setHallName({
  //     [e.target.name]: e.target.value
  //   });
  // };

 
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
      // setHallName(data1.HallName);
    }
  }, [data1, dispatch, hallId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(updateHall({
      _id: hallId,
      name,
      Email,
      image,
      price,
      location,
      Contact_No,
      website,
      // HallName

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
      <div className="container mb-5">
        <div>
          <h1>Edit Hall {hallId}</h1>
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
  {/* <div className="form-group">
  <h5> <label for="exampleInputPassword1">Hall Info</label> </h5>
    <input type="text" className="form-control" id="exampleInputPassword1" value={HallName}
    onChange={updateField} />
  </div> */}
  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Update</button>
</form>
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
}