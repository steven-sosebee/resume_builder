import { useEffect, useState } from "react";
import { dbCall } from "../utils/api";

export const ApplicationList = () => {
    const [pageData, setData] = useState([]);
    
    const handleData = async () => {
        let data = {
            list: await dbCall({class:'GetApplicationData',action:'list'},{},{},'GET')
        }    
        setData(data);
    };
    useEffect(()=>{
        handleData();
    },[]);

    return (
        <section>
            {pageData?.list?.map(application => (
                <a href={`/application/${application.id}`}>{application.title} - {application.id}</a>
            ))}
        </section>
    )
}