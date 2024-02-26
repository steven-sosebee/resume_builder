import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { useDialog } from "../../Hooks/useDialog";
import { useState } from "react";
// import { ActivityForm } from "./activityForm";
import { ActivityCard } from "./activityCard";

export const JobCard = ({job,handleSubmit,index}) => {
    const {title, organization, end, start, activities=[]} = job;

    return (
        <article className="secondary">
            <span>{title}</span>
            <p>{end}</p>
            {activities.map((activity,activityIndex)=>(
                <ActivityCard jobIndex={index} activityIndex={activityIndex} activity={activity}/>
            ))}
    </article>
    )
}