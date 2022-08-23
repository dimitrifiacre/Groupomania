import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkJwt = async () => {
      axios
        .get("api/auth/checkjwt")
        .then((res) => setUserId(res.data))
        .catch((err) => console.log(err));
    };
    checkJwt();
  }, [userId]);

  return (
    <UserContext.Provider value={userId}>
      <Router>
        <Routes>
          {/* Private routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;