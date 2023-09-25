export const createFormObject =(form)=>{
    let createFormObject={};
    for(var pair of form.entries()){
        const obj = pair[0]+ ': '+ pair[1];
        createFormObject[pair[0]]=pair[1];
    };
    return createFormObject;
}