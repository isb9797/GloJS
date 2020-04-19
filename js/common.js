//Урок 16.1
"use strict";
//Проверка на число
//сonst isNumber = n => !isNaN(parseFloat(n)) && isFinite(parseFloat(n));

const execute = document.getElementById("start"),
	cancel = document.querySelector("#cancel"),
	incomeBtnAdd = document.getElementsByTagName("button")[0],
	expensesBtnAdd = document.getElementsByTagName("button")[1],
	depositCheckBox = document.querySelector("#deposit-check"),
	budgetMonthValue = document.querySelector(".budget_month-value"),
	budgetDayValue = document.querySelector(".budget_day-value"),
	expensesMonthValue = document.querySelector(".expenses_month-value"),
	additionalIncomeValue = document.querySelector(".additional_income-value"),
	additionalExpensesValue = document.querySelector(
		".additional_expenses-value"
	),
	incomePeriodValue = document.querySelector(".income_period-value"),
	targetMonthValue = document.querySelector(".target_month-value"),
	inputSalaryAmount = document.querySelector(".salary-amount"),
	additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
	additionalExpencesItem = document.querySelector(".additional_expenses-item"),
	targetAmount = document.querySelector(".target-amount"),
	periodSelect = document.querySelector('[type="range"]'),
	periodAmount = document.querySelector(".period-amount"),
	depositBank = document.querySelector(".deposit-bank"),
	depositAmount = document.querySelector(".deposit-amount"),
	depositPercent = document.querySelector(".deposit-percent");

let expensesItems = document.querySelectorAll(".expenses-items"),
	incomeItems = document.querySelectorAll(".income-items");

//Создаем класс AppData с Конструктором свойств
class AppData {
	constructor() {
		this.budget = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
	}

	//Добавляем методы класса

	//Старт программы после ввода месячного дохода
	start() {
		this.budget = +inputSalaryAmount.value;

		this.getExpenses();
		this.getIncome();
		this.getExpensesMonth();
		this.getAddExpenses();
		this.getAddIncome();
		this.getInfoDeposit();
		this.getBudget();

		this.showResult();

		const inputsLeft = document.querySelectorAll("input[type=text]");

		inputsLeft.forEach(item => {
			item.disabled = true;
		});

		execute.style.display = "none";
		cancel.style.display = "block";
		periodSelect.removeAttribute("disabled");
		depositCheckBox.checked = false;
	}

	//Сброс программы
	reset() {
		execute.style.display = "block";
		cancel.style.display = "none";
		const _this = this;

		expensesItems.forEach(item => {
			item.querySelectorAll('input[type="text"]').forEach(item => {
				item.value = "";
			});
		});

		const newEl = () => {
			document.querySelectorAll(".newEl").forEach(item => {
				item.remove();
			});
		};

		if (depositCheckBox.checked) {
			depositCheckBox.checked = !depositCheckBox.checked;
		}

		periodSelect.value = 0;
		periodAmount.textContent = 1;

		newEl();
		periodSelect.setAttribute("disabled", true);
		document.querySelectorAll('input[type="text"]').forEach(item => {
			item.value = "";
		});
		inputSalaryAmount.value = "";
		budgetMonthValue.value = 0;
		budgetDayValue.value = 0;
		expensesMonthValue.value = 0;
		additionalExpensesValue.value = "";
		additionalIncomeValue.value = "";
		targetMonthValue.value = 0;
		const showResult = this.showResult.bind(_this);
		periodSelect.removeEventListener("input", showResult);
		incomePeriodValue.value = 0;
		depositBank.style.display = "none";
		depositBank.value = "";
		depositAmount.style.display = "none";
		depositPercent.style.display = "none";

		this.budget = 0;
		this.deposit = 0;
		this.budgetMonth = 0;
		this.budgetDay = 0;
		this.expensesMonth = 0;
		this.addExpenses = [];
		this.addIncome = [];
		incomePeriodValue.value = 0;

		const inputsLeft = document.querySelectorAll("input[type=text]");

		inputsLeft.forEach(item => {
			item.disabled = false;
		});
		execute.disabled = true;
	}
	//Вывод результатов вычеслений на экран
	showResult() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(", ");
		additionalIncomeValue.value = this.addIncome.join(", ");
		targetMonthValue.value = Math.ceil(this.getTargetMonth());

