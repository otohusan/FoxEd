import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/Introduction.css";

function Introduction() {
  type LazyLoadTypes = "ondemand" | "progressive" | "anticipated";

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    lazyLoad: "ondemand" as LazyLoadTypes,
  };

  return (
    <div className="introductionContainer">
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="/slide/intro-slide-1.png" alt="Slide 1" />
          </div>
          <div>
            <img src="/slide/intro-slide-2.png" alt="Slide 2" />
          </div>
          <div>
            <img src="/slide/intro-slide-3.png" alt="Slide 3" />
          </div>
          <div>
            <img src="/slide/intro-slide-4.png" alt="Slide 4" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Introduction;
