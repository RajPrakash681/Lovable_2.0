import "./App.css";

import { Route, Routes } from "react-router-dom";

import CreateRoute from "./screens/Create";
import NewScreen from "./screens/New";
import HomeScreen from "./screens/Home";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <Container className="dark bg-background">
      {/* <Header /> */}
      <ContentContainer>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/new" element={<NewScreen />} />
          <Route path="/create" element={<CreateRoute />} />
        </Routes>
      </ContentContainer>
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #0a0a0a;
`;

const ContentContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow: auto;
  background: #0a0a0a;
`;
