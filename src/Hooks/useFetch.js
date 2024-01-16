import { useEffect, useState } from "react";
import { isObjEmpty } from "../utils/utils";
// import { isObjEmpty } from "../utils/utils";
// import { useArray } from "./useArray";
// import { APIModels, APIActions} from "../data/models";

const defaultURL = process.env.REACT_APP_URL;
const key = process.env.REACT_APP_KEY;
const apiPrefix = (process.env.NODE_ENV=="production")? "/api" : "";
const apiFile = ".php";
const apiSuffix = ".php";

export const useFetch =() => {

    const STATE = {
        uninitiated: 0,
        loading: 1,
        finished:2
    }
    const [loading, setLoading] = useState(STATE.uninitiated);

    const apiCall = async (endpoint,queryParams=null,options) => {
        queryParams?
            endpoint = apiPrefix + endpoint + apiSuffix + "?" + queryParams :
            endpoint = apiPrefix + endpoint + apiSuffix;

        try{
            if (String(endpoint).length>2047){
                return "message too long";
            }

        const res = await fetch(endpoint,options);
        const resJSON = await res.json();

        if(res.status !==200 || res.ok !==true){
            return {status: res.status};
        }
        const e = String(resJSON.data).startsWith("SQLSTATE");

        if(e) {throw Error(resJSON.data)};
        return {data: resJSON.data, res: resJSON, status:res.status};            
        }
        catch(error){
            console.log(error);
            window.alert(error);
            return {status: 500};
        }
    };

    const apiContructQuery = (queryParams, complexQuery) => {
        if (complexQuery){
            queryParams = encodeURL(queryParams);
            queryParams = `q=${queryParams}`;

        } else {
            // console.log(queryParams);
            queryParams = URLQuery(queryParams);
        }
        return queryParams;
    }

    const apiGet = async ({endpoint,filterCriteria=[],complexQuery}) => {
        const queryParams = apiContructQuery(filterCriteria,complexQuery);
        const options = {
            method:'GET'
        }

        const api = await apiCall(endpoint,queryParams,options);
        return api;
    };

    const apiDelete = async ({endpoint, filterCriteria, complexQuery}) => {
        console.log(filterCriteria);
        const queryParams = apiContructQuery(filterCriteria,complexQuery);
        const options = {
            method:'DELETE'
        }
        console.log(queryParams);
        const api = await apiCall(endpoint,queryParams,options);
        return api;
    };

    const apiInsert = async ({endpoint, newValues=[], headers={}}) => {
        // const queryParams = apiContructQuery(filterCriteria,complexQuery);
        const multiAdd = (newValues.length>1);
        headers.multiAdd = multiAdd;
        newValues = JSON.stringify(newValues);
        const options = {
            method:'POST',
            body:newValues,
            headers:headers
        }
        
        const api = await apiCall(endpoint,null,options);
        return api;
    }
    

    const apiLink = async (endpoint, childRecord, parentRecord) => {

    }

    const apiUpdate = async ({endpoint, filterCriteria, newValues=[], complexQuery}) => {
        const queryParams = apiContructQuery(filterCriteria,complexQuery);
        newValues = JSON.stringify(newValues);
        const options = {
            method:'PATCH',
            body:newValues
        }
        console.log(queryParams);
        const api = await apiCall(endpoint,queryParams,options);
        return api;
    }

    const execute = async ({criteria=[], encode= false, searchParams=[], inputs={}, ordered=[], method, headers=[], endpoint=defaultURL}) => {
        let options={method:method};

        try{
            // add the filter criteria to endpoint as raw data or encoded data;
            endpoint = endpoint + apiFile;

            endpoint = craftURL(encode, searchParams,criteria, ordered, endpoint);
            // create the options object by adding headers, body, etc.
            options = craftBody(inputs, options, method, headers);           
            console.log(endpoint);

            if (String(endpoint).length>2047){
                return "message too long";
            }

            const res = await fetch(endpoint,options);
            const resJSON = await res.json();
            // const resJSON = await res.text();
    
            if(res.status !==200 || res.ok !==true){
                return {status: res.status};
            }
            const e = String(resJSON.data).startsWith("SQLSTATE");

            if(e) {throw Error(resJSON.data)};
            return {data: resJSON.data, res: resJSON, status:res.status};            
        }
        catch(error){
            console.log(error);
            window.alert(error);
            return {status: 500};
        }
    }

    // const execute ="Delete";

    return {
        execute,
        apiDelete,
        apiGet,
        apiInsert,
        apiUpdate, 
        apiLink};
    
}    

export const criterion = (field, operator, value) => {
    return {field: field, operator:operator, value:value};
}

export const orderBy = (field,ascending=true) => {
    const direction = ascending? '' : "DESC";
    return `${field} ${direction}`;
}

export const URLQuery = (params) => {
    // const q = params.join("&");
    const query = new URLSearchParams(params);
    return query.toString();

}

const craftBody = (inputs, options, method) => {
    if (!isObjEmpty(inputs)){
        options.body = JSON.stringify(inputs);
        method? options.method = method : options.method = "POST";
    }
    return options;
}

const encodeURL = (filter) => {
    return btoa(JSON.stringify(filter));
};

const craftURL = (encode, searchParams,criteria, ordered, endpoint) => {
    if (encode) {
        const query = {
            criteria:criteria,
            key:key,
            ordered:ordered
        };
        const data_encode = btoa(JSON.stringify(query));                            
        endpoint = apiPrefix + endpoint + "?q=" + data_encode;
    }
    else {
        if(searchParams.length==0){return endpoint};
        // endpoint = endpoint + "?"+ searchParams;
        endpoint = endpoint + "?"+ URLQuery(searchParams);
    }
    
    return endpoint
}
    
    
// source https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
// const crypt = (salt, text) => {
//     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
//     const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
//     const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    
//     return text
//         .split("")
//         .map(textToChars)
//         .map(applySaltToChar)
//         .map(byteHex)
//         .join("");
// };
    
//     const decrypt = (salt, encoded) => {
//     const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
//     const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
//     return encoded
//         .match(/.{1,2}/g)
//         .map((hex) => parseInt(hex, 16))
//         .map(applySaltToChar)
//         .map((charCode) => String.fromCharCode(charCode))
//         .join("");
// };