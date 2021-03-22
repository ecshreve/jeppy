import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./Config.css";

import {
	setCurrentGameId,
	setAllGameIds,
	setGameActive,
} from "../config/configSlice";
import { replacePlayers } from "../player/playerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getGameIds } from "../../requests";
import { YEARS, MONTHS, DEVELOPMENT_GAME_ID } from "../../consts";

export default function Config() {
	const [player1Name, setPlayer1Name] = useState("");
	const [player2Name, setPlayer2Name] = useState("");
	const [player3Name, setPlayer3Name] = useState("");
	const [yearSelection, setYearSelection] = useState(YEARS[0]);
	const [monthSelection, setMonthSelection] = useState(MONTHS[0]);
	const [showNumberSelection, setShowNumberSelection] = useState("Show Number");
	const [selectedGameId, setSelectedGameId] = useState(DEVELOPMENT_GAME_ID);

	const dispatch = useAppDispatch();
	const parsedGameIds = useAppSelector((state) => {
		const gids = state.config.allParsedGameIds;
		return gids.filter(
			(g) => g.year === yearSelection && g.month === monthSelection
		);
	});

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

	const renderGameSelection = () => {
		const yearDropdownItems = YEARS.map((y) => {
			return (
				<Dropdown.Item onSelect={() => setYearSelection(y)}>{y}</Dropdown.Item>
			);
		});

		const monthDropdownItems = MONTHS.map((m) => {
			return (
				<Dropdown.Item onSelect={() => setMonthSelection(m)}>{m}</Dropdown.Item>
			);
		});

		const showNumberDropdownItems = parsedGameIds.map((g) => {
			return (
				<Dropdown.Item
					onSelect={() => {
						setShowNumberSelection(g.showNumber);
						setSelectedGameId(g.raw);
					}}
				>
					{g.showNumber}
				</Dropdown.Item>
			);
		});

		return (
			<div className="config-gameSelection">
				<div className="config-gameSelection-button">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{yearSelection}
						</Dropdown.Toggle>
						<Dropdown.Menu>{yearDropdownItems}</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="config-gameSelection-button">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{monthSelection}
						</Dropdown.Toggle>
						<Dropdown.Menu>{monthDropdownItems}</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="config-gameSelection-button">
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{showNumberSelection}
						</Dropdown.Toggle>
						<Dropdown.Menu>{showNumberDropdownItems}</Dropdown.Menu>
					</Dropdown>
				</div>
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
						{renderGameSelection()}
						<Button
							key="saveConfig"
							variant="primary"
							disabled={player1Name === ""}
							onClick={() => {
								dispatch(
									replacePlayers([player1Name, player2Name, player3Name])
								);
								dispatch(setCurrentGameId(selectedGameId));
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
