export class Clue {
	id: number;
	game_id: string;
	clue_id: string;
	category: string;
	question: string;
	answer: string;

	constructor(
		id: number,
		game_id: string,
		clue_id: string,
		category: string,
		question: string,
		answer: string
	) {
		this.id = id;
		this.game_id = game_id;
		this.clue_id = clue_id;
		this.category = category;
		this.question = question;
		this.answer = answer;
	}
}
const APIURL = "http://localhost:5000";

export const getClues = async (gameId: string): Promise<Clue[]> => {
	//const param = "Show #8236 - Monday, September 14, 2020";
	return fetch(
		`${APIURL}/clues?game_id=${encodeURIComponent(gameId)}`
	).then((res) => res.json());
};

export const getAllGameIds = async () => {
	return fetch(`${APIURL}/game_ids`).then((res) => res.json());
};
