const form = document.querySelectorAll('.form input, .form textarea'), //elements
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

	form.forEach(function(element){
		element.addEventListener('change', function() {
			sessionStorage.setItem(`${element.id}`, element.value);
		})
	})
}
window.onbeforeunload = checkRefresh();



function openBox() { //switcher dark/light
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




workGroupTextarea.forEach(function (element) {
	element.onmouseover = function(event) {
		const labels = element.previousElementSibling;
		labels.style.background = '#F1F5F9';
	};

	element.onmouseout = function(event) {
		const labels = element.previousElementSibling;
		labels.style.background = '';
	};

	element.onfocus = function(event) {
		const labels = element.previousElementSibling;
		labels.style.borderTop = '2px solid rgba(47, 128, 237, 0.75)';
	};

	element.onblur = function(event) {
		const labels = element.previousElementSibling;
		labels.style.borderTop = '';
	}
});


labelsTextarea.forEach(function (element) {
	element.onmouseover = function(event) {
		element.style.background = '#F1F5F9';
	};

	element.onmouseout = function(event) {
		element.style.background = '';
	}
});
