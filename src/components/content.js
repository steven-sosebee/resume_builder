import { Toggle } from "./toggle";

export const Content =({children}) => {

    const themeToggle = (theme) => {
        console.log(theme)
    }
    return (
        <main id="content">
            {/* <Toggle onChange={themeToggle}/> */}
            {children}
        </main>
    )
}