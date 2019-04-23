const formList = document.querySelectorAll('.form__input-underline, .form textarea'), //elements
	  checkbox = document.querySelector('#checkbox'),
	  workGroupPublic = document.querySelector('.form__input-work-group-public'),
	  workGroupTextarea = document.querySelectorAll('.form__input-textarea'),
	  labelsTextarea = document.querySelectorAll('.form__input-labels-textarea'),
	  alertDiv = document.querySelector('.form__attention'),
	  inputFields = document.querySelector('.form__input-fields'),
	  saveButton = document.querySelector('.form__button-saveform'),
	  resetButton = document.querySelector('.form__button-reset'),
	  submitButton = document.querySelector('.form__button-submit'),
	  buttonsContainer = document.querySelectorAll('.form__input-fields-row3');



function checkRefresh() {
	let alertVisabilty = true;
	Object.keys(sessionStorage).forEach(function(key){
		let curentInput = document.querySelector("#"+`${key}`);
		curentInput.value = sessionStorage.getItem(key);  // Восстанавливаем содержимое текстового поля
	});

	const checkFields = (element) => {
		console.log(element, element.previousElementSibling, element.previousElementSibling.id);
		let parentDiv = element.parentElement,
			label = element.previousElementSibling.id,
			labelSelector = document.querySelector('#'+label);

		if (!element.checkValidity()) {
			parentDiv.classList.add('form__input-fields-row1-invalid');
			labelSelector.style.color = '#F64C4C';

		}
		if (element.checkValidity()) {
			parentDiv.classList.remove('form__input-fields-row1-invalid');
			labelSelector.style.color = 'rgba(0, 0, 0, 0.5)';
		}
		if (element.value.length === 0) {
			parentDiv.classList.remove('form__input-fields-row1-invalid');
			labelSelector.style.color = '#000000';
		}
	};

	formList.forEach(function(element){
		element.addEventListener('change', function() {
			sessionStorage.setItem(`${element.id}`, element.value);
			checkFields(element);

			if (sessionStorage.length > 0) {
				saveButton.removeAttribute("disabled");
				submitButton.removeAttribute("disabled");
			}

			if (element.value.length === 0) {
				sessionStorage.removeItem(element.id);
				saveButton.setAttribute("disabled",true);
				submitButton.setAttribute("disabled",true);
			}
		});

		element.addEventListener('click', function() {

		});

		checkFields(element);
	});


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
					inputFields.style.marginTop = inputFieldsPos+"px";
				}
			}
			alertVisabilty = false;
		}else if (!event) {
			alertDiv.style.display = 'block';
			let alertPos = -100,
				animate = setInterval(moveLeft, 10),
				opacityAlert = 1,
				inputFieldsPos = 90;

			function moveLeft() { // animation for alertDiv
				if (alertPos <= -1000) {
					clearInterval(animate);
				} else {
					alertPos -= 5;
					opacityAlert -= .005;
					inputFieldsPos -= 0.5;

					alertDiv.style.left = alertPos + "px";
					alertDiv.style.opacity = opacityAlert;
					inputFields.style.marginTop = inputFieldsPos+"px";
				}

			}
			alertVisabilty = true;
		}
	};

	if (sessionStorage.length > 0) {
		alertAnimation(alertVisabilty);
		saveButton.removeAttribute("disabled");
		submitButton.removeAttribute("disabled");
	}

	submitButton.onclick = function (event) {
		event.preventDefault();

		alertAnimation(false);
		formList.forEach(function(element) {
			checkFields(element);
			if (element.checkValidity() && element.value.length >= 0){
				//очистить поля
			}
		});

	};

	resetButton.onclick = function () {
		console.log(1);
		saveButton.setAttribute("disabled",true);
		submitButton.setAttribute("disabled",true);

		Object.keys(sessionStorage).forEach(function(key){
			sessionStorage.removeItem(key);
		});
		formList.forEach(function(element) {
			element.value = "";
			checkFields(element);
		});
		// openBox();

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
		console.log(textarea.classList);
		if(textarea.classList.contains('hovered')) {
			label.style.cssText = `borderTop: ""; background-color: #f1f5f9; color: #000000;`
		} else {
			console.log('here');
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
		if (textarea.classList.contains('focused')) {
			label.style.background = '#FFFFFF';
			return;
		}
		label.style.background = '#f1f5f9';
	};

	label.onmouseout = (e) => {
		if (textarea.classList.contains('focused')) {
			label.style.background = '#FFFFFF';
			return;
		}
		label.style.background = '';
	}
});
