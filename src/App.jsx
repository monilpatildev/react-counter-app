import "./App.css";
import Contacts from "./pages/Contacts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import cookies from "js-cookie";

function App() {
  const isLoggedIn = useMemo(() => {
    return !!cookies.get("logged-user");
  }, []);

  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {!userLoggedIn && (
          <>
            <Route
              path="/"
              element={<SignIn setIsLoggedIn={setUserLoggedIn} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/signup" element={<Navigate to="/contacts" />} />
          <Route
            path="/contacts"
            element={<Contacts setIsLoggedIn={setUserLoggedIn} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
