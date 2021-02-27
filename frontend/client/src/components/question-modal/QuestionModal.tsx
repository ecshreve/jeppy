import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";

import { Clue } from "../../requests";

type QuestionModalProps = {
	clue?: Clue;
	show: boolean;
	handleHide: () => void;
};

export default function QuestionModal(props: QuestionModalProps) {
	return (
		<>
			{props.clue && (
				<Modal show={props.show} onHide={props.handleHide}>
					<Modal.Header>{props.clue.category}</Modal.Header>
					<Modal.Body>{props.clue.question}</Modal.Body>
				</Modal>
			)}
		</>
	);
}
