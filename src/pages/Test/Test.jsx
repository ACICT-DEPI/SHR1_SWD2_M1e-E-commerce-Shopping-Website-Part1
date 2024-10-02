import React from "react";
import { Route, Routes } from "react-router-dom";
import Ahmed from "./Ahmed";
import Hamis from "./Hamis";
import Iman from "./Iman";
import Sara from "./Sara";
import Hamada from "./Hamada";

const Test = () => {
  return (
    <div>
      <Routes>
        <Route path="/ahmed" element={<Ahmed />} />
        <Route path="/hamis" element={<Hamis />} />
        <Route path="/iman" element={<Iman />} />
        <Route path="/sara" element={<Sara />} />
        <Route path="/hamada" element={<Hamada />} />
      </Routes>
    </div>
  );
};

export default Test;
