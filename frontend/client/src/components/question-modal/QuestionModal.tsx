import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";

import "bootstrap/dist/css/bootstrap.css";
import "./QuestionModal.css";

import { Clue } from "../../requests";
import { MAX_TIMER_VAL } from "../../consts";
import { Button } from "react-bootstrap";

type QuestionModalProps = {
	clue?: Clue;
	value: number;
	show: boolean;
	handleHide: () => void;
	handleSelectPlayer: (i: number, v: number) => void;
};

export default function QuestionModal(props: QuestionModalProps) {
	const [timerVal, setTimerVal] = useState(1);
	const [timerOn, setTimerOn] = useState(true);
	const [showAnswer, setShowAnswer] = useState(false);

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

	return (
		<>
			{props.clue && (
				<Modal
					className="my-modal"
					show={props.show}
					onHide={handleUserClick}
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
							<div>
								<Button
									className="footer-item"
									onClick={() => props.handleSelectPlayer(0, props.value)}
								>
									Player1
								</Button>
								<Button className="footer-item">Player2</Button>
								<Button className="footer-item">Player3</Button>
							</div>
							<div>{props.clue.answer}</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</>
	);
}
