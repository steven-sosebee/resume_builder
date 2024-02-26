import logo from './logo.svg';
import './App.css';
import "./styles/index.css";
import { BrowserRouter as Router,Route,NavLink, Routes } from 'react-router-dom';
import { Header } from './components/header';
import { Content } from './components/content';
import { TestPage } from './pages/testing/testing';
import { ResumeTemplate } from './pages/resumeTemplate';
import { Crypto } from './pages/testing/crypto';
import { JobTemplate } from './pages/jobTemplate';
import { Templates } from './pages/templates';
import { FormTest } from './pages/testing/formTest';
import { PAGES } from './data/pages';
import { createRoutes } from './HOC/Router/router';

function App() {
  
  return (
    <Router>
      <Header/>
      <Content>
        <Routes>
        {createRoutes(PAGES)}
        {/* {PAGES.map((route) => (
          <Route path={route.path} element={route.element}/>
        ))} */}

      </Routes>
      </Content>    
    </Router>
  );
}

export default App;
