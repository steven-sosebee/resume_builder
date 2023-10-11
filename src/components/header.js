export const Header = () => {


    const navLinks = [
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
      ]
    return (
        <header>
            <nav className="inline">
                <ul>
                    {navLinks.map(navLink => (
                        <li><a href={navLink.path}>{navLink.text}</a></li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}