import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { useDialog } from "../../Hooks/useDialog";
import { useState } from "react";
import { ExampleForm } from "./exampleForm";
import { Rating } from "../../components/widgets/ratings/ratings";
import { Progress } from "../../components/widgets/ratings/progress";

export const SkillCard = ({data, handleSubmit, skillIndex}) => {
    const {level, skill, examples=[]} = data;
    const dialog = useDialog();
    const [dialogState, setDialogState] = useState('empty');

    const handleDelete = (e) => {
        handleSubmit(curr=>(curr.filter((item,i)=>(
            i!=skillIndex
        ))))
    }
    
    const dialogOptions = {
        empty:<p>Please choose an option</p>,
        example: <ExampleForm skill={data} index={skillIndex} handleSubmit={handleSubmit}/>
    }

    return (
        <article className="secondary">
            <dialog.Window>
                {dialogOptions[dialogState]}
            </dialog.Window>
            <span>{skill}</span>
            <Rating score={level}/>
            {/* <Progress score={level}/> */}
            <button className={STYLES.formButton} onClick={(e)=>{setDialogState('example');dialog.toggleDialog()}}>Add Example</button>
            <ul>
                {examples.map((example)=>(
                    <li>{example.example}</li>
                ))}
            </ul>
        </article>
    )
}