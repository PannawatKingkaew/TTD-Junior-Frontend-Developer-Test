import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate,} from "react-router-dom";
import { AuthProvider } from "./component/AuthContext";
import Header from "./component/Header";
import Homepage from "./component/Homepage";
import Profile from "./component/Profile";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

const App: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setCurrentLocation(window.location.pathname);
  }, []);

  const isError = currentLocation === "/error";

  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleSignInClose = () => {
    setShowSignIn(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {!isError && <Header onSignInClick={handleSignInClick} />}
          {showSignIn && <SignIn onClose={handleSignInClose} />}

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/error" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
