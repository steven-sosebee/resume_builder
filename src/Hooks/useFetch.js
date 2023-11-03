import { useEffect, useState } from "react";
import { isObjEmpty } from "../utils/utils";
import { useArray } from "./useArray";

export const useFetch =(apiClass) => {
    const data = useArray([]);
    // const [data, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const defaultURL = process.env.REACT_APP_URL;
    let params={};    
    let url= null;

    const loadingMessage = (
        <div>Data loading...</div>
    )

    const MESSAGES = {
        loading: <div>Data Loading</div>,
        success: <div>Success...</div>,
        failure: <div>An error occurred...</div>
    };

    const clearData = () => {
        data.setOutput([]);
    }

    const getData = () => {
        return data;
    }

    const constructCall = (searchParams={}) => {
        
        url = defaultURL;
        let searchQuery = new URLSearchParams();
        searchParams.class = `${apiClass}`;
        Object.entries(searchParams).forEach(([key,value])=>{    
            searchQuery.append(key, value.toString())
        });
        url = url + searchQuery;
    }

    const executeCall = async () => {
        setStatus(()=>null)
        try{
            const res = await fetch(url, params);
            const resJSON = await res.json();
            if(res.status !==200 || res.ok !==true){
                setStatus(()=>MESSAGES.failure)
                return
            }
            setStatus(()=>MESSAGES.success);            
        }
        catch(error){
            setStatus(()=>MESSAGES.failure);
        }
    };

    const handleCall = async () => {
        try{
            const res = await fetch(url, params);
            const resJSON = await res.json();
            setLoading(false);
            if(res.status !==200 || res.ok !==true){
                setStatus(()=>MESSAGES.failure)
                return
            }
            setStatus(()=>MESSAGES.success);
            data.setOutput(resJSON.data.output);    
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
        params.method = 'GET';
        searchParams.action = 'list';
        setLoading(true);
        constructCall(searchParams);
        const res = await handleCall();
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
        setLoading(true);
        constructCall(searchParams);
        const res = await handleCall();
        // return res;
        // console.log(res);
        // setData(() => res);
    }

    const handleSubmit = async (body,searchParams={}) => {
        params.body=JSON.stringify(body)
        params.method = 'POST';
        searchParams.action = 'submit';
        setLoading(true);
        constructCall(searchParams) 
        const res = await handleCall();
    };   

    const handleDelete = async (body,searchParams={}) => {
        params.body=JSON.stringify(body)
        params.method = 'POST';
        searchParams.action = 'delete';
        console.log('delete', params);
        constructCall(searchParams);
        const res = await executeCall();
    };

    return {handleQuery, handleSelect, clearData, handleSubmit, handleDelete, getData, data, status, loading, loadingMessage}
};  