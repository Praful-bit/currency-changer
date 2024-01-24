const base_Url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

const dropdown = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')

for(let select of dropdown){
    for(code in countryList){
        let newOption = document.createElement('option')
        newOption.innerText = code
        newOption.value = code;
        if(select.name === 'from' && code === 'USD' ){
        newOption.selected = 'selected';
        }else if(select.name === 'to' && code === 'INR'){
        newOption.selected = 'selected'
        }
        select.append(newOption)
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag =(element)=>{
let code = element.value;
let countryCode = countryList[code]
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector('img');
img.src = newSrc
}

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault()
    
    let amount = document.querySelector('.amount input')
    let amountVal = amount.value

    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value ='1';
    }
// console.log(fromCurr.value,toCurr.value)
    const URL = `${base_Url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    let finalAmount = amountVal*rate
    msg.innerText =`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `

    console.log(rate)
})


