import React from "react";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Left>
        <Logo onClick={handleGoHome}>
          ✨ Lovable 2.0
        </Logo>
      </Left>
      <Right>
        <UserIndicator>
          👤 Signed In
        </UserIndicator>
        <NavButton variant="ghost" onClick={handleGoHome}>
          Back to Home
        </NavButton>
        <LogoutButton variant="outline" onClick={handleLogout}>
          Sign Out
        </LogoutButton>
      </Right>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.button`
  font-size: 1.2rem;
  font-weight: 300;
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.5px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserIndicator = styled.div`
  font-size: 0.85rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 300;
  letter-spacing: 0.3px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavButton = styled(Button)`
  font-size: 0.9rem;
  background: transparent;
  color: #cccccc;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 300;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const LogoutButton = styled(Button)`
  font-size: 0.9rem;
  color: #ff6b6b;
  border-color: rgba(255, 107, 107, 0.3);
  background: transparent;
  font-weight: 300;
  
  &:hover {
    background-color: rgba(255, 107, 107, 0.1);
    color: #ff8888;
    border-color: rgba(255, 107, 107, 0.5);
  }
`;
