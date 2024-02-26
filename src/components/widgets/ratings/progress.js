export const Progress = ({score}) => {

    return (
        <div className="progress">
            <div className="level" style={{width:`${score}%`}}></div>
        </div>
    )
}