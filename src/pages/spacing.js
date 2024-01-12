import { useRef } from "react"

export const TextArea = () => {
    const text = useRef();

    const getText = (e)=> {
        const newText = text.current.value;
        console.log(newText.split("\n"));

    }
    return (
        <div>
            <textarea ref={text}/>
            <button onClick={getText}>Test</button>
        </div>
        
        )
}