import React from "react";
import img1 from '../images/prices.jfif'
import img2 from '../images/vendor.jfif'
import img3 from '../images/planning.jfif'
import img4 from '../images/services_assurance.jfif'

import Carousel from 'react-bootstrap/Carousel'



const Carousel_why=()=>{
    return(
        <>

<div className="main">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div id="MiCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#MiCarousel" data-slide-to="0" className="carousel-pagination active"></li>
                        <li data-target="#MiCarousel" data-slide-to="1" className="carousel-pagination"></li>
                        <li data-target="#MiCarousel" data-slide-to="2" className="carousel-pagination"></li>
                        <li data-target="#MiCarousel" data-slide-to="3" className="carousel-pagination"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-md-6 div-l">
                                    <div className="carousel-img" style={{backgroundImage:`URL(${img1})`}}>
                                        <h1 className="carousel-title"></h1>
                                    </div>
                                </div>
                                <div className="col-md-6 div-r">
                                    <h3 >GUARANTEED BEST PRICES</h3>
                                    <hr/>
                                    <p>EventHub.pk offers the best services in the most reasonable pricing which means you get the best for less! Quality of work is something we don’t compromise on.</p>
                                </div>
                            </div>                                
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-md-6 div-l">
                                    <div className="carousel-img" style={{backgroundImage:`URL(${img2})`}}>
                                      
                                    </div>
                                </div>
                                <div className="col-md-6 div-r">
                                    <h3>BACKUP VENDOR OPTIONS</h3>
                                    <hr/>
                                    <p>If your vendor is a no-show, don’t worry! We’ve got you covered. We have backup vendors always ready to move at a moment’s notice.</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-md-6 div-l">
                                    <div className="carousel-img" style={{backgroundImage: `URL(${img3})`}}>
                                    </div>
                                </div>
                                <div className="col-md-6 div-r">
                                    <h3>COMPLEMENTARY PLANNING
CONSULTATION</h3>
                                    <hr/>
                                    <p>Get rid of your stress and let us help you check off items on your to-do list, at no cost. Helping you plan, and even taking you to visit venues before you decide is all on us!</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-md-6 div-l">
                                    <div className="carousel-img" style={{backgroundImage: `URL(${img4})`}}>
                                    </div>
                                </div>
                                <div className="col-md-6 div-r">
                                    <h3>SERVICE
ASSURANCE</h3>
                                    <hr/>
                                    <p>We promise to provide only the best for you on your special day, so don’t worry about a thing and let us handle it!
</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <a className="carousel-control-prev carousel-controls" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next carousel-controls" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a> */}
                </div>
            </div>
        </div>
    </div>
</div>



{/* <Carousel>

  <Carousel.Item>
  
    <Carousel.Caption>
    <h1 className="display-2">We Make your Dream Fine</h1>
<h3>Creative Wedding Planner</h3>
<Link to="/Venues_gujrat"><button type="button" classNameName="btn btn-outline-light btn-lg">Login</button></Link>
<button type="button" className="btn btn-primary btn-lg">Register</button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      classNameName="d-block w-100"
      src={img2}
      alt="Third slide"
    />

    <Carousel.Caption>
    <h1 classNameName="display-2">“A big business starts small.” </h1>
<h3>Creative Wedding Planner</h3>
<button type="button" className="btn btn-outline-light btn-lg">Login</button>
<button type="button" className="btn btn-primary btn-lg">Register</button>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      classNameName="d-block w-100"
      src={img4}
      alt="Third slide"
    />

    <Carousel.Caption>
    <h1 className="display-4"> “Success is the sum of small efforts repeated day in and day out.”</h1>
<h3>Creative Wedding Planner</h3>
<button type="button" className="btn btn-outline-light btn-lg">Login</button>
<button type="button" className="btn btn-primary btn-lg">Register</button>
    </Carousel.Caption>
    </Carousel.Item>
</Carousel> */}


        </>
    );
}

export default Carousel_why