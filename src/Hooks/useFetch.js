import { useEffect, useState } from "react";
import { isObjEmpty } from "../utils/utils";
// import { isObjEmpty } from "../utils/utils";
// import { useArray } from "./useArray";
// import { APIModels, APIActions} from "../data/models";

export const useFetch =() => {
    const defaultURL = process.env.REACT_APP_URL;
    const key = process.env.REACT_APP_KEY;

    const execute = async ({criteria=[], inputs={}, ordered=[], endpoint=defaultURL}) => {
        let post={};
        try{

            const query = {
                criteria:criteria,
                key:key,
                ordered:ordered
            };
            if (!isObjEmpty(inputs)){
                post.body = JSON.stringify(inputs);
                post.method = "POST";
            }

            if (!isObjEmpty(query)){
                const data_encode = btoa(JSON.stringify(query));                            
                endpoint = endpoint + "?q=" + data_encode;
            }
            if (String(endpoint).length>2047){
                return "message too long";
            }
            const res = await fetch(endpoint,post);
            const resJSON = await res.json();
            if(res.status !==200 || res.ok !==true){
                return {status: res.status};
            }
            return {data: resJSON.data, res: resJSON, status:res.status};            
        }
        catch(error){
            return error;
        }
    }
    // source https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
    const crypt = (salt, text) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
      
        return text
          .split("")
          .map(textToChars)
          .map(applySaltToChar)
          .map(byteHex)
          .join("");
      };
      
      const decrypt = (salt, encoded) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded
          .match(/.{1,2}/g)
          .map((hex) => parseInt(hex, 16))
          .map(applySaltToChar)
          .map((charCode) => String.fromCharCode(charCode))
          .join("");
      };

    return {execute}
    
}    

export const criterion = (field, operator, value) => {
    return {field: field, operator:operator, value:value};
}

export const orderBy = (field,ascending=true) => {
    const direction = ascending? '' : "DESC";
    return `${field} ${direction}`;
}
    
    
    
    
    
    
    
//     const MESSAGES = {
//         loading: <div>Data Loading</div>,
//         success: <div>Success...</div>,
//         failure: <div>An error occurred...</div>,
//         idle: <div>Waiting to initialize...</div>
//     };
//     const STATUS = {
//         null:0,
//         pending:100,
//         complete:200,
//         error:400
//     }
//     const data = useArray([]);
//     const [affectedRows,setAffectedRows] = useState();
//     // const [data, setData] = useState(null);
//     const [status, setStatus] = useState(MESSAGES.idle);
//     const [state, setState] = useState(STATUS.null);
//     const [loading, setLoading] = useState(false);
//     const [callParams,setCallParams] = useState({records:[],constraints:[],config:[]});
//     const defaultURL = process.env.REACT_APP_URL;
//     let params={};    
//     let url= null;

//     const loadingMessage = (
//         <div>Data loading...</div>
//     )

//     const clearData = () => {
//         data.setOutput([]);
//     }

//     const getData = () => {
//         return data.output;
//     }

//     // const setParams =($params) => {
//     //     const params = Object.keys($params).map(
            
//     //     )
//     //     setCallParams((current)=>())
//     // }

//     const constructCall = (searchParams={}) => {
//         url = defaultURL;
//         let searchQuery = new URLSearchParams();
//         searchParams.class = `${apiClass}`;
//         Object.entries(searchParams).forEach(([key,value])=>{    
//             searchQuery.append(key, value.toString())
//         });
//         url = url + searchQuery;
//     }

//     const executeCall = async () => {
//         setStatus(()=>null)
//         // console.log(params);
        
//         try{
//             const res = await fetch(url, params);
//             const resJSON = await res.json();
//             setState(res.status);
//             if(res.status !==200 || res.ok !==true){
//                 setStatus(()=>MESSAGES.failure)
//                 return
//             }
//             setStatus(()=>MESSAGES.success);
            
//             setAffectedRows(resJSON.data)
//         }
//         catch(error){
//             setStatus(()=>MESSAGES.failure);
//         }
//     };

//     const handleCall = async () => {
//         try{
//             const res = await fetch(url, params);
//             const resJSON = await res.json();
//             setState(res.status);
//             setLoading(false);
//             if(res.status !==200 || res.ok !==true){
//                 setStatus(()=>MESSAGES.failure)
//                 setState(res.status);
//                 data.setOutput(resJSON.data);
//                 return
//             }
//             setStatus(()=>MESSAGES.success);
            
//             data.setOutput(()=>resJSON.data);
//             // console.log(resJSON.data);
//             return resJSON.data;
//             // console.log(resJSON.data.output);
//         }
//         catch(error){
//             setLoading(false);
//             setStatus(()=>MESSAGES.failure);
//         }
//     };


//     const getRecords = async (body={},searchParams={}) =>{
//         params.body=JSON.stringify(body)
//         params.method = 'POST';
//         searchParams.action = APIActions.get;
//         setLoading(true);
//         constructCall(searchParams);
//         const res = await handleCall();
//         // console.log(res);
//         return res;
//     }

//     const insertRecords = async (body,searchParams={}) => {
//         params.body=JSON.stringify(body)
//         params.method = 'POST';
//         searchParams.action = APIActions.insert;
//         setLoading(true);
//         constructCall(searchParams) 
//         const res = await executeCall();
//     };   

//     const updateRecords = async (body,searchParams={}) => {
//         params.body=JSON.stringify(body)
//         params.method = 'POST';
//         searchParams.action = APIActions.insert;
//         setLoading(true);
//         constructCall(searchParams) 
//         const res = await executeCall();
//     }
//     const deleteRecords = async (body,searchParams={}) => {
//         params.body=JSON.stringify(body)
//         params.method = 'POST';
//         searchParams.action = APIActions.delete;
//         constructCall(searchParams);
//         const res = await executeCall();
//     };

//     const handleAPI = async (body,searchParams={}, action, returnType='data') => {
//         params.method = 'GET'
//         if(Object.keys(body).length>0){
//             params.method = 'POST';
//             params.body=JSON.stringify(body)
//         };
//         searchParams.action = action;
//         setLoading(true);
//         constructCall(searchParams) 
//         let res;
//         switch (returnType) {
//             case 'data': 
//                 res = await handleCall();
//                 break;
//             case 'affectedRows':
//                 setAffectedRows(()=>[]);
//                 res = await executeCall();
//                 break;
//             default:
//                 res = await handleCall();
//         };
//         return res;
//     }

//     return {
//         getRecords,insertRecords,deleteRecords,updateRecords, clearData, handleAPI, getData, setCallParams, 
//         callParams, affectedRows, data, status, state, loading, loadingMessage
//     }
// };  