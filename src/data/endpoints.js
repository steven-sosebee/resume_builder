export const ENDPOINTS = {

    // Resume Endpoints:
    getResume: "/resume/read",
    linkJob: "/resume/addjob",
    createResume: "/resume/create",
    deleteResume: "/resume/delete",
    updateResume: "/resume/update",
    

    // Job Endpoints:
    getTemplateJobs: "/job/read",
    createJob: "/job/create",
    deleteJob: "/job/delete",
    updateJob: "/job/update",
    getJobs:"/job/getresumejobs",

    // Activity Endpoints:
    getJobActivities: "/activity/read",
    activityLinkSkill: "/activity/linkSkill",
    // Application Endpoints:
    getApplication: "/application/read",
    linkTemplate: "/application/createresume",
    updateApplication: "/application/update",
    testing:"/application/singleinput",
    addApplication: "/application/create",
    deleteApplication: "/application/delete",

    // Qualification Endpoints:
    getQualification: "/qualification/read",
    getQualifications: "/application/getQualifications",
    createQualification: "/qualification/create",
    createQualifications: "/qualification/createMultiple",
    deleteQualification: "/qualification/delete",
    linkSkill:"/qualification/linkSkill",
    // getLinkedSkills:"/qualification/getLinkedSkills",
    
    // Skill Endpoints:
    getSkills:"/skill/read",
    createSkill:"/skill/create",
    deleteSkill:"/skill/delete",
    getSkillTypes:"/skill/getTypes",
    getSkillLevels:"/skill/getLevels"   
    
};