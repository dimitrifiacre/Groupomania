import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./app/actions/userActions";
import { getAllPosts } from "./app/actions/postActions";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Navbar, PublicRoute, PrivateRoute, Loader } from "./components";
import { UserContext } from "./components/AppContext";

const App = () => {
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupère le user_id de l'utilisateur connecté
    const checkJwt = async () => {
      await axios
        .get("api/auth/checkjwt")
        .then((res) => setUserId(res.data))
        .catch((err) => console.log(err));
    };
    checkJwt();

    // Si l'utilisateur est connecté, on dispatch les données au store
    if (userId) {
      dispatch(getUser(userId));
      dispatch(getAllPosts());
    }
  }, [userId, dispatch]);

  return (
    <UserContext.Provider value={userId}>
      <Router>
        <Loader />
        {userId && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="*" element={<NotFound />} />
          {/* Private routes */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;