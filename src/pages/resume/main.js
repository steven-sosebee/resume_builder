import { useFetch } from "../../Hooks/useFetch"

export const Resume = () => {
    const resumeData = useFetch('ResumeData');
    const {resume, jobs} = resumeData.data.output;
    const resumeData = {
        resume: {
            summary:''
        },
        Skills: {
            management:[
                'Team and Organizational Leadership',
                'Performance Metrics',
                'KPI/KRI Escalation Management',
                'People and Performance Management',
                'Process Ownership'
            ],
            operations: [
                'Descriptive, Diagnostic and Predictive Data Analytics',
                'Process Design and Improvement',
                'Documentation',
                'Business Analysis',
                'Data Visualization'
            ],
            solutions: [
                'Application Development',
                'Creative Problem Solving',
                'Full Stack Programming',
                'Project Leadership',
                'Database Design and Maintenance',
                'Workflow Design'

            ]
        },
        Jobs: {

        }
    }
}