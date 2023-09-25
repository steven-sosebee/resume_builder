import Model from ".";
import { dbCall } from "../utils/api";

export default class Resume extends Model {
    constructor() {
        super();
        this.class = 'Resume';
        this.header = {
            class: this.class
        };
    }
    
    async list(){
        const query = {
            class: 'getResumeData',
            action: 'list'
        }
        return dbCall(query, {}, {}, 'GET');
        
    }

    async select(id){
        const query = {
            id:id,
            class:'GetResumeData',
            action:'getData'
        };
        return dbCall(query,{} ,{},'GET',)
    }
}