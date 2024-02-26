import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";
import { useDialog } from "../../Hooks/useDialog";
import { useState } from "react";
import { Rating } from "../../components/widgets/ratings/ratings";

export const SkillCard = ({data, handleSubmit, skillIndex}) => {
    const {level, skill, examples=[]} = data;

    return (
        <article className="secondary">
            
            <div>
                <h5><span>{skill}</span></h5><div><Rating score={level}/></div>
            </div>
            {examples.map((example)=>(
                <span>{example.example}</span>
            ))}
        </article>
    )
}