import { useEffect, useState } from "react"
import { useArray } from "./useArray";
import { useSet } from "./useSet";

export const useList =() => {

    const [active, setActive] = useState(new Set());
    const [maxActive, setMaxActive] = useState(100);
    // const list = useArray();
    
    const activate = (item) => {
        if(active.has(item)){
            setActive(prev =>{ const current = new Set(prev); current.delete(item); return current});}
        else {
            if(active.size<maxActive){
                setActive(prev =>{ const current = new Set(prev); current.add(item); return current})
        }
        }
    };

    const UList = ({children, id}) => {
    return (
        <ul key={id}>
            {children}
        </ul>
    )}

    const OList = ({children}) => {
        return (
            <ol>
                {children}
            </ol>
        )}
    
    const ListItem = ({children, ...props})=> {

        return (
            <li>
                {children}
            </li>
        )
    }

    return {OList, UList, ListItem, activate, setActive, setMaxActive, active}
}