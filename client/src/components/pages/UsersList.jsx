import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../../actions/userActions';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import Footer from './Footer';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function UsersList(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
        type: USER_DETAILS_RESET,
      });
  }, [dispatch,successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1 className="fonttt" style={{textAlign:"center"}}>All Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox varient="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox varient="success">User Deleted Successfully</MessageBox>
      )}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <table className="table container mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS OWNER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isOwner ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                <i className="fas fa-edit" style={{color:"green", width:"40px", fontSize:"30px",textShadow:"2px 2px 2px black"}}  onClick={() => props.history.push(`/users/${user._id}/edit`)}/> 

                <i className="fas fa-trash-alt" style={{color:"red", fontSize:"30px",textShadow:"2px 2px 2px gray"}}  onClick={() => deleteHandler(user)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Footer/>
    </div>
  );
}