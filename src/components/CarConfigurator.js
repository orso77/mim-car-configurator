import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleFilter from "./VehicleFilter";
import WheelItem from "./WheelItem";
import VehicleEquipment from "./VehicleEquipment";
import Configuration from "../Configuration";
import { useNavigate } from "react-router-dom";

function CarConfigurator(props) {
  const [wheelItems, setwheelItems] = useState([]);
  const [boltItem, setBoltItem] = useState([]);
  const [wwTyrefitModels, setWwTyrefitModels] = useState([]);
  const [abeItem, setAbeItem] = useState([]);
  const [engine, setEngine] = useState({});
  const [diameters, setDiameters] = useState([]);
  const [diameter, setDiameter] = useState(0);
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("");
  const [results, setResults] = useState({});

  const server = Configuration.apiServer;
  const navigate = useNavigate();

  const getWheels = () => {
    if (engine && engine.id > 0) {
      let payload = { engineId: engine.id };
      axios.post(server + "/mimtm/grouped-by-brand-model-color", payload).then((response) => {
        let data = response.data;
        setResults({ data, updatedOn: Date.now() });
        // if (data && data.wheels) {
        //   let key = -1;
        //   setwheelItems(
        //     data.wheels.map((wheel) => {
        //       return (
        //         <WheelItem
        //           vehicleUrl={engine.vehicleUrl}
        //           key={key++}
        //           wheel={wheel}
        //           showDetailHandler={props.showDetailHandler}
        //         ></WheelItem>
        //       );
        //     })
        //   );

        //   setBoltItem(data.boltItem);
        //   setWwTyrefitModels(data.wwTyrefitModels);
        //   setAbeItem(data.abeItem);
        // } else {
        //   setwheelItems([]);
        //   setBoltItem({});
        //   setWwTyrefitModels({});
        //   setAbeItem({});
        // }
      });
    }
  };

  const onlyUnique = (value, index, array) => {
    return array.indexOf(value) === index;
  };

  const resetFilters = () =>{
    if (diameters && diameters.length > 0) {
      setDiameters([]);
      if (diameter > 0) {
        setDiameter(0);
      }
    }
    if (colors && colors.length > 0) {
      setColors([]);
      if (color) {
        setColor("");
      }
    }
  }

  const getWheelItems = () => {
    if (results && results.data && results.data.wheels) {
      let key = -1;
      setwheelItems(
        results.data.wheels
          .filter(
            (w) =>
              (!diameter || diameter === 0 || w.diameters.includes(diameter)) &&
              (!color || color === "" || w.color === color)
          )
          .map((wheel) => {
            return (
              <WheelItem
                vehicleUrl={engine.vehicleUrl}
                key={key++}
                wheel={wheel}
                showDetailHandler={props.showDetailHandler}
              ></WheelItem>
            );
          })
      );

      setBoltItem(results.data.boltItem);
      setWwTyrefitModels(results.data.wwTyrefitModels);
      setAbeItem(results.data.abeItem);
      if (!diameters || diameters.length === 0) {
        // setDiameters(results.data.diameters);
        // let diameterResults = wheelResults.map((wheel)=>{ return wheel.diameters}).filter(onlyUnique).sort((a, b) => (a > b) ? 1 : -1);
        let diameterResults = [];
        let filteredWheels = results.data.wheels;
        filteredWheels.forEach((wheel) => {
          wheel.diameters.forEach((diam) => {
            if (!diameterResults.includes(diam)) {
              diameterResults.push(diam);
            }
          });
        });

        setDiameters(diameterResults.sort((a, b) => (a > b ? 1 : -1)));
      }
      if (true) {
        let colorResults = [];

        let filteredWheels = results.data.wheels.filter(
          (w) => !diameter || diameter === 0.0 || w.diameters.includes(diameter)
        );
        filteredWheels.forEach((wheel) => {
          if (!colorResults.includes(wheel.color)) {
            colorResults.push(wheel.color);
          }
        });
        setColors(colorResults.sort((a, b) => (a > b ? 1 : -1)));
      }
    } else {
      setwheelItems([]);
      setBoltItem({});
      setWwTyrefitModels({});
      setAbeItem({});
      resetFilters();
    }
  };

  useEffect(() => {
    if (engine && engine.id > 0) {
      navigate(engine.vehicleUrl);
      getWheels();
    }
  }, [engine]);

  useEffect(() => {
    if (!color && engine && engine.id > 0) {
      getWheelItems();
    }
    if (color && colors && colors.length > 0) {
      setColors([]);
      setColor("");
    }
  }, [results, diameter]);

  useEffect(() => {
    if (engine && engine.id > 0) {
      getWheelItems();
    }
  }, [color]);

  const navigateVehicle = (value) => {
    setEngine(value);
  };

  const diameterChanged = (value) => {
    setDiameter(value);
  };

  const colorChanged = (value) => {
    setColor(value);
  };

  const vehicleChanged = () => {
    setEngine({});
    resetFilters();
  };

  return (
    <div className="row">
      <div className="col-lg-3">
        <VehicleFilter
          server={server}
          navigateVehicle={navigateVehicle}
          diameterChanged={diameterChanged}
          colorChanged={colorChanged}
          vehicleChanged={vehicleChanged}
          diameters={diameters}
          diameter={diameter}
          colors={colors}
          color={color}
        ></VehicleFilter>
        <VehicleEquipment
          boltItem={boltItem}
          wwTyrefitModels={wwTyrefitModels}
          abeItem={abeItem}
        ></VehicleEquipment>
      </div>
      <div className="col text-center">{wheelItems}</div>
    </div>
  );
}

export default CarConfigurator;
