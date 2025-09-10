import React from "react";
import { Button } from "@/components/ui/button";
import styled from "styled-components";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <Container>
      <BackgroundPattern />
      <Hero>
        <LogoSection>
          <Logo>✨</Logo>
          <Title>Lovable 2.0</Title>
          <Tagline>Next-Generation AI Web Builder</Tagline>
        </LogoSection>
        
        <Description>
          Craft exceptional web applications with cutting-edge AI technology. 
          Experience the future of development where creativity meets intelligence.
        </Description>

        <FeatureGrid>
          <Feature>
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>Instant Creation</FeatureTitle>
            <FeatureDescription>Transform ideas into reality in seconds with advanced AI</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>�</FeatureIcon>
            <FeatureTitle>Precision Design</FeatureTitle>
            <FeatureDescription>Pixel-perfect layouts with sophisticated design intelligence</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Future-Ready</FeatureTitle>
            <FeatureDescription>Built for tomorrow's web with modern architecture</FeatureDescription>
          </Feature>
        </FeatureGrid>

        <CTASection>
          <GetStartedButton onClick={onGetStarted}>
            Enter Lovable 2.0
          </GetStartedButton>
          <Subtitle>Where innovation meets elegance</Subtitle>
        </CTASection>
      </Hero>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.8s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.1) 0%, transparent 50%);
  opacity: 0.4;
`;

const Hero = styled.div`
  max-width: 1200px;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
`;

const LogoSection = styled.div`
  margin-bottom: 4rem;
`;

const Logo = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 300;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  opacity: 0.7;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const Description = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  opacity: 0.8;
  margin-bottom: 5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;
  color: #cccccc;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 5rem;
  max-width: 1000px;
  width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Feature = styled.div`
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  &:nth-child(1) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
  
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    transform: translateY(-8px);
    transition: all 0.4s ease;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  filter: grayscale(0.3);
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #ffffff;
  letter-spacing: 0.3px;
`;

const FeatureDescription = styled.p`
  opacity: 0.7;
  line-height: 1.6;
  font-weight: 300;
  color: #cccccc;
`;

const CTASection = styled.div`
  margin-top: 5rem;
`;

const GetStartedButton = styled(Button)`
  font-size: 1.1rem;
  padding: 1.2rem 3.5rem;
  height: auto;
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  border: none;
  border-radius: 8px;
  color: #000000;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
    background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const Subtitle = styled.p`
  margin-top: 1.5rem;
  opacity: 0.6;
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
