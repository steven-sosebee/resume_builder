import { useCallback, useEffect,useRef,useState } from "react";
import { dbCall } from "../utils/api";
import { createFormObject } from "../utils/utils";

export const CoverLetterActions = (jobId) => {
    const form = useRef();
    const submit = useRef();
    const [pageData, setData] = useState();
    const handleDelete = useCallback(async (e,id)=> {
        const res = await dbCall({class:'DeleteCoverLetterData',action:'delete'},id,{},"DELETE");
        console.log(res);
        
    })
    const handleData = async () => {
        
        let data = {
            list: await dbCall({class:'GetCoverLetterData',action:'list'},{},{},'GET')
        }
        setData(data);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current, submit.current);
        const formDataObj=createFormObject(formData);        
        
        console.log(form.current);
        console.log(formData);
        console.log(formDataObj);

        const res = await dbCall(
            {
                class: 'CreateCoverLetterData',
                action: 'submit'
        },
            formDataObj,
            {},
            'POST'
        )
        console.log(res);
        if(res["rows inserted"]>0){
            console.log('adding to list...');
            setData({...pageData, list:[...pageData.list,{...formDataObj, id:res["ID"][0]}]})
        }
    }

    useEffect(()=>{
        handleData()
    },[])
    console.log(pageData);
    return (

        <section>
            <form ref={form} onSubmit={handleSubmit}>
                <label>Topic:</label><input name="topic" datatype="text"></input>
                <label>Type:</label><input name="type" datatype="text"></input>
                <label>Segment:</label><input name="segment" datatype="memo"></input>
                <button ref={submit} onClick={handleSubmit}>Submit</button>
            </form>
            <form>
                {pageData?.list.map(segment => (
                    <div key={segment.id}><input type="checkbox"></input><input name="delete" type="button" onClick={()=> {handleDelete(segment.id)}}>X</input><label>{segment.segment}</label></div>
                ))}
            </form>
        </section>
    )
}