import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";

import "bootstrap/dist/css/bootstrap.css";
import "./QuestionModal.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { incrementPlayerScoreByAmount } from "../player/playerSlice";

import { Clue } from "../../requests";
import { MAX_TIMER_VAL } from "../../consts";
import { Button } from "react-bootstrap";

type QuestionModalProps = {
	clue?: Clue;
	value: number;
	show: boolean;
	handleHide: () => void;
};

export default function QuestionModal(props: QuestionModalProps) {
	const [timerVal, setTimerVal] = useState(1);
	const [timerOn, setTimerOn] = useState(true);
	const [showAnswer, setShowAnswer] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (timerVal >= MAX_TIMER_VAL) {
			// TODO: figure out the right way to do this. This is a hacky bandaid
			// to make the answer show up after the progress bar updates.
			setTimeout(() => {
				setShowAnswer(true);
				setTimerOn(false);
			}, 500);
		}

		if (timerOn && !showAnswer) {
			setTimeout(() => setTimerVal(timerVal + 1), 1000);
		}
	});

	const handleUserClick = () => {
		if (!showAnswer) {
			setTimerOn(false);

			// TODO: figure out the right way to do this. This is a hacky bandaid
			// to make the answer show up after the progress bar updates.
			setTimeout(() => setShowAnswer(true), 10);
		} else {
			props.handleHide();
		}
	};

	// Build the array of score buttons for the footer. We use a dummy array with
	// length equal to the number of players so we can use array.map instead of
	// looping through and appending.
	const players = useAppSelector((state) => state.player.players);
	let scoreButtons = players.map((player, ind) => {
		return (
			<Button
				key={ind}
				className="footer-item"
				onClick={() => {
					dispatch(
						incrementPlayerScoreByAmount({
							playerName: player.name,
							amount: props.value,
						})
					);
					props.handleHide();
				}}
			>
				{player.name}
			</Button>
		);
	});

	// Add the "Close" button to the end of our button array.
	scoreButtons.push(
		<Button
			key="close"
			variant="danger"
			className="footer-item"
			onClick={props.handleHide}
		>
			Close
		</Button>
	);

	return (
		<>
			{props.clue && (
				<Modal
					className="my-modal"
					show={props.show}
					onHide={handleUserClick}
					onClick={handleUserClick}
					animation={false}
				>
					<Modal.Header>
						<div>{props.clue.category}</div>
						<div>${props.value}</div>
					</Modal.Header>
					<Modal.Body>
						{props.clue.question}
						{timerOn && <ProgressBar now={(timerVal / MAX_TIMER_VAL) * 100} />}
					</Modal.Body>
					{showAnswer && (
						<Modal.Footer>
							<div>{scoreButtons}</div>
							<div>{props.clue.answer}</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</>
	);
}
