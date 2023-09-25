import { dbCall } from "../utils/api";

export default class Model {
    constructor(){};

    async apiCall(url) {
        return dbCall({},this.header, "GET");
    }
}