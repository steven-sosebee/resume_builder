const prefix = "/v1/objects/";
export const ENDPOINTS = {

    // Resume Endpoints:
    Resume: `${prefix}resumes`,
    getResume: "/resume/read",
    linkJob: "/resume/addjob",
    createResume: "/resume/create",
    deleteResume: "/resume/delete",
    updateResume: "/resume/update",
    

    // Job Endpoints:
    Jobs:`${prefix}jobs`,
    getTemplateJobs: "/job/read",
    createJob: "/job/create",
    deleteJob: "/job/delete",
    updateJob: "/job/update",
    getJobs:"/job/getresumejobs",

    // Activity Endpoints:
    getJobActivities: "/activity/read",
    activityLinkSkill: "/activity/linkSkill",
    // Application Endpoints:
    Application: `${prefix}applications`,
    getApplication: "/application/read",
    linkTemplate: "/application/createresume",
    updateApplication: "/application/update",
    testing:"/application/singleinput",
    addApplication: "/application/create",
    deleteApplication: "/application/delete",

    // Qualification Endpoints:
    // Qualification: `${prefix}applications`,
    ApplicationQualifications: `${prefix}applicationQualifications`,
    getQualification: "/qualification/read",
    getQualifications: "/application/getQualifications",
    createQualification: "/qualification/create",
    createQualifications: "/qualification/createMultiple",
    deleteQualification: "/qualification/delete",
    linkSkill:"/qualification/linkSkill",
    createQualActivity: "/qualification/createActivity",
    // getLinkedSkills:"/qualification/getLinkedSkills",
    
    // Skill Endpoints:
    Skill: `${prefix}skills`,
    SkillTypes: `${prefix}skillTypes`,
    SkillLevels: `${prefix}skillLevels`,
    getSkills:"/skill/read",
    createSkill:"/skill/create",
    deleteSkill:"/skill/delete",
    getSkillTypes:"/skill/getTypes",
    getSkillLevels:"/skill/getLevels"   
    
};

export const OPERATORS = {
    equal: "eq",
    greaterThan:"gt",
    lessThan: "lt",
    equalOrGreater: "gte",
    equalOrLater: "lte"
}