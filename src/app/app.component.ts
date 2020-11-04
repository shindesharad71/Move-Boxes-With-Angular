import { Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	selectedBox = '0';
	boxes = [0];
	ALLOWED_KEYS = [37, 38, 39, 40, 87, 83, 65, 68];
	isKeyboardEnable = false;

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: any): void {
		if (
			this.ALLOWED_KEYS.includes(event.keyCode) &&
			this.isKeyboardEnable
		) {
			this.move(event);
		}
	}

	selectBox(i: number): void {
		this.selectedBox = i.toString();
	}

	addBox(): void {
		const newItem = Number(this.boxes[this.boxes.length - 1] + 1);
		this.boxes.push(newItem);
	}

	toggleKeyboard(): void {
		this.isKeyboardEnable = !this.isKeyboardEnable;
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
				this.updatePosition(this.selectedBox, left - 10, top); // left
				break;

			case 39:
				this.updatePosition(this.selectedBox, left + 10, top); // right
				break;

			case 38:
				this.updatePosition(this.selectedBox, left, top - 10); // up
				break;

			case 40:
				this.updatePosition(this.selectedBox, left, top + 10); // down
				break;
			case 65:
				this.updatePosition(this.selectedBox, left - 10, top); // left
				break;

			case 68:
				this.updatePosition(this.selectedBox, left + 10, top); // right
				break;

			case 87:
				this.updatePosition(this.selectedBox, left, top - 10); // up
				break;

			case 83:
				this.updatePosition(this.selectedBox, left, top + 10); // down
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
		element.style.zIndex = id;
	}
}
