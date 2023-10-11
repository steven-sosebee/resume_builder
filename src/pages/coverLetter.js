import { useRef, useState } from "react"

export const CoverLetter =({props}) => {
    const description = useRef();
    const [words, setWords] = useState();

    const readInput = () => {
        // console.log(description.current.value);
        const input = description.current.value
        input.replace(/[^a-zA-Z ]/g, "");
        
        const inputArray = input.split(" ");
        const inputSet = new Set(inputArray);
        const outputArray = [...inputSet].map(key => ({key:key, count:input.match(new RegExp(key,'g')).length}));
        outputArray.sort((a,b)=>b.count-a.count);
        // console.log(inputSet);
        // console.log(input.match(/to/g));
        console.log(outputArray);
    }
    const handleSubmit = (e) => {

    }

    return (
        <>
        <form onSubmit={(e)=>e.preventDefault()}>
            <label>Job Description</label>
            <textarea ref={description} name="description"/>
            <button onClick={readInput}>Read</button>
        </form>
        <form onSubmit={handleSubmit}>
            <label>Cover Letter Text</label><textarea name={"coverLetter"} rows={20}/>
            <input type={"submit"} value={"Submit"}/>
        </form>
        </>
    )
}