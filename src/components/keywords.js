import { useEffect,useRef,useState, useCallback } from "react";
import { dbCall } from "../utils/api";
import { createFormObject } from "../utils/utils";

export const Keywords = ({applicationId}) => {
    const form = useRef();
    const submit = useRef();
    const [pageData, setData] = useState();
    
    
    const handleDelete = useCallback(async (e,keywordId)=> {
        const res = await dbCall({class:'DeleteKeywordData',action:'delete'},{id:keywordId},{},"DELETE");
        // console.log(res);
        if(res["rows deleted"]>0){
            console.log('removing to list...');
            setData({...pageData, list:[...pageData.list.filter(element => element.id !==keywordId)]})
        }
    })

    const handleLink = useCallback(async (e, keyword)=> {
        let res;
        const linked = pageData?.linked.some(link=> link.keywordId == keyword.id);
        console.log(linked);
        console.log(keyword);

        if (linked) {
            setData({...pageData, linked:[...pageData.linked.filter(element => element.keywordId !==keyword.id)]});
            res = await dbCall({class:'DeleteKeywordData', action:'unlink'},{applicationId: applicationId, keywordId:keyword.id},{},"DELETE")
        } else {
            res = await dbCall({class:'CreateKeywordData', action:'link'},{applicationId: applicationId, keywordId:keyword.id},{},"POST");
            setData({...pageData, linked:[...pageData.linked,{id: res['ID'][0],applicationId:applicationId,keywordId:keyword.id}]})
        }
    
        console.log(res);
        // console.log({applicationId,keywordId});
    },[pageData])
    
    const handleData = async () => {
        
        let data = {
            list: await dbCall({class:'GetKeywordData',action:'list'},{},{},'GET'),
            linked: await dbCall({class:'GetKeywordData', action: 'applicationKeywords',applicationId:applicationId},{},{},'GET')
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
        form.current.reset();
        console.log(res);
        if(res["rows inserted"]>0){
            console.log('adding to list...');
            setData({...pageData, list:[...pageData.list,{...formDataObj, id:res["ID"][0]}]})
        }
    }

    // useEffect(()=>{
    //     console.log('pageData effect')
    // },[pageData]);

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
                    <div key={keyword.id}>
                        <input onChange={(e)=>{handleLink(e,keyword)}}type="checkbox" checked={pageData?.linked.some(link=> link.keywordId == keyword.id)}></input><input name="delete" value="Delete" type="button" onClick={(e)=> {handleDelete(e, keyword.id)}}/>
                        <label>{keyword.keyword}</label></div>
                ))}
            </form>
        </section>
    )
}