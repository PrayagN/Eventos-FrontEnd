import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import OrganizerRouter from "./routes/OrganizerRouter";
import AdminRouter from "./routes/AdminRouter";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<UserRouter />} />
          <Route path={"/organizer/*"} element={<OrganizerRouter />} />
          <Route path={"/admin/*"} element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
