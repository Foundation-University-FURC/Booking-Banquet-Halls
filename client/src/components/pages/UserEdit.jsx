import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../../actions/userActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Footer from './Footer';
import Footer2 from './Footer2';


export default function UserEdit(props) {
  
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsOwner(user.isOwner);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isOwner, isAdmin }));
  };
  return (
    <div>
      <div className="fonttt container">
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox varient="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox varient="danger">{error}</MessageBox>
        ) : (
            <>
            <form className="form container mb-5" onSubmit={submitHandler}>
   <div>         
  <div className="form-group">
    <h5><label for="exampleInputEmail1">Name</label></h5>
    <input type="text" className="form-control" id="name" aria-describedby="name"  placeholder="Enter Name" value={name}
                onChange={(e) => setName(e.target.value)} />
  </div>
  <div className="form-group">
  <h5><label for="exampleInputEmail1">Email address</label> </h5>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="Enter email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  </div>
  
    <FormLabel component="legend">IsOwner: </FormLabel>
    <FormControlLabel
        value={true}
          control={<Checkbox color="secondary" />}
          label="Yes"
          labelPlacement="start"
          onChange={(e) => setIsOwner(e.target.value)}
        />
    <FormControlLabel
         value={false}
          control={<Checkbox color="secondary" />}
          label="No"
          labelPlacement="start"
          onChange={(e) => setIsOwner(e.target.value)}
        />
        <br/>

    {/* <FormLabel component="legend">Is Admin: </FormLabel>
    <FormControlLabel
         value={true}
          control={<Checkbox color="primary" />}
          label="Yes"
          labelPlacement="start"
          onChange={(e) => setIsAdmin(e.target.value)}
        />
    <FormControlLabel
          value={false}
          control={<Checkbox color="primary" />}
          label="No"
          labelPlacement="start"
          onChange={(e) => setIsAdmin(e.target.value)}
        /> */}
<br/>

  <button type="submit" className="btn btn-warning">Update</button>
</form>
</>
        )}

     

<Footer2/>

    </div>
  );
}