//Урок 10

"use strict";

function bibliografia() {
  const books = document.querySelectorAll(".book"),
    bookOne = books[1],
    bookTwo = books[0],
    bookThree = books[4],
    bookFour = books[3],
    bookFive = books[5],
    bookSix = books[2];

  //Восстанавливаю порядок книг
  bookTwo.before(bookOne);
  bookSix.before(bookThree);
  bookFour.after(bookSix);
  bookSix.before(bookFive);

  //Замена фона на странице
  document.body.style.backgroundImage = 'url("../image/you-dont-know-js.jpg")';

  //Удаление рекламы со страницы
  const adv = document.querySelector(".adv");
  adv.remove();

  //Замена заголока в третьей книге
  const aInBookThree = bookThree.querySelector("a");
  aInBookThree.textContent = "Книга 3. this и Прототипы Объектов";

  //Добавление восьмой главы в шестую книгу
  const listOfSixBook = bookSix.querySelectorAll("li");
  const sevenParagraphOfSixBook = listOfSixBook[9];
  sevenParagraphOfSixBook.insertAdjacentHTML(
    "beforebegin",
    "<li>Глава 8: За пределами ES6</li"
  );

  //Изменение порядка глав во 2-ой и в 5-ой книгах
  const listOfTwoBook = bookTwo.querySelectorAll("li");

  listOfTwoBook[9].after(listOfTwoBook[2]);
  listOfTwoBook[9].before(listOfTwoBook[7]);
  listOfTwoBook[3].after(listOfTwoBook[6]);
  listOfTwoBook[6].after(listOfTwoBook[8]);

  const listofFiveBook = bookFive.querySelectorAll("li");
  listofFiveBook[8].before(listofFiveBook[5]);
  listofFiveBook[4].after(listofFiveBook[2]);
  listofFiveBook[1].after(listofFiveBook[9]);
}

bibliografia();
