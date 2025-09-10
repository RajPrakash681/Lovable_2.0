import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styled from "styled-components";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - in real app, this would be an API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Show success message briefly before redirecting
      setTimeout(() => {
        onSuccess();
      }, 800);
    }, 1500);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <Overlay>
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <Header>
          <Logo>✨</Logo>
          <Title>{isSignUp ? "Welcome to Lovable 2.0" : "Welcome Back"}</Title>
          <Subtitle>
            {isSignUp 
              ? "Join the future of elegant web development" 
              : "Continue your journey with sophisticated AI"}
          </Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          {isSignUp && (
            <InputGroup>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required={isSignUp}
              />
            </InputGroup>
          )}

          <InputGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          {isSignUp && (
            <InputGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={isSignUp}
              />
            </InputGroup>
          )}

          <SubmitButton type="submit" disabled={loading || success}>
            {success 
              ? "✓ Success! Redirecting..." 
              : loading 
                ? (isSignUp ? "Creating Account..." : "Signing In...") 
                : (isSignUp ? "Create Account" : "Sign In")
            }
          </SubmitButton>
        </Form>

        <Divider>
          <DividerLine />
          <DividerText>or</DividerText>
          <DividerLine />
        </Divider>

        <SocialButton type="button">
          <SocialIcon>🔍</SocialIcon>
          Continue with Google
        </SocialButton>

        <SocialButton type="button">
          <SocialIcon>📘</SocialIcon>
          Continue with Facebook
        </SocialButton>

        <Footer>
          <FooterText>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </FooterText>
          <FooterLink onClick={toggleMode}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </FooterLink>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default AuthModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const Modal = styled.div`
  background: #1a1a1a;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #ffffff;
  letter-spacing: 0.3px;
`;

const Subtitle = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.4;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 400;
  color: #cccccc;
  font-size: 0.9rem;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 0.85rem;
  font-weight: 400;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  border: none;
  color: #000000;
  border-radius: 8px;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e0e0e0;
`;

const DividerText = styled.span`
  padding: 0 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 400;
  color: #cccccc;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }
`;

const SocialIcon = styled.span`
  font-size: 1.2rem;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const FooterText = styled.span`
  color: #999;
  font-size: 0.9rem;
  font-weight: 300;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-weight: 400;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;
