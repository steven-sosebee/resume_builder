import { useState } from "react"

export const List = ({listItems}) => {
    const [active, setActive] = useState();

    const handleActive = (e) => {
        const target = e.target.key;
        console.log(target);
    }
    return (
        <ul>
            {listItems}
        </ul>        
    )
}