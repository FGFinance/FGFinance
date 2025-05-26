let valtable = { //Each table item
  "income": [],
  "casa": [],
  "alimentacao": [],
  "saude": [],
  "transporte": [],
  "lazer": []
}

let format = { //How each table item should display formally
  "income": "Renda",
  "casa": "Casa",
  "alimentacao": "Alimentação",
  "saude": "Saúde",
  "transporte": "Transorte",
  "lazer": "Lazer"
}

let tabWarn = { //How many % you can spend in each 

}

let totals = {} //Total of each category, used for parsing percentages
let finalvalue = 0 //Final value, duh.
let incomium = 0 //The total income amount

document.querySelectorAll('.cat-input').forEach(i => { //For each input section present in the page...
  const siblings = Array.from(i.parentNode.querySelectorAll('.cat-input'));
  const index = siblings.indexOf(i);
  valtable[i.parentElement.getAttribute('id')].push(0)
  i.setAttribute('identifier', index)
  i.childNodes[1].addEventListener('input', updateVals)
  i.childNodes[1].setAttribute('value', 0.00)
})

function updateVals(val){
  let value = (val.currentTarget.value).replace(",", "") //Replace the , with  .
  const valtargetcat = val.currentTarget.parentElement.parentElement.getAttribute('id')
  const valtargetident = val.currentTarget.parentElement.getAttribute('identifier')
  const isdeduct = val.currentTarget.parentElement.getAttribute('deduct')

  valtable[valtargetcat][valtargetident] = Number.isNaN(val) || value == "" ? 0 : (isdeduct ? -parseFloat(value) : parseFloat(value))
  //God i love ternaries.
  updatePage()
}

function updatePage() {
  let text = ''
  finalvalue = 0
  incomium = 0

  for (i in valtable) {
    let total = 0
    for (let x = 0; x < valtable[i].length; x++) {
      total += valtable[i][x]
    }
    totals[i] = total;
    if (i != "income") { finalvalue += total } else { incomium = total }
  }
  
  for (i in valtable) {
    let total = totals[i];
    let percent = (i !== "income" && finalvalue !== 0) ? (total / finalvalue * 100).toFixed(1) : '';
    let extra = percent ? ` - ${percent}%` : '';
    console.log(parseFloat(document.getElementById('finals').innerHTML))
    console.log(incomium * 0.15)
    if(parseFloat(document.getElementById('finals').innerHTML >= (incomium * 0.15))){
      console.log("WOOP WOOP!")
      handleWarning(i, percent)
    }
    if(i!='income'){text = text + `${i == 'casa' ? "" : "<br>"}` + `${format[i]}: R$${total.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${extra}`}
    document.getElementById('catover').innerHTML = text
    document.getElementById(i).querySelectorAll('.cat-end')[0].innerHTML = `Total: R$${total.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${extra}`;
  }
  
  document.getElementById('incomef').innerHTML = incomium.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('spendingst').innerHTML = finalvalue.toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  document.getElementById('finals').innerHTML = (incomium - finalvalue).toLocaleString('br', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (parseFloat(document.getElementById('finals').innerHTML) < 0) {
    document.getElementById('finals').style.color = 'rgb(255,0,0)'
  }
  else {
    document.getElementById('finals').style.color = 'var(--universalfont)'
  }
}

function switchMode(){
  const cmode = document.body.className
  const nmode = cmode == "light-mode" ? "dark-mode" : "light-mode"
  document.body.className = nmode
  document.getElementById("modeswitchb").innerHTML = nmode == "dark-mode" ? "☀️" : "🌙"
}

function handleWarning(){
  console.log("Unimplemented.")
}

updatePage()