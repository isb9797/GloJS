let money = 90000; //Доход за месяц
let income = 'Фриланс'; //Дополнительный доход
let addExpenses = 'Заказ блюд, Подписка на кино, Новости спорта, Музыка'; //Расходы
let deposit = true; //Депозит
let mission = 1000000; //Сколько накопить хочу (Да я амбициозный засранец)
let period = 12; //За какое время

let budgetDay = money / 30;


console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length + ' символа');

console.log(
    "Период равен " + period + " месяцев",
    "\nЦель заработать " + mission + " рублей/долларов/юаней/гривен"
);


let addExpensesLower = addExpenses.toLowerCase();

console.log(addExpensesLower.split(', '));

console.log('Бюджет на день ' + budgetDay);





