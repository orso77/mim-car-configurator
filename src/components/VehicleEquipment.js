import React from 'react';
import "./VehicleEquipment.css";

function VehicleEquipment(props) {
  const boltItem = props.boltItem;
  let key = -1;
  let bolt;
  if (boltItem) {
    bolt = (
      <li key={key++}>
        <div>
          <strong>{boltItem.caption}</strong>
        </div>
        <div>{boltItem.size}</div>
      </li>
    );
  }
  const wwTyrefitModelItems = props.wwTyrefitModels;
  let wwTyrefitModels = [];
  if (wwTyrefitModelItems && wwTyrefitModelItems.length > 0) {
    //wwTyrefitModels.push(<li key={key++} className="caption"><h5>Pneumatici</h5></li>);
    wwTyrefitModelItems.forEach((wwTyrefitModelItem) => {
      let frontTyre;
      if (wwTyrefitModelItem.frontTyre) {
        frontTyre =
          <div>
            <div>
              <strong>
                Pneumatici</strong>
            </div>
            <div>
              <strong>
                {wwTyrefitModelItem.frontTyre.caption}&nbsp;</strong>
              {wwTyrefitModelItem.frontTyre.size}
            </div>
          </div>;
      }
      let rearTyre;
      if (wwTyrefitModelItem.rearTyre) {
        rearTyre =
          <div>
            <strong>
              {wwTyrefitModelItem.rearTyre.caption}&nbsp;</strong>
            {wwTyrefitModelItem.rearTyre.size}
          </div>;
      }

      let bar;
      if (wwTyrefitModelItem.barCaption) {
        bar =
          <div>
            <strong>
              {wwTyrefitModelItem.barCaption}&nbsp;</strong>
            {wwTyrefitModelItem.bar}
          </div>;
      }

      let frontWheel;
      if (wwTyrefitModelItem.frontWheel) {
        frontWheel =
          <div>
            <div>
              &nbsp;
            </div>
            <div>
              <strong>
                Cerchi</strong>
            </div>
            <div>
              <strong>
                {wwTyrefitModelItem.frontWheel.caption}&nbsp;</strong>
              {wwTyrefitModelItem.frontWheel.size}
            </div>
          </div>;
      }

      let rearWheel;
      if (wwTyrefitModelItem.rearWheel) {
        rearWheel =
          <div>
            <strong>
              {wwTyrefitModelItem.rearWheel.caption}&nbsp;</strong>
            {wwTyrefitModelItem.rearWheel.size}
          </div>;
      }

      wwTyrefitModels.push(<li key={key++}>
        {frontTyre}
        {rearTyre}
        {bar}
        {frontWheel}
        {rearWheel}
      </li>
      );
    })
  }

  const abeItem = props.abeItem;
  let abeCodes = [];
  if (abeItem && abeItem.caption && abeItem.codes) {
    let abeCodeList = [];
    abeItem.codes.forEach((abeCode) => {
      if (abeCode) {
        abeCodeList.push(
          <div key={key++}>
            {abeCode}
          </div>
        );
      }
    });
    if (abeCodeList && abeCodeList.length > 0) {
      abeCodes.push(
        <li key={key++}>
          <div>
            <strong>
              Codici Abe</strong>
            {abeCodeList}
          </div>
        </li>
      );
    }
  }
  return (
    <div className="vehicleEquipment mt-2">
      <div className="card w-100">
        <div className="card-header d-flex align-items-center collapsed" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <strong>Equipaggiamento veicolo</strong>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto text-collapsed bi bi-chevron-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-auto text-expanded bi bi-chevron-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
          </svg>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card-body">
            <ul className="list-unstyled">
              {bolt}
              {wwTyrefitModels}
              {abeCodes}
            </ul>
          </div>
        </div>
      </div>
      {/*<div className="accordion" id="accordionExample">*/}
      {/*  <div className="accordion-item">*/}
      {/*    <h2 className="accordion-header" id="headingOne">*/}
      {/*      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">*/}
      {/*        Equipaggaimento veicolo*/}
      {/*      </button>*/}
      {/*    </h2>*/}
      {/*    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">*/}
      {/*      <div className="accordion-body">*/}
      {/*        <ul className="list-unstyled">*/}
      {/*          {bolt}*/}
      {/*          {wwTyrefitModels}*/}
      {/*          {abeCodes}*/}
      {/*        </ul>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default VehicleEquipment;
