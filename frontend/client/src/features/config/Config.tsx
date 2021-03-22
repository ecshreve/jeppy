import React, { useEffect, useState } from "react";
import {
	Button,
	ButtonGroup,
	Card,
	Dropdown,
	Form,
	InputGroup,
	OverlayTrigger,
	ToggleButton,
	Tooltip,
} from "react-bootstrap";

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
	const [gameModeSelection, setGameModeSelection] = useState("RANDOM");

	const dispatch = useAppDispatch();

	// Only fetch the full list of game ids once when the component mounts.
	useEffect(() => {
		getGameIds().then((result) => dispatch(setAllGameIds(result)));
	}, [dispatch]);

	const renderPlayerNameInput = () => {
		return (
			<>
				<label className="config-pane-playerName-label">
					Enter up to 3 Player Names
				</label>
				<div id="player-names" className="config-pane-playerNames">
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
			</>
		);
	};

	const renderGameModeSelection = () => {
		const gameModeRadios = [
			{ name: "Random Game", value: "RANDOM" },
			{ name: "Select Game", value: "SELECT" },
		];

		const tooltipDescriptions = [
			"play a random game",
			"choose a specific game",
		];

		return (
			<div>
				<ButtonGroup toggle className="config-gameModeSelection-container">
					{gameModeRadios.map((radio, idx) => (
						<OverlayTrigger
							key={`overlay=${idx}`}
							placement="bottom"
							overlay={
								<Tooltip id={`tooltip-${idx}`}>
									{tooltipDescriptions[idx]}
								</Tooltip>
							}
						>
							<ToggleButton
								key={`toggle-but-${idx}`}
								className="config-gameModeSelection-item"
								type="radio"
								variant="secondary"
								name="radio"
								value={radio.value}
								checked={gameModeSelection === radio.value}
								onChange={(e) => setGameModeSelection(e.currentTarget.value)}
							>
								{radio.name}
							</ToggleButton>
						</OverlayTrigger>
					))}
				</ButtonGroup>
			</div>
		);
	};

	const parsedGameIds = useAppSelector((state) => {
		const gids = state.config.allParsedGameIds;
		return gids.filter(
			(g) => g.year === yearSelection && g.month === monthSelection
		);
	});
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

		const gameSelectionDropdownInfo = [
			{ selection: yearSelection, items: yearDropdownItems },
			{ selection: monthSelection, items: monthDropdownItems },
			{ selection: showNumberSelection, items: showNumberDropdownItems },
		];

		const gameSelectionDropdowns = gameSelectionDropdownInfo.map((s) => {
			return (
				<Dropdown as={ButtonGroup} className="config-gameSelection-dropdown">
					<Button
						className="config-gameSelection-dropdown-val"
						variant="success"
					>
						{s.selection}
					</Button>
					<Dropdown.Toggle
						split
						variant="info"
						id="dropdown-basic"
					></Dropdown.Toggle>
					<Dropdown.Menu>{s.items}</Dropdown.Menu>
				</Dropdown>
			);
		});

		return (
			<div>
				<hr />
				<div className="config-gameSelection">{gameSelectionDropdowns}</div>
			</div>
		);
	};

	const renderSaveConfigButton = () => {
		return (
			<div className="config-saveConfig-button">
				<Button
					key="saveConfig"
					variant="primary"
					disabled={player1Name === ""}
					onClick={() => {
						dispatch(replacePlayers([player1Name, player2Name, player3Name]));
						dispatch(
							setCurrentGameId(
								gameModeSelection === "SELECT"
									? selectedGameId
									: DEVELOPMENT_GAME_ID
							)
						);
						dispatch(setGameActive(true));
					}}
				>
					Start Game
				</Button>
			</div>
		);
	};

	return (
		<>
			<div className="config-container">
				<div className="config-pane">
					<div className="config-pane-header">Welcome to Jeppy!</div>
					<hr />
					<div className="config-pane-content">
						<Card>
							<Card.Body>
								{renderPlayerNameInput()}
								<hr />
								{renderGameModeSelection()}
								{gameModeSelection === "SELECT" && renderGameSelection()}
								<hr />
								{renderSaveConfigButton()}
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
