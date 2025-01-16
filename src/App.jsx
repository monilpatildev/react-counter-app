
import "./App.css";
import Contacts from "./Pages/Contacts";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (

    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
