import { Route, Routes } from "react-router-dom";

export const AppRouter =() => {
  
  const arrRoutes = [
    {
      path:'/',
      element:<a href='/resume'>Resume</a>
    },{
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
}
<Routes>
        {arrRoutes.map((route) => (
          <Route path={route.path} element={route.element}/>
        ))}
      </Routes>