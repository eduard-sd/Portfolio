const formList = document.querySelectorAll('.form input, .form textarea'), //elements
	  checkbox = document.querySelector('#checkbox'),
	  workGroupPublic = document.querySelector('.form__input-work-group-public'),
	  workGroupTextarea = document.querySelectorAll('.form__input-textarea'),
	  labelsTextarea = document.querySelectorAll('.form__input-labels-textarea');


function checkRefresh() {
	Object.keys(sessionStorage).forEach(function(key){
		console.log(key);
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
	})
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

workGroupTextarea.forEach(function (element) {
	const labels = element.previousElementSibling;

	console.log(labels)

	element.onmouseover = function(event) {
		if (!textareaFocused) {
			labels.style.background = '#F1F5F9';
		}
	};

	element.onmouseout = function(event) {
		if (!textareaFocused) {
			labels.style.background = '';
		}
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
		labels.style.cssText = 'borderTop: "";' +
			'					background-color: "";';

		element.style.cssText = 'background-image: "";\n' +
			'    background-size: "";\n' +
			'    background-color: "";' +
			'	 background-position: "";' +
			'	 border: ""';
		textareaFocused = false;
	}
});


labelsTextarea.forEach(function (element) {
	const textarea = element.nextElementSibling;

	element.onmouseover = function(event) {
		if (textareaFocused) {
			element.style.background = '#FFFFFF';
		} else {
			element.style.background = '#F1F5F9';
		}
	};

	element.onmouseout = function(event) {
		if (textareaFocused) {
			element.style.background = '';
		} else {
			element.style.background = '#FFFFFF';
		}
	};
});
