export const Header = () => {


    const navLinks = {
      production: [
        {
          path:'/',
          text: "Home"
        },{
          path: '/resume',
          text: "Resumes"
        },
        {
          path:'/application/list',
          text:"Applications"
        },
        {
          path:'/coverletter/new',
          text: "New Cover Letter"
        }
      ],
      development:[
       {
        path:'/test/8',
        text:'Testing'
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