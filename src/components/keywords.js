import { useEffect,useRef,useState } from "react";
import { dbCall } from "../utils/api";
import { createFormObject } from "../utils/utils";

export const Keywords = (jobId) => {
    const form = useRef();
    const submit = useRef();
    const [pageData, setData] = useState();

    const handleData = async () => {
        
        let data = {
            list: await dbCall({class:'GetKeywordData',action:'list'},{},{},'GET')
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
                class: 'CreateKeywordData',
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
                <label>New Keyword:</label><input name="keyword" datatype="text"></input>
                <label>Type:</label><input name="type" datatype="text"></input>
                <button ref={submit} onClick={handleSubmit}>Submit</button>
            </form>
            <form>
                {pageData?.list.map(keyword => (
                    <div><label>{keyword.keyword}</label><input type="checkbox"></input></div>
                ))}
            </form>
        </section>
    )
}