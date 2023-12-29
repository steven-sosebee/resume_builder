import { useState } from "react";
import { ICONS } from "../data/iconClasses";
import { PAGES, env } from "../data/pages";

export const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const environment = env[process.env.NODE_ENV];
      
    const expand =(e) => {
        setExpanded(!expanded);
    }

    const loseFocus = (e) => {
        if(expanded && !e.currentTarget.contains(e.relatedTarget)) {expand(e)};
    }

    return (
        <header onBlur={loseFocus}> {expanded? <button className="inline-margin block" onClick={expand}>{ICONS.close}</button> :
                    <button className="inline-margin block" onClick={expand}>{ICONS.action}</button>}
                        
            <nav className="base" >
                {expanded? 
                <ul className="floating block height-padding secondary">
                    
                    {PAGES.filter(page=>page.environment>=[environment] && page.type==0).map(navLink => (
                        <li className="block inline-margin height-padding"><a href={navLink.path}>{navLink.text}</a></li>
                    ))}
                </ul> : <></>}
            </nav>
        </header>
    )
}