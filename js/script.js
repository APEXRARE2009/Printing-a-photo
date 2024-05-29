let radioFormat = Array.from(document.querySelectorAll(".content__block-choice-format-list-item-radio"));
let radioCoating = Array.from(document.querySelectorAll(".content__block-choice-coating-list-item-radio"));
let input = document.querySelector(".content__block-preparation-input");
let btnCalculate = document.querySelector(".content__block-preparation-wrap-calculate");
let btnReset = document.querySelector(".content__block-preparation-wrap-reset");
let itemSumm = Array.from(document.querySelectorAll(".content__block-total-list-item-wrap-summ"));
let listFormat = document.querySelector(".content__block-choice-format-list");
let listCoating = document.querySelector(".content__block-choice-coating-list");
let error = document.querySelector(".alert-error-content");
let errorTxt = document.querySelector(".alert-error-content-txt");

btnCalculate.addEventListener("click", clickBtn);

let priceWork = 20;

function clickBtn() {
	checkValues()
}

btnReset.addEventListener("click", resetValues)

let formatPrices = {
	matte: {
		A1: 75,
		A2: 40,
		A3: 25.8,
		A4: 17.5,
		A5: 15
	},
	glossy: {
		A1: 100,
		A2: 60,
		A3: 24,
		A4: 18.6,
		A5: 18
	}
}

function getPrice() {
	let type;
	let format;
	radioCoating.map((radioC) => {
		if (radioC.checked) {
			console.log("coat =", radioC.id);
			type = radioC.id;
		}
	})
	radioFormat.map((radioF) => {
		if (radioF.checked) {
			console.log("format =", radioF.id);
			format = radioF.id;
		}
	})
	let priceOnePhoto = formatPrices[type][format];
	console.log("priceOnePhoto =", priceOnePhoto);
	let inputValue = input.value;
	let allPrice;
	if (inputValue != 0 && inputValue != "") {
		allPrice = priceOnePhoto * inputValue;
	}
	itemSumm[0].textContent = priceOnePhoto;
	itemSumm[1].textContent = inputValue;
	itemSumm[2].textContent = allPrice;
}

function checkValues() {
	let checkFormat = false;
	let checkCoat = false;
	let checkInput = false;
	radioFormat.find((radioF) => {
		if (radioF.checked) {
			checkFormat = true;
		}
	})
	radioCoating.find((radioC) => {
		if (radioC.checked) {
			checkCoat = true;
		}
	})
	if (input.value != "" && input.value != 0) {
		checkInput = true;
	}
	if (!checkFormat) {
		errorTxt.textContent = "select the format";
		error.classList.add("rotateX-0");
	} else if (!checkCoat) {
		errorTxt.textContent = "choose the type of coverage";
		error.classList.add("rotateX-0");
	} else if (!checkInput) {
		errorTxt.textContent = "enter the quantity";
		error.classList.add("rotateX-0");
	}
	if (checkFormat == true && checkCoat == true && checkInput == true) {
		getPrice();
		error.classList.remove("rotateX-0");
	}
}

function resetValues() {
	radioFormat.map((radioF) => {
		radioF.checked = false;
	})
	radioCoating.map((radioC) => {
		radioC.checked = false;
	})
	error.classList.remove("rotateX-0");
	itemSumm[0].textContent = 0;
	itemSumm[1].textContent = 0;
	itemSumm[2].textContent = 0;
	input.value = "";
}