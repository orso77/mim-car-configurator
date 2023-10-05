import React, { useEffect, useState } from "react";
import CarConfigurator from "./CarConfigurator";
import WheelDetail from "./WheelDetail";

function CarConfiguratorDaddy(props) {
  const [refUrl, setRefUrl] = useState([]);
  const [isShowingDetail, setIsShowingDetail] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const showDetailHandler = (value) => {
    setIsShowingDetail(value);
  };

  const onScroll = () => {
    const scrollY = window.scrollY;
    setScrollTop(window.scrollY);
    // console.log("window.scrollY: " + window.scrollY);
  };

  useEffect(() => {
    if (!isShowingDetail && window.location.pathname !== refUrl) {
      setRefUrl(window.location.pathname);
    }
    if (isShowingDetail) {
      window.removeEventListener("scroll", onScroll);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Add scroll event listener when component mounts
      window.addEventListener("scroll", onScroll);
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
    };    
  }, [isShowingDetail]);

  return (
    <div className="carConfiguratorContainer">
      <div style={{ display: isShowingDetail ? "none" : "block" }}>
        <CarConfigurator
          showDetailHandler={showDetailHandler}
        ></CarConfigurator>
      </div>
      <div style={{ display: !isShowingDetail ? "none" : "block" }}>
        <WheelDetail
          refUrl={refUrl}
          showDetailHandler={showDetailHandler}
        ></WheelDetail>
      </div>
    </div>
  );
}

export default CarConfiguratorDaddy;
