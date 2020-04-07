"use strict";
//Урок 7

let isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
};

let money; //Доход за месяц

//let expenses = [];

let start = () => {
  do {
    money = parseFloat(prompt("Ваш месячный доход?"));
  } while (!isNumber(money));
};
start();

let appData = {
  income: {
    a: 10,
    b: 20
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 12,
  
  asking: function() {
    
    if (confirm('Есть ли у вас доп заработок?')){
     
      let itemIncome;

      do {
        itemIncome =  prompt('Какой доп заработок?', 'Фриланс');
      }
      while(isNumber(itemIncome));

      let cashIncome;

      do {
        cashIncome =  +prompt('Сколько в месяц?', '25000');
      }
      while(!isNumber(cashIncome));
      
  

      
      appData.income[itemIncome] = cashIncome;
    }

    

    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый переод через запятую",
      "ТВ, Интернет, Плюшки"
    ); //Расходы





    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?"); //Депозит
    let expensesKey;
    let itemMonthExpenses = [];

   
    for (let i = 0; i < 2; i++) {
      //expensesKey = prompt("Введите обязательную статью расходов", "Кредит");
      
      do {
        expensesKey = prompt("Введите обязательную статью расходов", "Кредит");
      }
      while (isNumber(expensesKey)); 
      
      
      do{
        itemMonthExpenses[i] = parseFloat(prompt("Во сколько это обойдется?"));
      }
      while (!isNumber(itemMonthExpenses[i]));

      appData.expenses[expensesKey] = itemMonthExpenses[i];
      
      
    }
    
  },
  getExpensesMonth: function() {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }

    appData.expensesMonth = sum;
  },
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getStatusIncome: function() {
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
  getTargetMonth: function() {
    return appData.mission / appData.budgetMonth;
  },
  dataOut: function(){
    console.log("Наша программа включает в себя данные: \n\n");
    

    for (let key in appData){
      console.log(key + ": " +appData[key]);
    }
  },

  getInfoDeposit: function(){
    if (appData.deposit){
      
      //let regExp = new RegExp('/[0-9]/g'); Задел на будущее
      let percent;
      do{
       percent = +prompt('Какой годовой процент?', 10);
       appData.percent = percent;
      }
      while (!isNumber(percent));
        
      

      let moneyDeposit;
      
      do {
        moneyDeposit = +prompt('Какая сумма заложена?', '10000');
        appData.moneyDeposit = moneyDeposit;
      }
      while(!isNumber(moneyDeposit));
        
      
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  },
  regExpCheck: function(str, regExp){
    // data = 'Привет мир';
    // regExp = /[а-яёА-ЯЁ]/;

    let found = str.match(regExp);
    
    return found;

  }
};




appData.asking();
appData.getInfoDeposit();
appData.getExpensesMonth();
appData.getBudget();




let countMonth = Math.ceil(appData.getTargetMonth()); //Количество месяцев накопления

console.log("Ваш уровень дохода: ", appData.getStatusIncome());

console.log(appData.addExpenses.length + " символа");

console.log(
  "Период равен " + appData.period + " месяцев",
  "\nЦель заработать " + appData.mission + " рублей/долларов/юаней/гривен"
);
console.log("Сумма обязательных расходов " + appData.expensesMonth);

console.log("Бюджет на месяц: ", appData.budgetMonth);


//Будет ли достигнута цель
if (countMonth < 0) {
  console.log("Цель не будет достигнута");
} else {
  console.log("Цель будет достигнута через " + countMonth + " месяц(а)");
}

console.log("Бюджет на день: " + appData.budgetDay);




console.log('__________________________________________________________________');
console.log(appData.dataOut());
console.log('__________________________________________________________________');

//Метод для вывода дополнительных расходов в стороку с запятой в качестве разделителя
const getExpensesStr = () =>{
  let addExpensesStr = appData.addExpenses.slice();

  for (let i = 0; i < addExpensesStr.length; i++) {
    addExpensesStr[i] = addExpensesStr[i].charAt(0).toUpperCase() + addExpensesStr[i].substr(1);
    
  }
  addExpensesStr = addExpensesStr.join(', ');
  console.log('Дополнительные расходы: ' + addExpensesStr);
};
 
getExpensesStr();