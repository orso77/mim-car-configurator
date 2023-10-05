import React from "react";
import "./WheelItem.css";
import { Link, useNavigate } from "react-router-dom";

function WheelItem(props) {
  const navigate = useNavigate();
  const wheel = props.wheel;

  const urlToNavigate = props.vehicleUrl + "/" + wheel.slug;
  const onClickHandler = (event) => {
    event.preventDefault();
    navigate(urlToNavigate);
    props.showDetailHandler(true);
  };

  const diameters =
    wheel.diameters &&
    wheel.diameters.map((diameter) => {
      return diameter + '"';
    });

  return (
    <Link to={urlToNavigate} onClick={onClickHandler}>
      <div className="wheelItem m-1">
        <div className="card w-100 h-100">
          <div className="card-body d-flex align-items-center">
            <img
              className="img"
              alt={wheel.descr}
              title="MIM Tecnomagnesio"
              src={"https://photo.topruote.com/large/" + wheel.imgUrl}
            />
          </div>
          {/* <div className="card-footer d-flex align-items-center justify-content-center"> */}
          <div className="card-footer justify-content-center">
            <div className="block" style={{ height: 36 }}>
              <strong>{wheel.descr}</strong>
            </div>
            <div className="block">
              {diameters.join(" - ")}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default WheelItem;
