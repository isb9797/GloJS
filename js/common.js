"use strict";
//Урок 2

let money = parseFloat(prompt("Ваш месячный доход?", "100000")); //Доход за месяц
let income = "Фриланс"; //Дополнительный доход
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый переод через запятую",
  "ТВ, Интернет, Плюшки"
); //Расходы
let deposit = true; //Депозит
let mission = 1000000; //Сколько накопить хочу (Да я амбициозный засранец)
let period = 12; //За какое время

let expenses1 = prompt("Введите обязательную статью расходов", "Кредит");
let expenses2 = prompt("Введите обязательную статью расходов", "Машина");

let amount1 = parseFloat(prompt("Во сколько это обойдется?", "20000"));
let amount2 = parseFloat(prompt("Во сколько это обойдется?", "1000"));

let budgetMonth = money - amount1 - amount2;
let budgetDay = Math.floor(budgetMonth / 30);

let countMonth = Math.ceil(mission / budgetMonth); //Количество месяцев накопления

budgetDay >= 1200
  ? console.log("У вас Высокий уровень дохода")
  : budgetDay < 1200 && budgetDay >= 600
  ? console.log("У вас средний уровень дохода")
  : budgetDay < 600 && budgetDay >= 0
  ? console.log("К сожалению у вас низкий уровень доходов")
  : budgetDay < 0
  ? console.log("Что-то пошло не так")
  : false;
//Отработал литеральный оператор условия (В жизни он таким длинным не будет :) )

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length + " символа");

console.log(
  "Период равен " + period + " месяцев",
  "\nЦель заработать " + mission + " рублей/долларов/юаней/гривен"
);

let addExpensesLower = addExpenses.toLowerCase();

console.log(addExpensesLower.split(", "));

console.log("Бюджет на месяц: ", budgetMonth);
console.log("Цель будет достигнута через ", countMonth + " месяц(а)");

console.log("Бюджет на день: " + budgetDay);
