"use strict";
//Урок 5

let isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

let money; //Доход за месяц
let income = "Фриланс"; //Дополнительный доход
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый переод через запятую",
  "ТВ, Интернет, Плюшки"
); //Расходы

let deposit = confirm("Есть ли у вас депозит в банке?"); //Депозит
let mission = 1000000; //Сколько накопить хочу (Да я амбициозный засранец)
let period = 12; //За какое время
let expenses = [];
let itemMonthExpenses = [];

let start = () => {
  do {
    money = parseFloat(prompt("Ваш месячный доход?"));
  } while (!isNumber(money));
};
start();

const showTypeOf = (a, b, c) => {
  let arr = [typeof a, typeof b, typeof c];
  return arr;
};

//Отработал тернарный оператор условия (В жизни он таким длинным не будет :) )

const getExpensesMonth = () => {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов", "Кредит");

    while (!isNumber(itemMonthExpenses[i])) {
      itemMonthExpenses[i] = parseFloat(prompt("Во сколько это обойдется?"));
    } //Проверка на число

    sum += itemMonthExpenses[i];
  }
  return sum;
};

let expensesMonth = getExpensesMonth();

const getAccumulatedMonth = (expenses, allMoney) => {
  let accum = allMoney - expenses;

  return accum;
};

let accumulatedMonth = getAccumulatedMonth(expensesMonth, money);

let budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = () => {
  if (budgetDay >= 1200) {
    return "У вас Высокий уровень дохода";
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 600 && budgetDay >= 0) {
    return "К сожалению у вас низкий уровень доходов";
  } else {
    return "Что-то пошло не так";
  }
};

const getTargetMonth = (target, accumMonth) => {
  let result = target / accumMonth;

  return result;
};

let countMonth = Math.ceil(getTargetMonth(mission, accumulatedMonth)); //Количество месяцев накопления
let informCountMonth = "";

//console.log('getExpensesMonth(amount1, amount2): ', getExpensesMonth(amount1, amount2));

console.log("Ваш уровень дохода: ", getStatusIncome());

console.log(showTypeOf(money, income, deposit));

console.log(addExpenses.length + " символа");

console.log(
  "Период равен " + period + " месяцев",
  "\nЦель заработать " + mission + " рублей/долларов/юаней/гривен"
);

console.log("Сумма обязательных расходов " + expensesMonth);

let addExpensesLower = addExpenses.toLowerCase();
console.log("Обязательные расходы " + addExpensesLower.split(", "));

console.log("Бюджет на месяц: ", accumulatedMonth);

if (countMonth < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log("Цель будет достигнута через " + countMonth + " месяц(а)");
}

console.log("Бюджет на день: " + budgetDay);
