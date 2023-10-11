import {isObjEmpty} from "../utils/utils";

export class ApiCall {

    constructor(dbClass){
        this.defaulturl = "/__index.php?";
        this.defaultSearchParams = {class:dbClass};
        this.params = {};
        this.searchQuery = new URLSearchParams();
        this.data = null;
    };
    
    destructURL(){
        this.url=null;
        this.searchParams={};
    }

    async call () {
        // this.params={...params};
        
        this.constructURL(this.searchParams);
        
        console.log(this.url, this.params);
        try {
            const res = await fetch(
            this.url,
            this.params
            )
            const data = await res.json();
            console.log(data);
            this.data = data.data.output;
        } catch(error){
            this.data=error;
        }
        // .then(res=>res.json())
        // .then(data=>{console.log(data); return data.data.output})
        // .catch(error=> {return error})
    };
    
    constructURL (params={}) {
        Object.entries(params).forEach(([key,value])=>{
            this.searchQuery.append(key, value.toString())
        });
        this.url = this.defaulturl + this.searchQuery;
        
    }

    async query(params){
        this.destructURL();
        this.params={...params};
        this.params.method = 'GET';
        this.searchParams.action = 'list';
        this.searchParams.class = `Get${this.defaultSearchParams.class}`;
        await this.call();
    }

    delete(params={}, body={}){
        this.destructURL();
        this.params={...params};
        this.params.method = 'POST';
        if (!isObjEmpty(body)) {this.params.body=JSON.stringify(body)}
        // this.params.body = body;
        this.searchParams.action = 'delete';
        this.searchParams.class = `Delete${this.defaultSearchParams.class}`;
        this.call();
    }

    submit(params={}, body={}){
        this.destructURL();
        this.params.method = 'POST';
        this.searchParams.action = 'submit';
        this.searchParams.class = `Create${this.defaultSearchParams.class}`;
        this.call(params);
    }

    update(params={},body={}){
        this.destructURL();
        this.params={...params};
        this.params.method = 'POST';
        if (!isObjEmpty(body)) {this.params.body=JSON.stringify(body)}
        this.searchParams.action = 'update';
        this.searchParams.class = `Create${this.defaultSearchParams.class}`;
        this.call(params);
    }
};