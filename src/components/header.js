import { useEffect, useRef, useState } from "react";
import { ICONS } from "../data/iconClasses";
import { PAGES, env } from "../data/pages";
import { Menu } from "../HOC/Menu/menu";
import { click } from "@testing-library/user-event/dist/click";

export const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const environment = env[process.env.NODE_ENV];
    const headerRef = useRef(null);
    const expand =() => {
        setExpanded(!expanded);
    }

    const loseFocus = (e) => {
        console.log('click')
        if(expanded && !headerRef.current.contains(e.target)) {
            expand()
        };
    }

    useEffect( (e)=>{    
        document.addEventListener('click', loseFocus);
        
        return ()=> {
            document.removeEventListener('click',loseFocus);
        }
    },[])

    return (
        <header className={"secondary o-hidden"} ref={headerRef} onBlur={loseFocus} onClick={loseFocus}> 
        {expanded? 
            <>
            <button className="height-spacing inline-margin block" onClick={expand}>{ICONS.close}</button>
            <Menu links={PAGES.filter(page=>page.environment>=[environment] && page.type!=1)}/> 
            </>:
            <button className="height-spacing inline-margin block" onClick={expand}>{ICONS.action}</button>
        }
        
        </header>
    )
}