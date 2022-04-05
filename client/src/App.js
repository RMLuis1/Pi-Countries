import React from "react";
import { Landinpage } from "./component/landinpage";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home";
import "./App.css";
import { CreateActivity } from "./component/addActivity";
import { HomeActivity } from "./component/homeActivity";
import CountryCard from "./component/countriesCard"

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landinpage />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/home/:id" element={<CountryCard />} />
        <Route path="/activity" element={< HomeActivity />} />
        <Route exact path="/activity/create" element={<CreateActivity/>}/>
      </Routes>
    </div>
  );
}

export default App;
