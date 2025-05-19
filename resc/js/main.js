let valtable = {
  "income": [],
  "casa": [],
  "alimentacao": [],
  "saude": [],
  "transporte": [],
}
let format = {
  "income": "Renda",
  "casa": "Casa",
  "alimentacao": "Alimentação",
  "saude": "Saúde",
  "transporte": "Transorte",
}
let totals = {}
let finalvalue = 0
let incomium = 0

document.querySelectorAll('.cat-input').forEach(i => {
  const siblings = Array.from(i.parentNode.querySelectorAll('.cat-input'));
  const index = siblings.indexOf(i);
  valtable[i.parentElement.getAttribute('id')].push(0)
  i.setAttribute('identifier', index)
  i.childNodes[1].addEventListener('input', updateVals)
})

function updateVals(val){
  let value = (val.currentTarget.value).replace(",", "")
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

updatePage()