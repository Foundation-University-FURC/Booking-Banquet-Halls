import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../../actions/orderActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function OrderHistory(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <i><h1 className="fonttt" style={{textAlign:"center"}}>Order History</h1></i>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div style={{overflowX:"auto"}}>
        <table className="table fonttt2">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EVENT DATE</th>
              <th>EVENT TYPE</th>
              <th>CREATED AT</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                {order.orderItems.map(val=>(
                   <img className="circularimage" src={val.image} alt="image" />
                ))}{order.orderItems.map(val=>(
                  <span> {val.name} </span>
                ))}</td>
                <td>{order.orderItems.map(val=>(
                   <p> {val.date.substring(0,10)}</p>
                ))}</td>
                <td>{order.orderItems.map(val=>(
                   <p> {val.EventType}</p>
                ))}</td>
                <td>{order.createdAt}</td>
                <td>
                  {order.isAccepted
                    ? order.acceptedAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      props.history.push(`/orders/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}