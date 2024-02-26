import { useState, useEffect } from "react";
import "./ratings.css";
import './star.svg';

// "/applicationresume/:uuid"

const COLORS = {
    low: 'red',
    med: 'yellow',
    high:'yellow',
    advanced: 'green',
    master:'green'
};

const LEVELS = {
    low:"Novice",
    med:"Proficient",
    high:"Experienced",
    advanced:"Advanced",
    master:"Expert"
}

	
export const Rating = ({score}) => {
    const [color, setColor] = useState();
    const [classes, setClasses] = useState();
    const [fill, setFill] = useState();
    useEffect(()=>{

        switch (score) {
            case LEVELS.low:
                
                setColor(COLORS.low);
                setFill(20);
                break;
            case LEVELS.med:
                
                setColor(COLORS.med);
                setFill(40);
                break;
            case LEVELS.high:
                
                setColor(COLORS.high);
                setFill(60);
                break;
            case LEVELS.advanced:
                
                setColor(COLORS.advanced);
                setFill(80);
                break;
            case LEVELS.master:
                
                setColor(COLORS.master);
                setFill(100);
                break;
            default:
                console.log('default');
                setColor(LEVELS.low)
                  
        }

        score=LEVELS.master ?
            setClasses('mastery') : setClasses('');
    },[score, fill]);

    const ratingClasses = `rating ${classes}`;
    return (
        <div className="container">
            <div className={ratingClasses}>
                <div className={"level"} style={{width: `${fill*5}%`, 
                backgroundColor:color
                }}></div>    
            </div>
            <div className={ratingClasses}>
                <div className={"level"} style={{width: `${Math.max((fill - 20) * 5,0)}%`, 
                backgroundColor:color
            }}></div>
            </div>
            <div className={ratingClasses}>
                <div className={"level"} style={{width: `${Math.max((fill - 40) * 5,0)}%`, 
                backgroundColor:color
                }}></div>
            </div>
            <div className={ratingClasses}>
                <div className={"level"} style={{width: `${Math.max((fill - 60) * 5,0)}%`, 
                backgroundColor:color
                }}></div>
            </div>
            <div className={ratingClasses}>
                <div className={"level"} style={{width: `${Math.max((fill - 80) * 5,0)}%`, 
                backgroundColor:color
                }}></div>
            </div>
        </div>)
}