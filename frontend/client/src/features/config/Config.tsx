import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./Config.css";

import { setAllGameIds, setGameActive } from "../config/configSlice";
import { replacePlayers } from "../player/playerSlice";
import { useAppDispatch } from "../../app/hooks";
import { getGameIds } from "../../requests";

export default function Config() {
	const [player1Name, setPlayer1Name] = useState("");
	const [player2Name, setPlayer2Name] = useState("");
	const [player3Name, setPlayer3Name] = useState("");

	const dispatch = useAppDispatch();

	// Only fetch the full list of game ids once when the component mounts.
	useEffect(() => {
		getGameIds().then((result) => dispatch(setAllGameIds(result)));
	}, [dispatch]);

	const renderPlayerNameInput = () => {
		return (
			<div className="config-pane-playerNames">
				Enter up to 3 Player Names
				<InputGroup size="lg" className="config-pane-playerNameInput">
					<InputGroup.Prepend>
						<InputGroup.Text> </InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control
						placeholder="Player 1 Name"
						onChange={(e) => setPlayer1Name(e.target.value)}
					/>
				</InputGroup>
				{player1Name !== "" && (
					<InputGroup size="lg" className="config-pane-playerNameInput">
						<InputGroup.Prepend>
							<InputGroup.Text> </InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							placeholder="Player 2 Name"
							onChange={(e) => setPlayer2Name(e.target.value)}
						/>
					</InputGroup>
				)}
				{player2Name !== "" && (
					<InputGroup size="lg" className="config-pane-playerNameInput">
						<InputGroup.Prepend>
							<InputGroup.Text> </InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							placeholder="Player 3 Name"
							onChange={(e) => setPlayer3Name(e.target.value)}
						/>
					</InputGroup>
				)}
			</div>
		);
	};

	return (
		<div className="config-container">
			<div className="config-pane">
				<div className="config-pane-header">Welcome to Jeppy!</div>
				<div className="config-pane-content">
					<div>
						{renderPlayerNameInput()}
						<Button
							key="saveConfig"
							variant="primary"
							disabled={player1Name === ""}
							onClick={() => {
								dispatch(
									replacePlayers([player1Name, player2Name, player3Name])
								);
								dispatch(setGameActive(true));
							}}
						>
							Save Config
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
