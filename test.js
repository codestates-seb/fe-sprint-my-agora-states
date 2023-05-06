//! inputted name conditions
inputedName.addEventListener('keyup', () => {
	const nameValue = inputedName.value;

	//if inputed name is empty or longer than 10
	if (nameValue.length < 1) {
		inputedName.classList = 'error';
		errMsg.classList.remove('hide');
		errMsg.textContent = 'Name is empty';
	} else if (nameValue.length > 10) {
		// alert('Name is too long. Characters Under 10');
		inputedName.classList = 'error';
		errMsg.classList.remove('hide');
		errMsg.textContent = 'Name is too long';
	} else if (nameValue >= 1 || nameValue.length <= 10) {
		inputedName.classList = 'errorOff';
		errMsg.classList.add('hide');
	}
});

//! inputted title conditions
inputedTitle.addEventListener('keyup', () => {
	const titleValue = inputedTitle.value;

	//if inputed title is empty
	if (titleValue.length < 1) {
		inputedTitle.classList = 'error';
		errMsg.classList.remove('hide');
		errMsg.textContent = 'Title is empty';
	} else if (titleValue.length > 15) {
		inputedTitle.classList = 'error';
		errMsg.classList.remove('hide');
		errMsg.textContent = 'Title is too long';
	} else if (titleValue >= 1 || titleValue.length <= 50) {
		inputedTitle.classList = 'errorOff';
		errMsg.classList.add('hide');
	}
});

//! inputted question conditions

inputedQuestion.addEventListener('keyup', () => {
	const questionValue = inputedQuestion.value;

	// if inputed question is empty
	if (questionValue.length < 1) {
		inputedQuestion.classList = 'error';
		errMsg.classList.remove('hide');
		errMsg.textContent = 'Question is empty';
	} else if (questionValue.length > 30) {
		inputedQuestion.classList = 'error';
		errMsg.classList.remove('hide');
		errMsg.textContent = 'Question is too long';
	} else if (questionValue >= 1 || questionValue.length <= 20) {
		inputedQuestion.classList = 'errorOff';
		errMsg.classList.add('hide');
	}
});
