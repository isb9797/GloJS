"use strict";
//Урок 15

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

let execute = document.getElementById("start"),
  cancel = document.querySelector("#cancel"),
  incomeBtnAdd = document.getElementsByTagName("button")[0],
  expensesBtnAdd = document.getElementsByTagName("button")[1],
  depositCheckBox = document.querySelector("#deposit-check"),
  addIncomeItem = document.querySelectorAll(".additional_income-item"),
  //Предполагается использование цикла, но пока об этом думать рановато)
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
  incomeItems = document.querySelectorAll(".income-items"),
  inputExpencesTitle = document.querySelectorAll(".expenses-title")[1],
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpencesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector('[type="range"]'),
  periodAmount = document.querySelector(".period-amount");

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

  start() {
    this.budget = +inputSalaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();

    const inputsLeft = document.querySelectorAll("input[type=text]");

    inputsLeft.forEach(function (item) {
      item.disabled = true;
    });

    execute.style.display = "none";
    cancel.style.display = "block";
  }

  reset() {
    execute.style.display = "block";
    cancel.style.display = "none";
    const _this = this;

    expensesItems.forEach((item) => {
      item.querySelectorAll('input[type="text"]').forEach((item) => {
        item.value = "";
      });
    });

    document.querySelectorAll('input[type="text"]').forEach((item) => {
      item.value = "";
    });
    inputSalaryAmount.value = "";
    budgetMonthValue.value = 0;
    budgetDayValue.value = 0;
    expensesMonthValue.value = 0;
    additionalExpensesValue.value = "";
    additionalIncomeValue.value = "";
    targetMonthValue.value = 0;
    let showResult = this.showResult.bind(_this);
    periodSelect.removeEventListener("input", showResult);
    incomePeriodValue.value = 0;

    this.budget = 0;
    this.budgetMonth = 0;
    this.budgetDay = 0;
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.addIncome = [];
    incomePeriodValue.value = 0;

    let inputsLeft = document.querySelectorAll("input[type=text]");

    inputsLeft.forEach((item) => {
      item.disabled = false;
    });
    execute.disabled = true;
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());

    incomePeriodValue.value = this.calcPeriod();
  }
  getRange() {
    periodAmount.textContent = periodSelect.value;
  }
  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    let textNull = cloneExpensesItem.querySelectorAll('input[type="text"]');
    textNull.forEach(function (item) {
      item.value = "";
    });

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnAdd);
    expensesItems = document.querySelectorAll(".expenses-items");

    if (expensesItems.length === 3) {
      expensesBtnAdd.style.display = "none";
    }
  }
  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    let textNull = cloneIncomeItem.querySelectorAll('input[type="text"]');
    textNull.forEach((item) => {
      item.value = "";
    });

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnAdd);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeBtnAdd.style.display = "none";
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;

      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;

      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpenses() {
    let addExpenses = additionalExpencesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    let sum = 0;

    for (let key in this.expenses) {
      sum += this.expenses[key];
    }

    this.expensesMonth = +sum;
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
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
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  dataOut() {
    console.log("Наша программа включает в себя данные: \n\n");

    for (let key in this) {
      console.log(key + ": " + this[key]);
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      //let regExp = new RegExp('/[0-9]/g'); Задел на будущее
      let percent;
      do {
        percent = +prompt("Какой годовой процент?", 10);
        this.percent = percent;
      } while (!isNumber(percent));

      let moneyDeposit;

      do {
        moneyDeposit = +prompt("Какая сумма заложена?", "10000");
        this.moneyDeposit = moneyDeposit;
      } while (!isNumber(moneyDeposit));
    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodAmount;
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  regExpCheck(regExp) {
    if (this.value !== "" && this.value.match(regExp) === null) {
      this.value = "";
    }
  }

  eventsListeners() {
    let _this = this;
    inputSalaryAmount.addEventListener("input", () => {
      if (inputSalaryAmount.value.trim() !== "") {
        execute.disabled = false;
      } else {
        execute.disabled = true;
      }
    });

    let start = this.start.bind(_this);
    let reset = this.reset.bind(_this);
    let getRange = this.getRange.bind(_this);
    let showResult = this.showResult.bind(_this);

    execute.addEventListener("click", start);
    cancel.addEventListener("click", reset);

    expensesBtnAdd.addEventListener("click", this.addExpensesBlock);
    incomeBtnAdd.addEventListener("click", this.addIncomeBlock);

    let textInputs = document.querySelectorAll(
      'input[placeholder="Наименование"]'
    );
    let numInputs = document.querySelectorAll('input[placeholder="Сумма"]');

    //Проверка вводимых знаков (Работает частично)
    textInputs.forEach((item) => {
      item.addEventListener("input", function () {
        let regExp = /[а-яА-ЯёЁ]/;

        if (!item.value.match(regExp) && item.value !== "") {
          item.value = "";
        }
      });
    });

    numInputs.forEach((item) => {
      item.addEventListener("input", function () {
        let regExp = /[0-9]/;

        if (!item.value.match(regExp)) {
          item.value = "";
        }
      });
    });

    periodSelect.addEventListener("input", getRange);
    periodSelect.addEventListener("input", showResult);
  }
}

const appData = new AppData();
appData.eventsListeners();

execute.setAttribute("disabled", true);
periodSelect.setAttribute("disabled", true);
