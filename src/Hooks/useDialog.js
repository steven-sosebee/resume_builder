import { useRef, useState } from "react"

export const useDialog = ({dialogRef}) => {
    const [dialogState, setDialogState] = useState();

    const Window =({children}) => {
        return (
            <div ref={dialogRef=useRef()}>
                <h1>This is a test</h1>
                {children}
            </div>
        )
    }

    return {Window}

}