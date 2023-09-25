export const dbCall = async (searchParams={}, body={}, headers, method, url)=>{
    const defaultURL = "/__index.php?";
    let params={headers};    
    let searchQuery = new URLSearchParams();

    const isObjEmpty=(obj)=>{
        return Object.keys(obj).length===0;
    };

    Object.entries(searchParams).forEach(([key,value])=>{
        
        searchQuery.append(key, value.toString())
    });

    if(!url) {url = defaultURL};
    
    url = url + searchQuery;

    if (!isObjEmpty(body)) {params.body=JSON.stringify(body)}

    params.method = method;

    return fetch(
        url,
        params
    )
    .then(res=>res.json())
    .then(data=>{console.log(data); return data.data.output})
    .catch(error=>{return error})
};
