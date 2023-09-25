import logo from './logo.svg';
import './App.css';
import { dbCall } from './utils/api';
import Resume from './classes/resume';
import { NewResume } from './components/resumeNew';
import { BrowserRouter as Router,Route,NavLink, Routes } from 'react-router-dom';
import { ResumeComponent } from './components/resume';
import { NewApplication } from './pages/newApplication';
import { ApplicationPage } from './pages/application';
import { ApplicationList } from './pages/applicationList';
import { Header } from './components/header';

function App() {
  const api = async () => {
    console.log('api call start');
    const a = await new Resume().list();
    console.log(a);
}

const arrRoutes = [
  {
    path: '/resume',
    element: <ResumeComponent/>
  },
  {
    path: 'resume/:id',
    element: <ResumeComponent/>
  },
  {
    path: '/resume/new',
    element: <NewResume/>
  },
  {
    path: '/application/new',
    element: <NewApplication/>
  },
  {
    path:'/application/:id',
    element:<ApplicationPage/>
  },
  {
    path:'/application/list',
    element:<ApplicationList/>
  }
]
  return (
    <Router>
      <Header/>
      <Routes>
        {arrRoutes.map((route) => (
          <Route path={route.path} element={route.element}/>
        ))}
      </Routes>    
    </Router>
  );
}

export default App;
