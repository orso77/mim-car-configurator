import CarConfigurator from "./components/CarConfigurator";
import CarConfiguratorDaddy from "./components/CarConfiguratorDaddy";
//import { Counter } from "./components/Counter";
//import { FetchData } from "./components/FetchData";
//import { Home } from "./components/Home";

const AppRoutes = [
  //{
  //  path: '/home',
  //  element: <Home />
  //},
  //{
  //  path: '/counter',
  //  element: <Counter />
  //},
  //{
  //  path: '/fetch-data',
  //  element: <FetchData />
  //},
  {
    index: true,
    element: <CarConfiguratorDaddy />
  },
  {
    path: "/:veManufacturer",
    element: <CarConfiguratorDaddy />
  },
  {
    path: "/:veManufacturer/:veModel",
    element: <CarConfiguratorDaddy />
  },
  {
    path: "/:veManufacturer/:veModel/:veSerie",
    element: <CarConfigurator />
  },
  {
    path: "/:veManufacturer/:veModel/:veSerie/:veEngine",
    element: <CarConfiguratorDaddy />
  },
  {
    path: "/:veManufacturer/:veModel/:veSerie/:veEngine/:whBrand/:whModel/:whColor",
    element: <CarConfiguratorDaddy />
  },
];

export default AppRoutes;
