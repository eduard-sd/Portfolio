const formList = document.querySelectorAll('.form input, .form textarea'), //elements
	  checkbox = document.querySelector('#checkbox'),
	  workGroupPublic = document.querySelector('.form__input-work-group-public'),
	  workGroupTextarea = document.querySelectorAll('.form__input-textarea'),
	  labelsTextarea = document.querySelectorAll('.form__input-labels-textarea'),
	  alert = document.querySelector('.form__attention'),
	  inputFields = document.querySelector('.form__input-fields');


function checkRefresh() {
	Object.keys(sessionStorage).forEach(function(key){
		let curentInput = document.querySelector("#"+`${key}`);
		curentInput.value = sessionStorage.getItem(key);  // Восстанавливаем содержимое текстового поля
	});

	formList.forEach(function(element){
		element.addEventListener('change', function() {
			sessionStorage.setItem(`${element.id}`, element.value);

			let parentDiv = element.parentElement,
				label = element.previousElementSibling.id,
				labelSelector = document.querySelector('#'+label);

			if (!element.checkValidity()) {
				parentDiv.classList.add('form__input-fields-row1-invalid');
				labelSelector.style.color = '#F64C4C';

			}
			if (element.checkValidity() || element.value.length===0) {
				parentDiv.classList.remove('form__input-fields-row1-invalid');
				labelSelector.style.color = 'rgba(0, 0, 0, 0.5)';
			}
		});
	});

	if (sessionStorage.length > 0) { // animation for alert
		alert.style.display = 'block';
		let alertPos = -1000,
			animate = setInterval(frame, 10),
			opacityAlert = 0,
			inputFieldsPos = 20;

		function frame() {
			if (alertPos >= -100) {
				clearInterval(animate);
			} else {
				alertPos += 5;
				opacityAlert += .005;
				inputFieldsPos += 0.5;

				alert.style.left = alertPos + "px";
				alert.style.opacity = opacityAlert;
				inputFields.style.marginTop = inputFieldsPos+"px";
			}
		}
	}
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




let textareaFocused = false;
let isMouseInTextarea = false;
let isMouseInLabel = false;

workGroupTextarea.forEach(function (element) { // event for textarea
	const labels = element.previousElementSibling;

	element.onmouseover = function(event) {
		if (!textareaFocused) {
			labels.style.background = '#F1F5F9';
		}
		isMouseInTextarea = true;
	};

	element.onmouseout = function(event) {
		if (!textareaFocused) {
			labels.style.background = '';
		}
		isMouseInTextarea = false;
	};

	element.onfocus = function(event) {
		labels.style.cssText = 'border-top: 2px solid rgba(47, 128, 237, 0.75);' +
			'					background-color: #FFFFFF;';

		element.style.cssText = 'background-image: linear-gradient(#FFFFFF, #FFFFFF 18px, #000 28px, #000 28px, #FFFFFF 18px);\n' +
			'    background-size: 100% 19px;\n' +
			'    background-color: #FFFFFF;' +
			'	 background-position: 50% 100%;' +
			'	 border: 2px solid rgba(47, 128, 237, 0.75)';

		textareaFocused = true;
	};

	element.onblur = function(event) {
		if (isMouseInTextarea) {
			labels.style.cssText = `borderTop: ""; background-color: #f1f5f9;`
		} else {
			labels.style.cssText = `borderTop: "";
									background-color: "";`;
		}

		if (isMouseInLabel) {
			labels.style.cssText = `borderTop: ""; background-color: #f1f5f9;`
		}

		element.style.cssText = 'background-image: "";\n' +
			'    background-size: "";\n' +
			'    background-color: "";' +
			'	 background-position: "";' +
			'	 border: ""';
		textareaFocused = false;
	}
});


labelsTextarea.forEach(function (element) { //pseudo event for label of textarea
	const textarea = element.nextElementSibling;

	element.onmouseover = function(event) {
		if (textareaFocused) {
			element.style.background = '#FFFFFF';
		} else {
			element.style.background = '#F1F5F9';
		}
		isMouseInLabel = true;
	};

	element.onmouseout = function(event) {
		if (textareaFocused) {
			element.style.background = '#FFFFFF';
		} else {
			element.style.background = '';
		}
		isMouseInLabel = false;
	};
});
