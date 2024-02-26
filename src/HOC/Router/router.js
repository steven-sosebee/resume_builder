import { BrowserRouter as Router,Route,NavLink, Routes } from 'react-router-dom';

export const createRoutes = (routeArray, URL="") => {
    console.log(routeArray);
    console.log(URL)
    const routes = routeArray.map(({type, baseURL, path, links, element})=>(
        type==2?
            createRoutes (links, baseURL) :
        <Route path={`${URL}/${path}`} element={element}/>
    ))
    return [...routes]
    }