		incomePeriodValue.value = this.calcPeriod();
	}
	//Получение значения ползунка периодла и передача значения
	getRange() {
		periodAmount.textContent = periodSelect.value;
	}
	//Метод добавления доп расходов
	addExpensesBlock() {
		const cloneExpensesItem = expensesItems[0].cloneNode(true);
		cloneExpensesItem.classList.add("newEl");

		const textNull = cloneExpensesItem.querySelectorAll('input[type="text"]');
		textNull.forEach(item => {
			item.value = "";
		});

		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnAdd);
		expensesItems = document.querySelectorAll(".expenses-items");

		if (expensesItems.length === 3) {
			expensesBtnAdd.style.display = "none";
		}
	}
	//Метода добавления доп доходовие
	addIncomeBlock() {
		const cloneIncomeItem = incomeItems[0].cloneNode(true);
		cloneIncomeItem.classList.add("newEl");
		const textNull = cloneIncomeItem.querySelectorAll('input[type="text"]');
		textNull.forEach(item => {
			item.value = "";
		});

		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnAdd);
		incomeItems = document.querySelectorAll(".income-items");
		if (incomeItems.length === 3) {
			incomeBtnAdd.style.display = "none";
		}
	}
	//Получение расходов
	getExpenses() {
		expensesItems.forEach(item => {
			const itemExpenses = item.querySelector(".expenses-title").value;
			const cashExpenses = item.querySelector(".expenses-amount").value;

			if (itemExpenses !== "" && cashExpenses !== "") {
				this.expenses[itemExpenses] = +cashExpenses;
			}
		});
	}
	//Получение доходов
	getIncome() {
		incomeItems.forEach(item => {
			const itemIncome = item.querySelector(".income-title").value;
			const cashIncome = item.querySelector(".income-amount").value;

			if (itemIncome !== "" && cashIncome !== "") {
				this.income[itemIncome] = +cashIncome;
			}
		});
		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	//Получение доп расходов
	getAddExpenses() {
		const addExpenses = additionalExpencesItem.value.split(",");
		addExpenses.forEach(item => {
			item = item.trim();
			if (item !== "") {
				this.addExpenses.push(item);
			}
		});
	}

	//Получение доп доходов
	getAddIncome() {
		additionalIncomeItem.forEach(item => {
			const itemValue = item.value.trim();
			if (itemValue !== "") {
				this.addIncome.push(itemValue);
			}
		});
	}
	//Получение расходов за месяц
	getExpensesMonth() {
		let sum = 0;

		for (const key in this.expenses) {
			sum += this.expenses[key];
		}

		this.expensesMonth = +sum;
	}

	//Получение бюджета
	getBudget() {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}
	//Временно неиспользуемая функция оценки доходов
	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			return "У вас Высокий уровень дохода";
		} else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
			return "У вас средний уровень дохода";
		} else if (this.budgetDay < 600 && this.budgetDay >= 0) {
			return "К сожалению у вас низкий уровень доходов";
		} else {
			return "Что-то пошло не так";
		}
	}
	//Получение цели на месяц
	getTargetMonth() {
		return targetAmount.value / this.budgetMonth;
	}
	//Временно неиспользуемая функция вывода данных программы (Удалить)
	dataOut() {
		console.log("Наша программа включает в себя данные: \n\n");

		for (const key in this) {
			console.log(key + ": " + this[key]);
		}
	}

	//Получения депозита
	getInfoDeposit() {
		if (this.deposit) {
			//let regExp = new RegExp('/[0-9]/g'); Задел на будущее
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;
		}
	}
	//Расчет накоплений
	calcSavedMoney() {
		return this.budgetMonth * periodAmount;
	}
	//Расчет периода
	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}

	//Временно неиспользуемая функция обработки регулярок
	regExpCheck(regExp) {
		if (this.value !== "" && this.value.match(regExp) === null) {
			this.value = "";
		}
	}

	//Выбор банка и обработка выбора другого банка
	changePercent() {
		const valueSelect = this.value;
		if (valueSelect === "other") {
			depositPercent.value = "";
			depositPercent.style.display = "inline-block";
		} else {
			depositPercent.value = valueSelect;
			depositPercent.style.display = "none";
		}
	}
	//Вывод полей депозита
	depositHandler() {
		if (depositCheckBox.checked) {
			depositBank.style.display = "inline-block";
			depositAmount.style.display = "inline-block";
			this.deposit = true;
			depositBank.addEventListener("change", this.changePercent);
		} else {
			depositBank.style.display = "none";
			depositAmount.style.display = "none";
			depositPercent.style.display = "none";
			depositBank.value = "";
			depositAmount.value = "";
			this.deposit = false;
			depositBank.removeEventListener("change", this.changePercent);
		}
	}

	//Отслеживание событий на странице
	eventsListeners() {
		const _this = this;
		inputSalaryAmount.addEventListener("input", () => {
			if (inputSalaryAmount.value.trim() !== "") {
				execute.disabled = false;
			} else {
				execute.disabled = true;
			}
		});

		const start = this.start.bind(_this);
		const reset = this.reset.bind(_this);
		const getRange = this.getRange.bind(_this);
		const showResult = this.showResult.bind(_this);

		execute.addEventListener("click", start);
		cancel.addEventListener("click", reset);

		expensesBtnAdd.addEventListener("click", this.addExpensesBlock);
		incomeBtnAdd.addEventListener("click", this.addIncomeBlock);

		const textInputs = document.querySelectorAll(
			'input[placeholder="Наименование"]'
		);
		const numInputs = document.querySelectorAll('input[placeholder="Сумма"]');
		const percentInput = document.querySelector('input[placeholder="Процент"]');

		//Проверка вводимых знаков (Работает частично)
		textInputs.forEach(item => {
			item.addEventListener("input", () => {
				const regExp = /[а-яА-ЯёЁ]/;

				if (!item.value.match(regExp) && item.value !== "") {
					item.value = "";
				}
			});
		});

		numInputs.forEach(item => {
			item.addEventListener("input", () => {
				const regExp = /[0-9]/;

				if (!item.value.match(regExp)) {
					item.value = "";
				}
			});
		});

		percentInput.addEventListener("input", () => {
			const regExp = /[0-9]/;
			if (!percentInput.value.match(regExp)) {
				percentInput.value = "";
			}

			if (percentInput.value > 100) {
				percentInput.value = "";
				alert("Введите процент меньший 100");
			}
			if (percentInput.value > 0) {
				percentInput.value.slice(1);
			}
		});

		periodSelect.addEventListener("input", getRange);
		periodSelect.addEventListener("input", showResult);

		depositCheckBox.addEventListener("change", this.depositHandler.bind(this));
	}
}

const appData = new AppData();
appData.eventsListeners();

execute.setAttribute("disabled", true);
periodSelect.setAttribute("disabled", true);

depositCheckBox.checked = false;
depositBank.value = "";
