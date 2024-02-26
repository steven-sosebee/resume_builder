import { useState } from "react"
import { STYLES } from "../../data/styleClasses";
import "./menu.css"

export const Menu = ({links}) => {

    const MenuLink = ({condition, wrapper, children}) => {
        return condition? wrapper(children) : children
    }

    const MenuItem = ({item, root}) => {
        const [expanded, setExpanded] =useState(false);
        const [header, setHeader] = useState(Array.isArray(item.links))
        const menuURL = (`/${root}/${item.path}`);
        console.log(root);
        console.log(menuURL);
        console.log()
        return (
            <li>
                <MenuLink condition={item.path} wrapper={children=><a href={menuURL}>{children}</a>}>
                <span 
                    className={`${STYLES.menuItem} ${header? 'header' : null} ${expanded? 'expanded' : 'closed'}` } 
                    onClick={()=>{setExpanded(curr=>!curr)}}>{item.text}</span>
                </MenuLink>
                {(expanded && header)?
                    <MenuList links={item.links} listURL={item.baseURL} sub={true}/> :
                    <></>
            }
            </li>
        )
    }
    const MenuList = ({links, listURL, sub=false}) => {
        console.log(listURL);
        return (
        
        <ul className={sub? 'sub secondary' : 'secondary'}>
            {links.map(item=>(
                    <MenuItem item={item} root={listURL}/>    
            ))}
        </ul>
    )
            }

    return (
        <div className="secondary o-hidden menu-container floating block">
            <nav className="inline-margin height-padding">
                <MenuList links={links}/>
            </nav>
        </div>
    )
}