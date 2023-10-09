const selects = document.querySelectorAll("select");
const input = document.querySelector("input")
const valueConvertion = document.querySelector("p")
const apiKey = "";
let ulr = //"https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD"


function createOption(index, coinSelected, value) {
  const newOption = document.createElement("option")
  coinSelected == value ? newOption.setAttribute("selected", "") : ""
  newOption.innerText = value
  selects[index].appendChild(newOption)
}

async function getFetch() {
  const exchangeRate = await fetch(ulr)
  const response = await exchangeRate.json()
  return response.conversion_rates;
}

async function conversion() {
  ulr = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${selects[0].value}`
  const coins = await getFetch()
  valueConvertion.innerText = (input.value * coins[selects[1].value]).toFixed(2)
}

async function init() {
  for (let coin in await getFetch()) {
    if(coin !== "ALL") {
      createOption(0, "USD", coin.toUpperCase())
      createOption(1, "BRL", coin.toUpperCase())
    }
  }

  conversion()
}
init()

selects.forEach(input => {
  input.addEventListener("change", conversion)
});
input.addEventListener("input", conversion)