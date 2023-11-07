import { useState } from "react"

export const useSet = () => {
    // const [sets, setSet] = useState(new Set());
    const data = new Set();
    
    const add = (item) => {
        // console.log(item);

        // setSet(current => new Set(current.add(item)));
        console.log(sets);
    }
    
    const remove = (item) => {
        // setSet(current => new Set(current.delete(item)));
        console.log(sets);
    }

    const contains = (item) => {
        console.log(sets.has(item));
        return sets.has(item);
    }
    return {add, remove, contains, sets};
}