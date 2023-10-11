import { useEffect, useState } from "react";
import { isObjEmpty } from "../utils/utils";

export const useFetch =(apiClass) => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(null);
    const defaultURL = "/__index.php?";
    let params={};    
    let url= null;

    const loadingMessage = (
        <div>Data loading...</div>
    )

    const MESSAGES = {
        loading: <div>Data Loading</div>,
        success: <div>Success...</div>,
        failure: <div>An error occurrec...</div>
    };

    const ACTIONS = {
        delete: 'delete'
    }
    // const isObjEmpty=(obj)=>{
    //     return Object.keys(obj).length===0;
    // };


    const clearData = () => {
        setData([]);
    }

    const getData = () => {
        return data;
    }

    const constructCall = (searchParams={}) => {
        setLoading(true);
        url = defaultURL;
        let searchQuery = new URLSearchParams();
        searchParams.class = `${apiClass}`;
        Object.entries(searchParams).forEach(([key,value])=>{    
            searchQuery.append(key, value.toString())
        });
        url = url + searchQuery;
    }
    const handleCall = async () => {
        setData([]);
        try{
            const res = await fetch(url, params);
            const data = await res.json();
            // console.log(res);
            // console.log(data.data.output);
            setLoading(false);
            if(res.status !==200 || res.ok !==true){
                // console.log(res.status, res.ok);
                // console.log('an error occurred...');
                setStatus(()=>MESSAGES.failure)
                return
            }
            setStatus(()=>MESSAGES.success);
            setData(()=>data.data.output);
        }
        catch(error){
            setLoading(false);
            setStatus(()=>MESSAGES.failure);
        }
        
        // return await fetch(
        //     url,
        //     params
        // )
        //     .then(res=>res.json())
        //     .then(data=>{console.log(data); return data.data.output})
        //     .catch(error=>{return error})
    };

    const handleQuery = async (searchParams={}) =>{
        // setLoading('Loading...')
        // url = defaultURL;
        params.method = 'GET';
        // let searchQuery = new URLSearchParams();
        // searchParams.class = `${apiClass}`;
        searchParams.action = 'list';
        // Object.entries(searchParams).forEach(([key,value])=>{    
            // searchQuery.append(key, value.toString())
        // });
        // url = url + searchQuery;
        constructCall(searchParams);
        const res = await handleCall();
        // return res;
        // setData(() => res);
    }
    const handleSelect = async (searchParams={}) =>{
        // url = defaultURL;
        params.method = 'GET';
        // let searchQuery = new URLSearchParams();
        // searchParams.class = `${apiClass}`;
        searchParams.action = 'select';
        // Object.entries(searchParams).forEach(([key,value])=>{    
            // searchQuery.append(key, value.toString())
        // });
        // url = url + searchQuery;
        constructCall(searchParams);
        const res = await handleCall();
        // return res;
        // console.log(res);
        // setData(() => res);
    }

    const handleSubmit = async (body,searchParams={}) => {
        // url = defaultURL;
        
        // if (isObjEmpty(body)) {return}
        params.body=JSON.stringify(body)
        params.method = 'POST';
        // let searchQuery = new URLSearchParams();
        // searchParams.class = `${apiClass}`;
        searchParams.action = 'submit';
        // Object.entries(searchParams).forEach(([key,value])=>{    
        //     searchQuery.append(key, value.toString())
        // });
        // url = url + searchQuery;
        constructCall(searchParams) 
        const res = await handleCall();
        // setData(()=>res);
    };   

    const handleDelete = async (body,searchParams={}) => {
        // let searchQuery = new URLSearchParams();
        // url = defaultURL;
        // if (!isObjEmpty(body)) {return}
        params.body=JSON.stringify(body)
        params.method = 'POST';
        // searchParams.class = `${apiClass}`;
        searchParams.action = 'delete';
        // Object.entries(searchParams).forEach(([key,value])=>{    
        //     searchQuery.append(key, value.toString())
        // });
        console.log('delete')
        constructCall(searchParams);
        const res = await handleCall();
        // setData(()=>res);
    };

    return {handleQuery, handleSelect, clearData, handleSubmit, handleDelete, getData, data, status, loading, loadingMessage}
};