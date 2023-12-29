import logo from './logo.svg';
import './App.css';
import "./styles/index.css";
// import { dbCall } from '../_DELETE/api';
// import Resume from './classes/resume';
// import { NewResume } from '../_DELETE/resumeNew';
import { BrowserRouter as Router,Route,NavLink, Routes } from 'react-router-dom';
// import { ResumeComponent } from './components/resume';
// import { NewApplication } from '../_DELETE/newApplication';
// import { ApplicationPage } from '../_DELETE/application';
// import { ApplicationList } from '../_DELETE/applicationList';
import { Header } from './components/header';
// import { CoverLetter } from '../_DELETE/coverLetter';
import { Content } from './components/content';
// import { Test } from '../_DELETE/delete_testing';
// import { Main } from './pages/main/main';
// import { ResumePage } from './pages/resume/resumePage';
import { TestPage } from './pages/testing/testing';
// import { ResumeTemplate } from './pages/resumeTemplate/resumeTemplate';
import { ResumeTemplate } from './pages/resumeTemplate';
import { Crypto } from './pages/testing/crypto';
import { JobTemplate } from './pages/jobTemplate';
import { Templates } from './pages/templates';
import { FormTest } from './pages/testing/formTest';
import { PAGES } from './data/pages';

function App() {
  
  // const arrRoutes = [
  //   {
  //     path:'/',
  //     element:<h1>Welcome to the resume builder</h1>
  //   },
  //   // {
  //   //   path: '/resume',
  //   //   element: <ResumeComponent/>
  //   // },
  //   // {
  //   //   path: 'resume/:id',
  //   //   element: <ResumeComponent/>
  //   // },
  //   // {
  //   //   path: '/resume/new',
  //   //   element: <NewResume/>
  //   // },
  //   // {
  //   //   path: '/application/new',
  //   //   element: <NewApplication/>
  //   // },
  //   // {
  //   //   path:'/application/:id',
  //   //   element:<ApplicationPage/>
  //   // },
  //   // {
  //   //   path:'/application/list',
  //   //   element:<ApplicationList/>
  //   // },
  //   // {
  //   //   path:'/coverletter/new',
  //   //   element:<CoverLetter/>
  //   // },
  //   // {
  //   //   path:'/test',
  //   //   element:<TestPage/>
  //   // },
  //   // {
  //   //   path:'/main',
  //   //   element:<Main/>
  //   // },
  //   // {
  //   //   path:'/application/:applicationId/resume/edit',
  //   //   element:<ResumePage/>
  //   // },
  //   // {
  //   //   path:'/resume/template',
  //   //   element:<ResumeTemplate/>
  //   // },
  //   {
  //     path:'/templates',
  //     element:<Templates/>
  //   },
  //   {
  //     path:'/template/:id',
  //     element:<ResumeTemplate/>
  //   },
  //   {
  //     path:'/testing/crypto',
  //     element:<Crypto/>
  //   },
  //   {
  //     path:'/template/:id/:jobId',
  //     element:<JobTemplate/>
  //   },
  //   {
  //     path: '/testing/form',
  //     element:<FormTest/>
  //   }
  // ]

  return (
    <Router>
      <Header/>
      <Content>
        <Routes>
        {PAGES.map((route) => (
          <Route path={route.path} element={route.element}/>
        ))}
      </Routes>
      </Content>    
    </Router>
  );
}

export default App;
