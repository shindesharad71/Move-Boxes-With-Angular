import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	selectedBox = '0';
	boxes = [0];

	constructor() {}

	ngOnInit(): void {}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent): void {
		this.move(event);
	}

	selectBox(i: number): void {
		this.selectedBox = i.toString();
	}

	move(event: any): void {
		const keyCode = event.keyCode;

		const element: any = document
			.getElementById(this.selectedBox)
			.getBoundingClientRect();

		const left = parseInt(element.left, 10);
		const top = parseInt(element.top, 10);

		switch (keyCode) {
			case 37:
				this.updatePosition(this.selectedBox, left - 10, top);
				break;

			case 39:
				this.updatePosition(this.selectedBox, left + 10, top);
				break;

			case 38:
				this.updatePosition(this.selectedBox, left, top - 10);
				break;

			case 40:
				this.updatePosition(this.selectedBox, left, top + 10);
				break;
			default:
				console.log('Invalid Keys');
				break;
		}
	}

	updatePosition(id, xPos, yPos): void {
		const element = document.getElementById(id);
		element.style.position = 'absolute';
		element.style.left = xPos + 'px';
		element.style.top = yPos + 'px';
	}
}
