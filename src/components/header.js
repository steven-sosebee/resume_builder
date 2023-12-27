export const Header = () => {


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
        path:'/main',
        text:'Applications'
       },
       {
        path:'/resume/8/edit',
        text:'Create Resume'
       },
       {
        path:'/resume/template',
        text:'Resume Template'
       },
       {
        path:'/templates',
        text:'Resume Templates'
       },
       {
        path:"/testing/crypto",
        text:"Crypto"
       }
      ]}
      
    return (
        <header>
            <nav >
                <ul className="inline ">
                    {navLinks[process.env.NODE_ENV].map(navLink => (
                        <li className="inline inline-margin"><a href={navLink.path}>{navLink.text}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}