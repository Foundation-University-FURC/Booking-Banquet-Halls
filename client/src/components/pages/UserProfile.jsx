import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import Footer from './Footer';

export default function ProfileScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerLogo, setOwnerLogo] = useState('');
  const [ownerDescription, setOwnerDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(detailsUser(userInfo._id));
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.owner) {
        setOwnerName(user.owner.name);
        setOwnerLogo(user.owner.logo);
        setOwnerDescription(user.owner.description);      
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password,
        ownerName,
        ownerLogo,
        ownerDescription, 
      }));
    }
  };
  return (
    <>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox varient="danger">{error}</MessageBox>
        ) : (
         <div className="container mb-5">
          <div className="fonttt" style={{textAlign:"center"}}>
          <h1>{user.name} Profile</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox varient="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox varient="success">
                Profile Updated Successfully
              </MessageBox>
            )}
          <form className="form" onSubmit={submitHandler}>
  <div className="form-group">
    <h5><label for="exampleInputEmail1">Name</label></h5>
    <input type="text" className="form-control" id="name" aria-describedby="name"  value={name}
                onChange={(e) => setName(e.target.value)} />
  </div>
  <div className="form-group">
  <h5><label for="exampleInputEmail1">Email address</label> </h5>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
                onChange={(e) => setEmail(e.target.value)} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Password</label> </h5>
    <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e) => setPassword(e.target.value)} />
  </div>
  <div className="form-group">
  <h5> <label for="exampleInputPassword1">Confirm Password</label> </h5>
    <input type="password" className="form-control" id="exampleInputPassword1"  onChange={(e) => setConfirmPassword(e.target.value)} />
  </div>


  {user.isOwner && (
              <div className="mb-3">
                <h2 className="fonttt mt-4" style={{textAlign:"center"}}>Owner</h2>
                <div className="form-group">
    <h5><label for="exampleInputEmail1">Owner Name</label></h5>
    <input type="text" className="form-control" id="ownername" aria-describedby="ownername"  value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)} />
  </div>
  <div className="form-group">
    <h5><label for="exampleInputEmail1">Owner Logo</label></h5>
    <input type="text" className="form-control" id="ownerlogo" aria-describedby="ownerlogo"  value={ownerLogo}
                onChange={(e) => setOwnerLogo(e.target.value)} />
  </div>
  <div className="form-group">
    <h5><label for="exampleInputEmail1">Owner Description</label></h5>
    <input type="text" className="form-control" id="ownerdescription" aria-describedby="owenerdescription"  value={ownerDescription}
                onChange={(e) => setOwnerDescription(e.target.value)} />
  </div>
              </div>
            )}


  <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Update</button>
</form>
</div>

         
        )}
        <Footer />
    </>
  );
}