import { Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	ALLOWED_KEYS = [37, 38, 39, 40, 87, 83, 65, 68, 46];
	POSITION_SHIFT_BY = 10;
	selectedBox = '0';
	boxes = [{ title: 1 }];
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
		this.boxes.push({ title: this.boxes.length + 1 });
	}

	removeBox(): void {
		if (this.selectedBox?.length) {
			this.boxes.splice(Number(this.selectedBox), 1);
		}
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
				this.moveLeft(left - this.POSITION_SHIFT_BY, top); // left
				break;

			case 39:
				this.moveRight(left + this.POSITION_SHIFT_BY, top); // right
				break;

			case 38:
				this.moveUp(left, top - this.POSITION_SHIFT_BY); // up
				break;

			case 40:
				this.moveDown(left, top + this.POSITION_SHIFT_BY); // down
				break;
			case 65:
				this.moveLeft(left - this.POSITION_SHIFT_BY, top); // left
				break;

			case 68:
				this.moveRight(left + this.POSITION_SHIFT_BY, top); // right
				break;

			case 87:
				this.moveUp(left, top - this.POSITION_SHIFT_BY); // up
				break;

			case 83:
				this.moveDown(left, top + this.POSITION_SHIFT_BY); // down
				break;

			case 46:
				this.removeBox(); // delete
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

	moveLeft(left, top): void {
		const boxWrapperPosition = document
			.getElementById('box-area')
			.getBoundingClientRect();

		if (boxWrapperPosition.left < left) {
			this.updatePosition(this.selectedBox, left, top);
		}
	}

	moveRight(left, top): void {
		const boxWrapperPosition = document
			.getElementById('box-area')
			.getBoundingClientRect();

		if (boxWrapperPosition.right > left) {
			this.updatePosition(this.selectedBox, left, top);
		}
	}

	moveUp(left, top): void {
		const boxWrapperPosition = document
			.getElementById('box-area')
			.getBoundingClientRect();

		if (boxWrapperPosition.top < top) {
			this.updatePosition(this.selectedBox, left, top);
		}
	}

	moveDown(left, top): void {
		const boxWrapperPosition = document
			.getElementById('box-area')
			.getBoundingClientRect();

		if (boxWrapperPosition.bottom > top) {
			this.updatePosition(this.selectedBox, left, top);
		}
	}
}
