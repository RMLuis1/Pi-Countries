import React from "react";
import { Landinpage } from "./component/landinpage";
import { Routes, Route } from "react-router-dom";
import Home from "./component/home";
import "./App.css";
import { CreateActivity } from "./component/addActivity";
import { Country } from "./component/countryDetall";
// import { HomeActivity } from "./component/homeActivity";
// import { ActivityDetall } from "./component/activityDetall";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landinpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Country />} />
        <Route exact path="/activity" element={<CreateActivity />} />
        {/* <Route path="/activity" element={<HomeActivity />} /> */}
        {/* <Route exact path="/activity/:id" element={<ActivityDetall />} /> */}
      </Routes>
    </div>
  );
}

export default App;
