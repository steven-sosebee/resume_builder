import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { useDialog } from "../../Hooks/useDialog";
import { useState } from "react";
import { ActivityForm } from "./activityForm";
import { ActivityCard } from "./activityCard";

export const JobCard = ({job,handleSubmit,index}) => {
    const {title, organization, end, start, activities=[]} = job;
    const [dialogState, setDialogState] = useState('empty');
    const dialog = useDialog();
    
    const handleDelete = (e) => {
        handleSubmit(curr=>(curr.filter((item,i)=>(
            i!=index
        ))))
    }
    
    const dialogOptions = {
        empty:<p>Please choose an option</p>,
        activity: <ActivityForm job={job} index={index} handleSubmit={handleSubmit}/>
    }

    return (
        <article className="secondary">
            <dialog.Window>
                {dialogOptions[dialogState]}
            </dialog.Window>
            <span>{title}</span><button onClick={handleDelete}>{ICONS.delete}</button>
            <p>{end}</p>
            <button className={STYLES.formButton} onClick={(e)=>{setDialogState('activity');dialog.toggleDialog()}}>Add Activity</button>
            <button className={STYLES.formButton}>Add Skill</button>
            <button className={STYLES.formButton}>Add Responsibility</button>
            {activities.map((activity,activityIndex)=>(
                <ActivityCard jobIndex={index} activityIndex={activityIndex} handleSubmit={handleSubmit} activity={activity}/>
            ))}
    </article>
    )
}