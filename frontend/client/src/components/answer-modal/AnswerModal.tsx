import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import "./AnswerModal.css"

import { Clue } from "../../requests";

type AnswerModalProps = {
	clue?: Clue;
	show: boolean;
	handleHide: () => void;
};

export default function QuestionModal(props: AnswerModalProps) {
	return (
		<>
			{props.clue && (
				<Modal className="my-modal" show={props.show} onHide={props.handleHide}>
					<Modal.Header>{props.clue.category}</Modal.Header>
					<Modal.Body>{props.clue.question}</Modal.Body>
                    <Modal.Footer color="red">{props.clue.answer}</Modal.Footer>
				</Modal>
			)}
		</>
	);
}