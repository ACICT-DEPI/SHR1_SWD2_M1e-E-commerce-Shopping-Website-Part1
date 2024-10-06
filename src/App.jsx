import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Test from "./pages/Test/Test";

// import PrimeReact
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { ratingStyle } from "./layout/ratingStyle";

function App() {
  const rating = {
    rating: ratingStyle,
  };
  return (
    <div className="App">
      {/* Defined PrimeReact */}
      <PrimeReactProvider
        value={{ unstyled: true, pt: { ...Tailwind, ...rating } }}
      >
        <Routes>
          {/* Routes for users */}
          <Route path="/*" element={<UserRoutes />} />
          {/* Routes for admins */}
          <Route path="/admin/*" element={<AdminRoutes />} />
          {/* Routes for testing */}
          <Route path="/test/*" element={<Test />} />
        </Routes>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
