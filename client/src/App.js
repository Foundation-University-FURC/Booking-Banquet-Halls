import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@popperjs/core/dist/umd/popper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import  Navbar  from "./components/pages/Navbar";
import {BrowserRouter,Switch,Route, Redirect, Router, Link} from 'react-router-dom';
import Venues_gujrat from './components/pages/Venues_gujrat';
import Fnavbar from './components/layouts/Fnavbar';
import  Hall_Details from './components/pages/Hall_Details';
import  Car_Rental from './components/pages/Car_Rental';
import  RCar_details from './components/pages/RCar_details';
import  Card_design from './components/pages/Card_design';
import  Cards_details from './components/pages/Cards_details';
import  Photographer from './components/pages/Photographer';
import  Grapher_Details from './components/pages/Grapher_Details';
import  Signin from './components/pages/Signin';
import  Signup from './components/pages/Signup';
import  Admin from './components/pages/Admin';
import  Orders from './components/pages/OrderList';
import  BookingMain from './components/pages/BookingMain';
import OrderDetail from './components/pages/OrderDetail';
import OrderHistory from './components/pages/OrderHistory'
import UserProfile from './components/pages/UserProfile'
import PrivateRoute from './components/pages/PrivateRoute';
import AdminRoute from './components/pages/AdminRoute';
import HallsList from './components/pages/HallsList';
import EditHallPage from './components/pages/EditHallPage';

import { useSelector } from 'react-redux';
import OrderList from './components/pages/OrderList';
import UsersList from './components/pages/UsersList';
import UserEdit from './components/pages/UserEdit';
import OwnerRoute from './components/pages/OwnerRoute';
import Search from './components/pages/Search';
import SearchBox from './components/pages/SearchBox';

import Support from './components/pages/Support';
import ChatBox from './components/pages/ChatBox';
import ContactUs from './components/pages/ContactUs';
// import Forget from './components/pages/Forget';
import OwnerDashboard from './components/pages/OwenrDashboard';
import Forget from './components/pages/Forget';
import NotFound from './components/pages/NotFound';


function App() {
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;
   // const dispatch = useDispatch();
  return (
   <>


<Fnavbar />

   <Switch>
 

    <Route  path = '/AdminDashboard' component={Admin} />
    <Route  path='/signin' component={Signin}/>
    <Route  path='/signup' component={Signup}/>

   
{/* <Route exact path='/Orders' component={Orders}/> */}
{
  userInfo && userInfo.isAdmin?(
    <Route exact path = '/' component={Admin} />
  ): userInfo && userInfo.isOwner?(
    <Route exact path="/" component={OwnerDashboard}/>
  ):(
    <Route exact path="/" component={Navbar}/>
  )
}

<Route exact path="/venues" component={Venues_gujrat}/>
<Route exact path="/Gujrat" component={Venues_gujrat}/>
<Route exact path="/Jehlam" component={Venues_gujrat}/>
<Route exact path="/Lahore" component={Venues_gujrat}/>
<Route exact path="/Rawalpindi" component={Venues_gujrat}/>
<Route exact path="/Islamabad" component={Venues_gujrat}/>
<Route  path = '/MHall/:id' component={Hall_Details} exact />
<Route  path = '/HallsList/:id/edit' component={EditHallPage} exact />
<Route exact path="/rental_car" component={Car_Rental}/>
<Route exact path="/rental_car/:id" component={RCar_details}/>
{/* <Route  path = '/MHall/:id' component={Hall_Details} /> */}
<Route exact path='/design_card' component={Card_design}/>
<Route exact path='/design_card/:id' component={Cards_details}/>
<Route exact path='/reset-password/:id/:token' component={Forget}/>
<Route exact path='/photographers' component={Photographer}/>
<Route  path = '/photographers/:id' component={Grapher_Details} />
<Route  path = '/BookingMain/:id?' component={BookingMain} />
<Route exact path='/Orders/:id' component={OrderDetail}/>
<Route path="/orderhistory" component={OrderHistory}></Route>
<AdminRoute path="/HallsList" component={HallsList} exact ></AdminRoute>
<AdminRoute path="/HallsList/admin" component={HallsList} exact ></AdminRoute>
<AdminRoute path="/orderlist" component={OrderList} exact ></AdminRoute>
<AdminRoute path="/userlist" component={UsersList}></AdminRoute>
<AdminRoute path="/users/:id/edit" component={UserEdit}></AdminRoute>
<OwnerRoute path="/HallsList/owner" component={HallsList}></OwnerRoute>
<OwnerRoute path="/orderlist/owner" component={OrderList}></OwnerRoute>
<Route path="/Myprofile" component={UserProfile}></Route>
<Route path="/ContactUS" component={ContactUs}></Route>
<Route path="*" component={NotFound}></Route>
<Route path="/search/name/:name?" component={Search} exact ></Route>
<Route path="/search/name//location/:location?" component={Search} exact></Route>

{/* <AdminRoute path="/support" component={Support}></AdminRoute> */}

<div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
{/* 
          <div className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>
        </div> */}

</Switch>


   {/* <Imageslider /> */}
   </>
  );
}

export default App;
