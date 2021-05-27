import React from "react";
import Slider from "react-slick";
import City_content from './City_content';
import Categories from './Categories';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const Cities=()=>{
    return(
        <>
<div className="container padding">
<div className="row welcome text-center">
<div className="col-12">
<h3><strong><b><i> Wedding Halls and Venues in Cities</i></b></strong></h3>
<h6>Select venue based on cities</h6>
</div>
{/* <hr/> */}
</div>
<div className="row padding">
<div className="col-sm-12">

        <Slider {...settings}>
        {
    City_content.map((val,i)=>{
         return  <Categories
            key={i}
            i={val.image1}
            t={val.text1}
/>
     })
 }
        </Slider>
</div>

</div>
</div>


        
  {/* <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div> */}

        </>
    );
}

export default Cities