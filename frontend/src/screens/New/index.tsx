import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Generate UUID v4
const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const NewScreen: React.FC = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    if (input.trim()) {
      const sessionId = generateUUID();
      navigate(`/create?session_id=${sessionId}`, {
        state: { initialPrompt: input, session_id: sessionId },
      });
    }
  };

  return (
    <>
      <Header />
      <Outer className="flex flex-row items-center flex-1">
        <CenterColumn className="flex flex-col gap-16 flex-1">
        <LogoTitleGroup className="flex flex-col gap-2">
          <LogoEmoji>✨</LogoEmoji>
          <h1 className="text-4xl font-light">Lovable 2.0</h1>
          <WelcomeMessage className="text-lg font-medium">Welcome back. Let's create something extraordinary.</WelcomeMessage>
          <h2 className="text-2xl font-light">What would you like to build?</h2>
          <p className="text-lg font-light opacity-70">
            Describe your vision and watch it transform into reality with advanced AI.
          </p>
        </LogoTitleGroup>
        <PromptCard>
          <TextareaWrapper>
            <PaperclipIcon />
            <Textarea
              rows={3}
              placeholder="e.g., A modern e-commerce website with shopping cart, user authentication, and payment processing..."
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInput(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleStartBuilding();
                }
              }}
            />
            <RunButton>
              <GenerateButton onClick={handleStartBuilding}>Create with AI</GenerateButton>
            </RunButton>
          </TextareaWrapper>
        </PromptCard>
      </CenterColumn>
    </Outer>
    </>
  );
};

export default NewScreen;

const Outer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 60px; /* Account for fixed header */
  background: #0a0a0a;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(255, 119, 198, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const CenterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: 100vw;
  position: relative;
  z-index: 1;
  color: white;
`;

const LogoTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0px;
`;

const LogoEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
`;

const WelcomeMessage = styled.div`
  color: #ffffff;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
`;

const PromptCard = styled.div`
  border-radius: 16px;
  padding: 0px 0px 0px 0px;
  height: 150px;
  width: 100%;
  max-width: 700px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TextareaWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 90px;
  display: flex;
  align-items: stretch;
`;

const PaperclipIcon = styled.div`
  position: absolute;
  left: 14px;
  bottom: 16px;
  z-index: 2;
  font-size: 20px;
`;

const RunButton = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
`;

const GenerateButton = styled.button`
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  color: #000000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
    transform: translateY(-1px);
  }
`;
