// DOM Elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/0.8/");
  const data = await res.json();

  const user = data.results[0].user;

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(provideData = data) {
  // clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  provideData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(
      item.money
    )} `;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double everyone money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort the Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// show Millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// calculate Wealth
function calculateWealth() {
  let wealth = data.reduce((acc, user) => (acc += user.money), 0);
  wealth = formatMoney(wealth);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${wealth}</strong></h3>`;
  main.appendChild(wealthEl);
}
// Event Handler
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
