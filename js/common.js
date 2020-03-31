"use strict";
//Урок 4

let money = parseFloat(prompt("Ваш месячный доход?", "100000")); //Доход за месяц
let income = "Фриланс"; //Дополнительный доход
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый переод через запятую",
  "ТВ, Интернет, Плюшки"
); //Расходы

let deposit = confirm("Есть ли у вас депозит в банке?"); //Депозит
let mission = 1000000; //Сколько накопить хочу (Да я амбициозный засранец)
let period = 12; //За какое время

let expenses1 = prompt("Введите обязательную статью расходов", "Кредит");
let expenses2 = prompt("Введите обязательную статью расходов", "Машина");

let amount1 = parseFloat(prompt("Во сколько это обойдется?", "20000"));
let amount2 = parseFloat(prompt("Во сколько это обойдется?", "1000"));

const showTypeOf = (a, b, c) => {
  let arr = [typeof a, typeof b, typeof c];
  return arr;
};

//Отработал тернарный оператор условия (В жизни он таким длинным не будет :) )

const getExpensesMonth = (a, b) => {
  let sum = a + b;
  return sum;
};

const getAccumulatedMonth = (expenses, allMoney) => {
  let accum = allMoney - expenses;
  return accum;
};

let accumulatedMonth = getAccumulatedMonth(
  getExpensesMonth(amount1, amount2),
  money
);
let budgetDay = Math.floor(accumulatedMonth / 30);

const getStatusIncome = () => {
  if (budgetDay >= 1200) {
    return "У вас Высокий уровень дохода";
  } else if (budgetDay < 1200 && budgetDay >= 600) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 600 && budgetDay >= 0) {
    return "К сожалению у вас низкий уровень доходов";
  } else return "Что-то пошло не так";
};

const getTargetMonth = (target, accumMonth) => {
  let result = target / accumMonth;
  return result;
};

let countMonth = Math.ceil(getTargetMonth(mission, accumulatedMonth)); //Количество месяцев накопления

//console.log('getExpensesMonth(amount1, amount2): ', getExpensesMonth(amount1, amount2));

console.log("Ваш уровень дохода: ", getStatusIncome());

console.log(showTypeOf(money, income, deposit));

console.log(addExpenses.length + " символа");

console.log(
  "Период равен " + period + " месяцев",
  "\nЦель заработать " + mission + " рублей/долларов/юаней/гривен"
);

console.log(
  "Сумма обязательных расходов " + getExpensesMonth(amount1, amount2)
);

let addExpensesLower = addExpenses.toLowerCase();
console.log("Обязательные расходы " + addExpensesLower.split(", "));

console.log("Бюджет на месяц: ", accumulatedMonth);
console.log("Цель будет достигнута через ", countMonth + " месяц(а)");

console.log("Бюджет на день: " + budgetDay);
