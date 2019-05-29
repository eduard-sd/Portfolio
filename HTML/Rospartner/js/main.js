const formList = document.querySelectorAll('.form__input-underline, .form textarea'), //elements
	checkbox = document.querySelector('#checkbox'),
	workGroupPublic = document.querySelector('.form__input-work-group-public'),
	alertDiv = document.querySelector('.form__attention'),
	inputFieldsContainer = document.querySelector('.form__input-fields'),
	saveButton = document.querySelector('.form__button-saveform'),
	resetButton = document.querySelector('.form__button-reset'),
	submitButton = document.querySelector('.form__button-submit'),
	inputList = document.querySelectorAll('.form__input-underline');



function checkRefresh() {
	//shows input values after reload page
	Object.keys(sessionStorage).forEach(function(key){
		let curentInput = document.querySelector("#"+`${key}`);
		curentInput.value = sessionStorage.getItem(key);  // Восстанавливаем содержимое текстового поля
	});

	//checking all input fields for existing text and html patterns
	const validInput = () => {
		let booleanList = [];
		inputList.forEach(function(element){
			if (element.checkValidity() === true && element.value.length > 0) {
				booleanList.push(true);
			} else {
				booleanList.push(false);
			}
		});
		return booleanList.includes(false);
	};


	//checking field css styles
	//make visible buttons
	const checkFields = (element) => {
		let parentDiv = element.parentElement,
			label = element.previousElementSibling.id,
			labelSelector = document.querySelector('#'+label);

		if (sessionStorage.length > 0) {
			saveButton.removeAttribute("disabled");
			if (!element.checkValidity()) {
				parentDiv.classList.add('form__input-fields-row1-invalid');
				labelSelector.style.color = '#F64C4C';
			}
			if (element.checkValidity()) {
				parentDiv.classList.remove('form__input-fields-row1-invalid');
				labelSelector.style.color = 'rgba(0, 0, 0, 0.5)';
			}
		}

		if (element.value.length === 0) {
			parentDiv.classList.remove('form__input-fields-row1-invalid');
			labelSelector.style.color = '#000000';
		}

		if (validInput()) {
			saveButton.setAttribute("disabled",true);
			submitButton.setAttribute("disabled",true);
		} else if (!validInput()) {
			submitButton.removeAttribute("disabled");
		}
	};

	//adding all input values in sessionStorage
	//cleening all inputs from storage
	formList.forEach(function(element){
		element.addEventListener('change', function() {
			sessionStorage.setItem(`${element.id}`, element.value);
			checkFields(element);

			if (element.value.length === 0) {
				sessionStorage.removeItem(element.id);
			}
		});
		checkFields(element);
	});

	//alert animation function
	let alertVisabilty;
	const alertAnimation = (event) => {
		if (event) {
			alertDiv.style.display = 'block';
			let alertPos = -1000,
				animate = setInterval(moveRight, 10),
				opacityAlert = 0,
				inputFieldsPos = 20;

			function moveRight() { // animation for alert
				if (alertPos >= -100) {
					clearInterval(animate);
				} else {
					alertPos += 5;
					opacityAlert += .005;
					inputFieldsPos += 0.5;

					alertDiv.style.left = alertPos + "px";
					alertDiv.style.opacity = opacityAlert;
					inputFieldsContainer.style.marginTop = inputFieldsPos+"px";
				}
			}
			alertVisabilty = false;
		}else if (!event) {
			alertDiv.style.display = 'block';
			let alertPos = -100,
				animate = setInterval(moveLeft, 10),
				opacityAlert = 1,
				inputFieldsPos = 110;

			function moveLeft() { // animation for alertDiv
				if (alertPos <= -1000) {
					clearInterval(animate);
				} else {
					alertPos -= 5;
					opacityAlert -= .005;
					inputFieldsPos -= 0.5;

					alertDiv.style.left = alertPos + "px";
					alertDiv.style.opacity = opacityAlert;
					inputFieldsContainer.style.marginTop = inputFieldsPos+"px";
				}
			}
			alertVisabilty = true;
		}
	};


	//alert animation comes on reload page
	if (sessionStorage.length > 0) {
		alertAnimation(true);
	}

	//submit button shows animation
	//should be visible after validation
	//after click stil can cleen all fields
	submitButton.onclick = function (event) {
		event.preventDefault();
		if (!alertVisabilty) {
			alertAnimation(false); 	// disapier alert animation
		}
		formList.forEach(function(element) {
			//place for some future code
		});
	};

	//reset button clean everything in form
	resetButton.onclick = function () {
		saveButton.setAttribute("disabled",true);
		submitButton.setAttribute("disabled",true);

		Object.keys(sessionStorage).forEach(function(key){
			sessionStorage.removeItem(key);
		});
		formList.forEach(function(element) {
			element.value = "";
			checkFields(element);
		});
	};
}


