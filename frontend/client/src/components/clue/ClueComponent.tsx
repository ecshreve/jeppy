import React from "react";
import "./ClueComponent.css"

type ClueProps = {
    value: number
}

export default function ClueComponent(props: ClueProps) {
    return (
        <div className="clue">
			<p>{props.value}</p>
		</div> 
    )
}