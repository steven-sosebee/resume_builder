import { useCallback, useEffect,useRef,useState } from "react";
import { dbCall } from "../utils/api";
import { createFormObject } from "../utils/utils";

export const CoverLetterActions = (jobId) => {
    const form = useRef();
    const submit = useRef();
    const [pageData, setData] = useState();
    const handleDelete = useCallback(async (e,id)=> {
        const res = await dbCall({class:'DeleteCoverLetterData',action:'delete'},{id:id},{},"DELETE");
        // console.log(res);
        if(res["rows deleted"]>0){
            console.log('removing to list...');
            setData({...pageData, list:[...pageData.list.filter(element => element.id !==id)]})
        }
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
                <label>Segment:</label><textarea name="segment" rows={5} autoCorrect="true"></textarea>
                <button ref={submit} onClick={handleSubmit}>Submit</button>
            </form>
            <form>
                {pageData?.list.map(segment => (
                    <div key={segment.id}><input type="checkbox"></input><input name="delete" value="Delete" type="button" onClick={(e)=> {handleDelete(e, segment.id)}}/><label>{segment.segment}</label></div>
                ))}
            </form>
        </section>
    )
}