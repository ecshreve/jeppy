import React, { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./Landing.css";

type LandingProps = {
    handleClickStartGame: (numPlayers: Number) => void;
}

export default function Landing(props: LandingProps) {
	const [radioValue, setRadioValue] = useState("1");

	const radios = [
		{ name: "1", value: "1" },
		{ name: "2", value: "2" },
		{ name: "3", value: "3" },
	];

	return (
		<div className="landing-page-container">
			<div className="landing-content-container">
				<div className="landing-title">Welcome to Jeppy!</div>
				<div className="landing-content">
					<div className="landing-content-item">How many players?</div>
					<div className="landing-content-item">
						<ButtonGroup toggle>
							{radios.map((radio, idx) => (
								<ToggleButton
									key={idx}
									type="radio"
									variant="secondary"
									name="radio"
                                    size="lg"
									value={radio.value}
									checked={radioValue === radio.value}
									onChange={(e) => setRadioValue(e.currentTarget.value)}
								>
									{radio.name}
								</ToggleButton>
							))}
						</ButtonGroup>
					</div>
				</div>
                <div className="landing-content">
                    <Button className="landing-content-item" onClick={() => {props.handleClickStartGame(Number(radioValue))}}>
				        Start Game
			        </Button>
                </div>
			</div>
		</div>
	);
}
