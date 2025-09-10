import React, { useState } from "react";
import LandingPage from "@/components/LandingPage";
import AuthModal from "@/components/AuthModal";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    // Navigate to the builder screen
    navigate("/new");
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  return (
    <>
      <LandingPage onGetStarted={handleGetStarted} />
      {showAuth && (
        <AuthModal onClose={handleCloseAuth} onSuccess={handleAuthSuccess} />
      )}
    </>
  );
};

export default HomeScreen;
