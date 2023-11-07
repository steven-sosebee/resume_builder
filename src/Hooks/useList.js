import { useEffect, useState } from "react"
import { useArray } from "./useArray";
import { useSet } from "./useSet";

export const useList =() => {
    const [active, setActive] = useState(new Set());
    const list = useArray();
    
    const activate = (item) => {
        active.has(item)?
            setActive(prev =>{ const current = new Set(prev); current.delete(item); return current}):
            setActive(prev =>{ const current = new Set(prev); current.add(item); return current})
    };

    const UList = ({children}) => {
    return (
        <ul>
            {children}
        </ul>
    )}

    const OList = ({children}) => {
        return (
            <ol>
                {children}
            </ol>
        )}

    return {OList, UList, activate, active, list}
}