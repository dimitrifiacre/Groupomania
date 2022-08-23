import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getUser } from "./store/actions/userActions";

const App = () => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupérer le userId de l'utilisateur connecté
    const checkJwt = async () => {
      axios
        .get("api/auth/checkjwt")
        .then((res) => setUserId(res.data))
        .catch((err) => console.log(err));
    };
    checkJwt();

    // Envoi toutes les données dans mon store (redux)
    if (userId) {
      dispatch(getUser(userId));
    }
  }, [userId]);

  return (
    <UserContext.Provider value={userId}>
      <Router>
        {userId && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          {/* Private routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;