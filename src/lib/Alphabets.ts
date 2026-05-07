export default class Alphabets {
	#currentCharacterCode: number;

	constructor(lowercase: boolean) {
		// 97 is the character code for 'a'
		// 65 is the character code for 'A'
		if (lowercase)
			this.#currentCharacterCode = 96;
		else
			this.#currentCharacterCode = 64;
	}

	generate() {
		this.#currentCharacterCode++;
		return String.fromCharCode(this.#currentCharacterCode);
	}
}
