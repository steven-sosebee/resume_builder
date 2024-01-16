import { Applications } from "../pages/applications"
import { ResumeTemplate } from '../pages/resumeTemplate';
import { Crypto } from '../pages/testing/crypto';
import { JobTemplate } from '../pages/jobTemplate';
import { Templates } from '../pages/templates';
import { FormTest } from '../pages/testing/formTest';
import { Application } from "../pages/application";
import { Skills } from "../pages/skills";
import { Skill } from "../pages/skill";
import { TestPage } from "../pages/testing/testing";

export const env = {
    abandoned:-1,
    development: 0,
    testing: 1,
    production: 2,
    live: 3
}

const componentType = {
    page:0,
    route:1
}

export const PAGES = [
    {
        path:'/',
        element:<h1>Welcome to the resume builder</h1>,
        text:"Home",
        environment: env.live,
        type:componentType.page
    },
    {
        path:'/testing',
        element:<TestPage/>,
        text:"Testing",
        environment: env.testing,
        type:componentType.page
    },
    {
        path:'/templates',
        element:<Templates/>,
        text:"Resume Templates",
        environment: env.live,
        type:componentType.page 
    },
    {
        path:'/template/:id',
        element:<ResumeTemplate/>,
        text:"",
        environment: env.live,
        type:componentType.route
    },
    {
        path:'/testing/crypto',
        element:<Crypto/>,
        text:"Crypto",
        environment: env.abandoned,
        type:componentType.page
    },
    {
        path:'/template/:id/:jobId',
        element:<JobTemplate/>,
        text:"",
        environment: env.live,
        type:componentType.route
    },
    {
        path: '/testing/form',
        element:<FormTest/>,
        text:"Test Form",
        environment: env.development,
        type:componentType.page
    },
    {
        path: '/applications',
        element:<Applications/>,
        text:"Applications",
        environment: env.production,
        type:componentType.page
    },
    {
        path:'/application/:id',
        element: <Application/>,
        text: "",
        environment: env.production,
        type:componentType.route
    },
    {
        path:"/skills",
        element:<Skills/>,
        text:"Skills",
        environment: env.production,
        type:componentType.page
    },
    {
        path:"/skill/:id",
        element:<Skill/>,
        text:"",
        environment:env.development,
        type:componentType.route
    }
]