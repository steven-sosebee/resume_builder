import { useParams } from "react-router-dom"

const ENDPOINTS = {
    getApplication: "/application/read",
    getResumeTemplates: "/resume/read",
    linkTemplate: "/resume/link",
    unlinkTemplate: "/resume/unlink",
};

export const Application = () => {
    const {id} = useParams();
    return (
        <div>
            Application Details {id}
            <h3><span><a href="/applications">Back to applications...</a></span></h3>
            <select>
                <option>Manager</option>
                <option>Data Analyst</option>
            </select>
        </div>
    )
}