import React from "react";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import Calendar from './Calendar'
import GoogleMap from './GoogleMap'
import Chart from './Chart'

const Home = () => {
  return (
 <div className="p-grid p-align-center">
    <div className="p-col p-col-align-stretch"><Chart/></div>
    <div className="p-col p-col-align-stretch"><GoogleMap /></div>
    <div className="p-col p-col-align-stretch"><Calendar /></div>
</div>
  );
};

export default Home;
