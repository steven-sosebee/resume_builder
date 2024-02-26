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
import { ResumeBuilder } from "../pages/ResumeBuilder";
import { ApplicationResume } from "../pages/applicationResume";
import { CSSTesting } from "../pages/testing/cssTesting";
import { ResumeList } from "../pages/resumes";


export const env = {
    abandoned:-1,
    development: 0,
    testing: 1,
    production: 2,
    live: 3
}

const componentType = {
    page:0,
    route:1,
    group:2
}

export const PAGES = [
    {
        path:'/',
        element:<h1>Welcome to the resume builder</h1>,
        text:"Home",
        environment: env.live,
        type:componentType.route
    },
    {
        text:"Testing Group",
        environment:env.testing,
        type:componentType.group,
        baseURL:"testing",
        links:[
            {
                path:'page',
                element:<TestPage/>,
                text:"Testing",
                environment: env.testing,
                type:componentType.page
            },
            {
                path: 'form',
                element:<FormTest/>,
                text:"Test Form",
                environment: env.development,
                type:componentType.page
            },
            {
                path:"css",
                element:<CSSTesting/>,
                text:"CSS testing",
                environment:env.development,
                type:componentType.page
            },
            {
                path:'crypto',
                element:<Crypto/>,
                text:"Crypto",
                environment: env.abandoned,
                type:componentType.page
            },
        ]
    },
    {
        text:"Resumes",
        environment:env.testing,
        type:componentType.group,
        baseURL:"resume",
        links:[
            {
                path:"builder",
                element:<ResumeBuilder/>,
                text:"Resume Builder",
                environment:env.development,
                type:componentType.page
            },
            {
                path:"list",
                element:<ResumeList/>,
                text:"Resume List",
                environment:env.development,
                type:componentType.page
            },
            {
                path:":uuid",
                element:<ApplicationResume/>,
                text:"",
                environment:env.development,
                type:componentType.route
            },
            {
                text:"Templates",
                environment:env.testing,
                type:componentType.group,
                baseURL:"templates",
                links:[
                    {
                        path:'list',
                        element:<Templates/>,
                        text:"All Templates",
                        environment: env.live,
                        type:componentType.page 
                    },
                    {
                        path:':id',
                        element:<ResumeTemplate/>,
                        text:"",
                        environment: env.live,
                        type:componentType.route
                    },
                ]
            }
        ]
    },
    {
        text:"Applications",
        environment:env.testing,
        type:componentType.group,
        baseURL:"applications",
        links:[
            {
                path: 'list',
                element:<Applications/>,
                text:"List",
                environment: env.production,
                type:componentType.page
            },
            {
                path:':id',
                element: <Application/>,
                text: "",
                environment: env.production,
                type:componentType.route
            },
        ]
    },
    
    {
        path:'/job/:id',
        element:<JobTemplate/>,
        text:"",
        environment: env.live,
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
    },
    
    
]