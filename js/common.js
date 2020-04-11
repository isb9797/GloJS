"use strict";
//Урок 12

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

let execute = document.getElementById("start"),
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

let appData = {
  income: {},
  budget: 0,
  incomeMonth: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  start: function () {
    appData.budget = +inputSalaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    periodSelect.addEventListener("input", this.showResult);
    incomePeriodValue.value = appData.calcPeriod();
  },
  getRange: function () {
    periodAmount.textContent = periodSelect.value;
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesBtnAdd);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesBtnAdd.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeBtnAdd);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomeBtnAdd.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;

      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;

      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpencesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }

    appData.expensesMonth = +sum;
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас Высокий уровень дохода";
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return "К сожалению у вас низкий уровень доходов";
    } else {
      return "Что-то пошло не так";
    }
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },
  dataOut: function () {
    console.log("Наша программа включает в себя данные: \n\n");

    for (let key in appData) {
      console.log(key + ": " + appData[key]);
    }
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      //let regExp = new RegExp('/[0-9]/g'); Задел на будущее
      let percent;
      do {
        percent = +prompt("Какой годовой процент?", 10);
        appData.percent = percent;
      } while (!isNumber(percent));

      let moneyDeposit;

      do {
        moneyDeposit = +prompt("Какая сумма заложена?", "10000");
        appData.moneyDeposit = moneyDeposit;
      } while (!isNumber(moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * periodAmount;
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  regExpCheck: function (str, regExp) {
    let found = str.match(regExp);

    return found;
  },
};

execute.setAttribute('disabled', true);

inputSalaryAmount.addEventListener('input', () => {
  if (inputSalaryAmount.value.trim() !== ''){
    execute.disabled = false;
  } else {
    execute.disabled = true;
  }
});

execute.addEventListener("click", appData.start);

expensesBtnAdd.addEventListener("click", appData.addExpensesBlock);
incomeBtnAdd.addEventListener("click", appData.addIncomeBlock);

periodSelect.addEventListener("input", appData.getRange);

let countMonth = Math.ceil(appData.getTargetMonth()); //Количество месяцев накопления