window.onbeforeunload = checkRefresh();



function openBox() {
	if (box) {
		workGroupPublic.style.display = "flex";
		box = false;
	} else {
		workGroupPublic.style.display = "none";
		box = true;
	}
}

let box = true;
checkbox.addEventListener('change', () => {openBox()});




//changing color of textarea fields on focus and hover
//and
//changing color of textarea label on focus and hover
const tempWithTextarea = document.querySelectorAll('.form__input-fields-row2');

tempWithTextarea.forEach((el) => {
	const childrens = el.children;
	const label = childrens[0];
	const textarea = childrens[1];

	textarea.onmouseover = (e) => {
		textarea.classList.add('hovered');

		if (textarea.classList.contains('focused')) return;
		label.style.background = '#f1f5f9';

	};

	textarea.onmouseout = (e) => {
		textarea.classList.remove('hovered');

		if (textarea.classList.contains('focused')) return;
		label.style.background = '';

	};

	textarea.onfocus = (e) => {
		label.style.cssText = 'border-top: 2px solid rgba(47, 128, 237, 0.75);' +
			'					background-color: #FFFFFF; color: #2F80ED;' ;

		textarea.style.cssText = 'background-image: linear-gradient(#FFFFFF, #FFFFFF 18px, #000 28px, #000 28px, #FFFFFF 18px);\n' +
			'    background-size: 100% 19px;\n' +
			'    background-color: #FFFFFF;' +
			'	 background-position: 50% 100%;' +
			'	 border: 2px solid rgba(47, 128, 237, 0.75)';

		textarea.classList.add('focused');
	};

	textarea.onblur = (e) => {

		if(textarea.classList.contains('hovered')) {
			label.style.borderTop = "";
			label.style.backgroundColor = "#f1f5f9";
			label.style.color = "#000000";
		} else {
			label.style.cssText = `borderTop: ""; background-color: "";`;
		}

		textarea.style.cssText = 'background-image: "";\n' +
			'    background-size: "";\n' +
			'    background-color: "";' +
			'	 background-position: "";' +
			'	 border: ""';


		textarea.classList.remove('focused');

		if (textarea.value.length) {
			label.style.cssText = `borderTop: ""; background-color: ""; color: rgba(0, 0, 0, 0.5);`;
		}
	};

	label.onmouseover = (e) => {
		textarea.classList.add('hovered');

		if (textarea.classList.contains('focused')) {
			label.style.background = '#FFFFFF';
			return;
		}
		label.style.background = '#f1f5f9';
	};

	label.onmouseout = (e) => {
		textarea.classList.remove('hovered');

		if (textarea.classList.contains('focused')) {
			label.style.background = '#FFFFFF';
			return;
		}
		label.style.background = '';
	}
});




//changing color of input fields on focus and hover
const tempWithInput = document.querySelectorAll('.form__input-fields-row1');

tempWithInput.forEach(function (element) {
	const childrens = element.children;
	const label = childrens[0];
	const input = childrens[1];

	input.onfocus = (e) => {
		label.style.color = "#2F80ED";
	};

	input.onblur = (e) => {
		if (input.value.length) {
			label.style.cssText = `borderTop: ""; background-color: ""; color: rgba(0, 0, 0, 0.5);`;
		} else {
			label.style.color = "";
		}
	};

	input.onmouseover = (e) => {
		input.style.background = '#f1f5f9';
	};

	input.onmouseout = (e) => {
		input.style.background = '';
	}
});