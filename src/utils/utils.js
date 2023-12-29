export const createFormObject =(form)=>{
    let createFormObject={};
    for(var pair of form.entries()){
        const obj = pair[0]+ ': '+ pair[1];
        createFormObject[pair[0]]=pair[1];
    };
    return createFormObject;
}

export const isObjEmpty=(obj)=>{
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }
    
      return true;
};

export const groupBy = (array, field, obj) => {
    if(!Array.isArray(array)){console.log('not array'); return}
    array.forEach(element => {
        // if(!obj[element[field]]){
        if(!(element[field] in obj))
            obj[element[field]]=[];
        obj[element[field]].push(element);
    })
}

