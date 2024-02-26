const prefix = "/v1/objects/";
export const ENDPOINTS = {

    // v1 endpoints:
    Resume: `${prefix}resumes`,
    Jobs:`${prefix}jobs`,
    Activities:`${prefix}activities`,
    Application: `${prefix}applications`,
    ApplicationResume:`${prefix}linkApplicationTemplate`,
    ApplicationQualifications: `${prefix}applicationQualifications`,
    Skill: `${prefix}skills`,
    SkillTypes: `${prefix}skillTypes`,
    SkillLevels: `${prefix}skillLevels`,
    QualificationActivities:`${prefix}qualificationActivity`,

    LinkActivityToJob:`/v1/links/jobActivity`,
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
    // Qualification: `${prefix}applications`,
    
    getQualification: "/qualification/read",
    getQualifications: "/application/getQualifications",
    createQualification: "/qualification/create",
    createQualifications: "/qualification/createMultiple",
    deleteQualification: "/qualification/delete",
    linkSkill:"/qualification/linkSkill",
    createQualActivity: "/qualification/createActivity",
    // getLinkedSkills:"/qualification/getLinkedSkills",
    
    // Skill Endpoints:
    
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