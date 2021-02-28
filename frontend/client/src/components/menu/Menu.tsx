import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Menu.css";

import { getAllGameIds } from "../../requests";
import { MONTHS } from "../../consts";

type menuProps = {
	handleSelectGame: (s: string) => void;
};

export default function Menu(props: menuProps) {
	const [data, setData] = useState<string[]>([]);
	const [gameOptions, setGameOptions] = useState<string[]>([]);
	const [selectedYear, setSelectedYear] = useState("1985");
	const [selectedMonth, setSelectedMonth] = useState("January");
	const [selectedGame, setSelectedGame] = useState("");

	useEffect(() => {
		getAllGameIds().then((result) => setData(result));
	}, []);

	useEffect(() => {
		setGameOptions(
			data.filter(
				(g) => g.indexOf(selectedYear) >= 0 && g.indexOf(selectedMonth) >= 0
			)
		);
	}, [data, selectedYear, selectedMonth]);

	let years: number[] = [];
	for (let i = 1985; i <= 2021; i++) {
		years.push(i);
	}

	const handleSelectYear = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedYear(e.target.value);
	};

	const handleSelectMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedMonth(e.target.value);
	};

	const handleSelectGame = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedGame(e.target.value);
	};

	const handleSubmit = () => {
		if (selectedGame === "" && gameOptions.length > 0) {
			console.log("here");
			console.log(gameOptions);
			props.handleSelectGame(gameOptions[0]);
			return;
		}
		props.handleSelectGame(selectedGame);
	};

	return (
		<div className="menu-container">
			<Form className="menu-form">
				<Form.Group controlId="exampleForm.ControlSelect1">
					<Form.Label>Year</Form.Label>
					<Form.Control as="select" onChange={handleSelectYear}>
						{years.map((y) => {
							return <option>{y}</option>;
						})}
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="exampleForm.ControlSelect2">
					<Form.Label>Month</Form.Label>
					<Form.Control as="select" onChange={handleSelectMonth}>
						{MONTHS.map((m) => {
							return <option>{m}</option>;
						})}
					</Form.Control>
				</Form.Group>

				{gameOptions.length > 0 ? (
					<Form.Group controlId="exampleForm.ControlSelect3">
						<Form.Label>Game</Form.Label>
						<Form.Control as="select" onChange={handleSelectGame}>
							{gameOptions.map((g) => {
								return <option>{g}</option>;
							})}
						</Form.Control>
					</Form.Group>
				) : (
					<div>no games for these selections, try again.</div>
				)}
				<Button
					className="my-button"
					variant="primary"
					type="button"
					onClick={handleSubmit}
				>
					Select
				</Button>
			</Form>
		</div>
	);
}
