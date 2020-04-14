"use strict";
//Урок 12

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

let execute = document.getElementById("start"),
  cancel = document.querySelector('#cancel'),
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

  
  

execute.setAttribute('disabled', true);

inputSalaryAmount.addEventListener('input', () => {
  if (inputSalaryAmount.value.trim() !== ''){
    execute.disabled = false;
  } else {
    execute.disabled = true;
  }
});


let start = function(){
  appData.start.apply(appData);
};
let reset = function(){
  appData.reset.apply(appData);
};

execute.addEventListener("click", start);
cancel.addEventListener("click", reset);


expensesBtnAdd.addEventListener("click", appData.addExpensesBlock);
incomeBtnAdd.addEventListener("click", appData.addIncomeBlock);

let textInputs = document.querySelectorAll('input[placeholder="Наименование"]');
let numInputs = document.querySelectorAll('input[placeholder="Сумма"]');

//Проверка вводимых знаков (Работает частично)
textInputs.forEach(function(item){
  item.addEventListener('input', function(){
    let regExp = /[а-яА-ЯёЁ]/;
  
    
    if (!item.value.match(regExp) && item.value !== ''){
      item.value = '';
    }
  });
});

numInputs.forEach(function(item){
  item.addEventListener('input', function(){
    let regExp = /[0-9]/;
 
    
    if (!item.value.match(regExp) ){
      item.value = '';
    }
  });
});



periodSelect.addEventListener("input", appData.getRange);

let countMonth = Math.ceil(appData.getTargetMonth()); //Количество месяцев накопления


