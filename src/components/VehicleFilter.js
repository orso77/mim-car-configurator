import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./VehicleFilter.css";
import AppStorage from "../AppStorage";
function VehicleFilter(props) {
  const params = useParams();
  const [manufacturers, setManufacturers] = useState([]);
  const [manufacturerId, setManufacturerId] = useState(0);
  const [veManufacturer, setVeManufacturer] = useState(params.veManufacturer);

  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState("");

  const [series, setSeries] = useState([]);
  const [serieId, setSerieId] = useState(0);

  const [engines, setEngines] = useState([]);
  const [engineId, setEngineId] = useState(0);

  const server = props.server;

  useEffect(() => {
    if (
      (params.veManufacturer && !veManufacturer) ||
      (params.veManufacturer &&
        veManufacturer.toLowerCase() !== params.veManufacturer.toLowerCase())
    ) {
      setVeManufacturer(params.veManufacturer);
    }
  }, []);

  useEffect(() => {
    // Fetch data
    let payload = {};
    axios.post(server + "/vehicles/manufacturers", payload).then((response) => {
      let data = response.data;
      if (data && data.length > 0) {
        data.splice(0, 0, { id: 0, descr: "Seleziona la marca" });
      }
      setManufacturers(data);
      let manufacturerItem;
      if (params.veManufacturer) {
        manufacturerItem = data.find((x) =>
          checkParamUrl(x.slug, params.veManufacturer)
        );
      } else if (AppStorage.manufacturerId) {
        manufacturerItem = data.find((x) => x.id === AppStorage.manufacturerId);
      }
      if (manufacturerItem) {
        setManufacturerId(manufacturerItem.id);
      } else {
        setModels([]);
        setSeries([]);
        setEngines([]);
      }
    });
  }, [veManufacturer]);

  useEffect(() => {
    // Fetch data
    props.vehicleChanged();
    if (manufacturerId > 0) {
      let payload = { manufacturerId };
      axios.post(server + "/vehicles/models", payload).then((response) => {
        let data = response.data;
        if (data && data.length > 0) {
          data.splice(0, 0, { id: 0, descr: "Seleziona il modello" });
        }
        setModels(data);
        let modelItem;
        if (params.veModel) {
          modelItem = data.find((x) => checkParamUrl(x.slug, params.veModel));
        } else if (AppStorage.modelId) {
          modelItem = data.find((x) => x.id === AppStorage.modelId);
        }
        if (modelItem) {
          setModelId(modelItem.id);
        }
        setSeries([]);
        setEngines([]);
      });
    }
  }, [manufacturerId]);

  useEffect(() => {
    // Fetch data
    props.vehicleChanged();
    if (manufacturerId > 0 && modelId && modelId !== "") {
      let payload = { manufacturerId, modelId };
      axios.post(server + "/vehicles/series", payload).then((response) => {
        let data = response.data;
        if (data && data.length > 0) {
          data.splice(0, 0, { id: 0, descr: "Seleziona la serie" });
        }
        setSeries(data);
        let serieItem;
        if (params.veSerie) {
          serieItem = data.find((x) => checkParamUrl(x.slug, params.veSerie));
        } else if (AppStorage.serieId) {
          serieItem = data.find((x) => x.id === AppStorage.serieId);
        }
        if (serieItem) {
          setSerieId(serieItem.id);
        }
        setEngines([]);
      });
    }
  }, [modelId]);

  useEffect(() => {
    // Fetch data
    props.vehicleChanged();
    if (serieId > 0) {
      let payload = { serieId };
      axios.post(server + "/vehicles/engines", payload).then((response) => {
        let data = response.data;
        if (data && data.length > 0) {
          data.splice(0, 0, { id: 0, descr: "Seleziona il motore" });
        }
        setEngines(data);
        let engineItem;
        if (params.veEngine) {
          engineItem = data.find((x) => checkParamUrl(x.slug, params.veEngine));
        } else if (AppStorage.engineId) {
          engineItem = data.find((x) => x.id === AppStorage.engineId);
        }
        if (engineItem) {
          setEngineId(engineItem.id);
        }
      });
    }
  }, [serieId]);

  useEffect(() => {
    // Fetch data
    props.vehicleChanged();
    if (engineId > 0) {
      AppStorage.manufacturerId = manufacturerId;
      AppStorage.serieId = serieId;
      AppStorage.engineId = engineId;
      AppStorage.modelId = modelId;
      var engine = engines.find((x) => x.id === engineId);
      props.navigateVehicle(engine);
    }
  }, [engineId]);

  const manufacturerChanged = (event) => {
    setManufacturerId(parseInt(event.target.value));
  };

  const modelChanged = (event) => {
    setModelId(event.target.value);
  };

  const serieChanged = (event) => {
    setSerieId(parseInt(event.target.value));
  };

  const engineChanged = (event) => {
    setEngineId(parseInt(event.target.value));
  };

  const diameterChanged = (event) => {
    props.diameterChanged(parseFloat(event.target.value));
  };

  const colorChanged = (event) => {
    props.colorChanged(event.target.value);
  };

  const checkParamUrl = (slug, paramValue) => {
    return (
      slug &&
      paramValue &&
      slug.trim().toLowerCase() === paramValue.trim().toLowerCase()
    );
  };

  let diameterItems = [];
  // if (props.diameters && props.diameters.diameters) {
  if (props.diameters && props.diameters.length > 0) {
    let key = -1;
    diameterItems.push(
      <option key={key++} value="0">
        Tutti i diametri
      </option>
    );
    // props.diameters.diameters.forEach((diam) => {
    props.diameters.forEach((diam) => {
      diameterItems.push(
        <option key={key++} value={diam}>
          {diam}"
        </option>
      );
    });
  }

  let colorItems = [];
  // if (props.colors && props.colors.colors) {
  if (props.colors && props.colors.length > 0) {
    let key = -1;
    colorItems.push(
      <option key={key++} value="0">
        Tutte le finiture
      </option>
    );
    // props.colors.colors.forEach((diam) => {
    props.colors.forEach((col) => {
      colorItems.push(
        <option key={key++} value={col}>
          {col}
        </option>
      );
    });
  }

  return (
    // <div className="vehicleFilter" ref={myRef} onScroll={onScroll}>
    <div className="vehicleFilter">
      <div className="card w-100">
        <div className="card-header d-flex align-items-center">
          <strong>Seleziona il tuo veicolo</strong>
        </div>
        <div className="card-body">
          {/*<form onSubmit={doSubmit} >*/}
          <form>
            <div className="mb-3">
              {/* <label
                htmlFor="selectVehicleManufacturers"
                className="form-label"
              >
                Marca
              </label> */}
              <select
                className="form-select"
                id="selectVehicleManufacturers"
                onChange={manufacturerChanged}
                value={manufacturerId}
              >
                {manufacturers.map((Manufacturer) => {
                  return (
                    <option key={Manufacturer.id} value={Manufacturer.id}>
                      {Manufacturer.descr}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="selectVehicleModels" className="form-label">
                Modello
              </label> */}
              <select
                className="form-select"
                id="selectVehicleModels"
                onChange={modelChanged}
                value={modelId}
              >
                {models.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.descr}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="selectVehicleSeries" className="form-label">
                Serie
              </label> */}
              <select
                className="form-select"
                id="selectVehicleSeries"
                onChange={serieChanged}
                value={serieId}
              >
                {series.map((serie) => {
                  return (
                    <option key={serie.id} value={serie.id}>
                      {serie.descr}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="selectVehicleEngines" className="form-label">
                Motore
              </label> */}
              <select
                className="form-select"
                id="selectVehicleEngines"
                onChange={engineChanged}
                value={engineId}
              >
                {engines.map((engine) => {
                  return (
                    <option key={engine.id} value={engine.id}>
                      {engine.descr}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="selectWheelDiameters" className="form-label">
                Diametro
              </label> */}
              <select
                className="form-select"
                id="selectWheelDiameters"
                onChange={diameterChanged}
                value={props.diameter}
              >
                {diameterItems}
              </select>
            </div>
            <div className="mb-3">
              {/* <label htmlFor="selectWheelColors" className="form-label">
                Diametro
              </label> */}
              <select
                className="form-select"
                id="selectWheelColors"
                onChange={colorChanged}
                value={props.color}
              >
                {colorItems}
              </select>
            </div>
            {/*<div className="mb-3 text-end">*/}
            {/*  <button type="submit" className="btn btn-primary">Aggiorna i risultati</button>*/}
            {/*</div>*/}
          </form>
        </div>
      </div>
    </div>
  );
}

export default VehicleFilter;
