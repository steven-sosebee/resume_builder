import { ICONS } from "../../data/iconClasses";
import { createFormObject } from "../../utils/utils";
import { STYLES } from "../../data/styleClasses";

export const ActivityCard = ({activity, handleSubmit, activityIndex, jobIndex}) => {
    
    const handleDelete = (e) => {
        handleSubmit(curr=>(curr.map((item,index)=>(
            index != jobIndex? 
                item :
                ({...item,activities:item.activities.filter((item,index)=>(index!=activityIndex))})
        ))))
    }
    return (
        <article>
            <span>{activity.achievement}</span>
            <button onClick={handleDelete} className={STYLES.formButton}>{ICONS.delete}</button>

        </article>
    )
}