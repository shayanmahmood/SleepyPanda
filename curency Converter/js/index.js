const dropList = document.querySelectorAll('.drop-list select'),
    fromCurrency = document.querySelector('.from select'),
    toCurrency = document.querySelector('.to select'),
    getBtn = document.querySelector('form button'),
    loader = document.querySelector('.loader');


for (let i = 0; i < dropList.length; i++) {
    for (country_code in country_list) {
        let selected;
        if (i == 0) {
            selected = country_code == 'USD' ? "selected" : '';
        } else if (i == 1) {
            selected = country_code == 'NPR' ? "selected" : '';
        }
        let optionTAg = `<option value="${country_code}" ${selected}>${country_code}</option>`
        dropList[i].insertAdjacentHTML('beforeend', optionTAg)
    }
    dropList[i].addEventListener('change', e => {
        loadFlag(e.target);
    })
}

function loadFlag(element) {
    for (code in country_list) {
        if (code === element.value) {
            let imgTag = element.parentElement.querySelector('img')
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener('load', () => {
    loader.style.display = 'none'
    exchangeRate();
})

getBtn.addEventListener('click', e => {
    e.preventDefault();
    exchangeRate();
})

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function exchangeRate() {
    const amount = document.querySelector(".amount input");
    // const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    let exchange_rate = document.querySelector('.exchange-rate');
    exchange_rate.innerHTML = 'Getting the exchange rates...'
    let url = `https://v6.exchangerate-api.com/v6/08c18431d89b2189677fd6a7/latest/${fromCurrency.value}`
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchange_rate.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        console.log(totalExchangeRate);
    }).catch(() => exchange_rate.innerHTML = 'SOMETHING WENT WRONG V R TRYING..')
}

