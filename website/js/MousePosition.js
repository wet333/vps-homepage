export class MousePosition {
	constructor() {
		this.x = 0;
		this.y = 0;

		// Bind the event listener to the instance
		this.handleMouseMove = this.handleMouseMove.bind(this);

		// Add a mousemove event listener to the document
		document.addEventListener("mousemove", this.handleMouseMove);
	}

	handleMouseMove(event) {
		this.x = event.clientX;
		this.y = event.clientY;
	}

	destroy() {
		document.removeEventListener("mousemove", this.handleMouseMove);
	}
}
