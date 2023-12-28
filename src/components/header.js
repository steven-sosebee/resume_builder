import { useState } from "react";
import { ICONS } from "../data/iconClasses";

export const Header = () => {
    const [expanded, setExpanded] = useState(false);

    const navLinks = {
      production: [
        {
          path:'/templates',
          text:'Resume Templates'
         }
      ],
      development:[
       {
        path:'/test',
        text:'Testing'
       },
       {
        path:'/templates',
        text:'Resume Templates'
       }
      ]}
      
    const expand =(e) => {
        setExpanded(!expanded);
    }
    
    const loseFocus = (e) => {
        // console.log('lost focus');
        if(expanded && !e.currentTarget.contains(e.relatedTarget)) {expand(e)};
    }
    return (
        <header onBlur={loseFocus}> {expanded? <button className="inline-margin block" onClick={expand}><i className={ICONS.close}></i></button> :
                    <button className="inline-margin block" onClick={expand}><i className={ICONS.action}></i></button>}
                        
            <nav className="base" >
                {expanded? 
                <ul className="floating block primary height-padding secondary">
                    
                    {navLinks[process.env.NODE_ENV].map(navLink => (
                        <li className="block inline-margin height-padding"><a href={navLink.path}>{navLink.text}</a></li>
                    ))}
                </ul> : <></>}
            </nav>
        </header>
    )
}