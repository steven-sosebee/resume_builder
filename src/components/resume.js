import { useParams } from "react-router-dom"
import { dbCall } from "../utils/api";
import { useEffect, useState } from "react";
import Resume from "../classes/resume";

export const ResumeComponent = ({props}) => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    let [data, setData] = useState();
    const handleData = async () => {
    if(typeof id !=='undefined'){

        let data = {
            list: await new Resume().list(),
            resume: (typeof id !==' undefined')?
                 await new Resume().select(id) :
                {}
        }
        console.log(data);
        setData(data);
        setLoading(true);
    }}
    
    useEffect(()=>{
        handleData();
    },[])
    function Header (){
        if (typeof id === 'undefined') { return (<h1>Choose a Resume</h1>)}
        if (!loading) {return (<h1>Loading</h1>)}
    }
    
    return (
        <section>
            <Header/>
            <h1>{data?.resume?.resume[0]?.resumeTitle}</h1>
            <form>
                {data?.list.map((resume) => (
                    <button formAction={`/resume/${resume.id}`}>{resume.resumeTitle}</button>
                ))}
                <button formAction="/resume/new">Create New</button>
            </form>
        </section>

    )
}