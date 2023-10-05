import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Configuration from "../Configuration";
import "./WheelDetail.css";

function WheelDetail(props) {
  const navigate = useNavigate();
  const [refUrl, setRefUrl] = useState();

  const onClickHandler = (event) => {
    event.preventDefault();
    navigate(props.refUrl);
    props.showDetailHandler(false);
  };

  useEffect(() => {
    if (props.refUrl) {
      setRefUrl(
        <Link to={props.refUrl} onClick={onClickHandler}>
          &lt; torna alla ricerca
        </Link>
      );
    }
  }, []);

  return (
    <div className="wheelDetail">
      <div className="card w-100">
        <div className="card-header d-flex align-items-center">{refUrl}</div>
        <div className="card-body"></div>
      </div>
    </div>
  );
}

export default WheelDetail;
