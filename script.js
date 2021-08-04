
const input_data = document.querySelector('#input-data');
const icon = document.querySelector('.search-icon');
const container = document.querySelector('.weather-cards-container');
const toggle = document.querySelector('#temperature-scale');
const form = document.querySelector('form');
const modalContainer = document.querySelector('#error-modal-container');
const modal = document.querySelector('.error-modal');
const overlay = document.querySelector('#overlay');
const xIcon = document.querySelector('.close-modal');
const closeButton = document.querySelector('button');


// ============== Get user Input================

icon.addEventListener('click', get_input);

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    get_input();
});

function get_input(){
    if (obj == '') {
        getdata(input_data.value);
    } else if(input_data.value == ''){
        getdata(input_data.value);
    } else {
        container.innerHTML = '';
        getdata(input_data.value);
    }
}

// ============== Get weather data from API ==================

async function getdata(city){
    try{
        const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8380b8ad5d5a972e63b200eb4d739c63`);
        const response = await weather.json();
        let data = storedata(response);
        show_data(data);
        input_data.value = '';
    } catch{
       toggleErrorModal();
    }

};


// ============== Process Data and store in a object ===========

let obj = {}

function storedata(data){
    obj.name = input_data.value;
    obj.weather = data.weather[0].description;
    obj.temperature = to_celcius(data.main.temp);
    obj.icon = data.weather[0].icon;
    obj.humidity = data.main.humidity;
    return obj;
}


// ============== Display data on screen ==============

function show_data(data){
    let box = document.createElement('div');
    let close = document.createElement('span');
    let city_name = document.createElement('h2');
    let icon = document.createElement('p');
    let temperature = document.createElement('p');
    let description = document.createElement('p');

    box.className = 'display';
    close.className = 'close';
    city_name.className = 'name';
    temperature.className = 'temperature';
    description.className = 'description';
    icon.className = 'icon';


    close.textContent = 'x';
    city_name.textContent = data.name;
    temperature.innerHTML = data.temperature + '&deg;';
    description.textContent = data.weather;
    icon.innerHTML = `<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.icon}.svg">`

    box.appendChild(close);
    box.appendChild(city_name);
    box.appendChild(icon);
    box.appendChild(temperature);
    box.appendChild(description);
    
    container.appendChild(box);

    close.addEventListener('click',(e) => {
        (e.currentTarget.parentNode.style.display = 'none');
    });
    
};

// ============== Temperature conversion functions ============

function to_celcius(kelvin){
    return Math.round((kelvin - 273.15));
}

function to_celcius1(fah){
    return Math.round((fah - 32) * 5/9);
}

function to_fahrenheit(celcius){
    return Math.round((celcius * (9/5) + 32));
}

// ========= Toggle function ===========

toggle.addEventListener('click', function(){
    if (toggle.checked) {
        let fah_tem = to_fahrenheit(obj.temperature);
            obj.temperature = fah_tem;
            container.innerHTML = '';
            show_data(obj);
    } else {
        let cel_tem = to_celcius1(obj.temperature);
        obj.temperature = cel_tem;
        container.innerHTML = '';
        show_data(obj);
    }
})

// ============ Show Error Modal ===========

let modalOpen = false;

function toggleErrorModal(){
    if (modalOpen) {
      modal.style.transform = "scale(0)";
      modalContainer.style.pointerEvents =  "none";
      overlay.style.opacity = "0";
    } else {
      modal.style.transform = "scale(1)";
      modalContainer.style.pointerEvents =  "auto";
      overlay.style.opacity = "1";
    }
}

xIcon.addEventListener("click", () => {
    modal.style.transform = "scale(0)";
    overlay.style.opacity = "0";
});
closeButton.addEventListener("click", () => {
    modal.style.transform = "scale(0)";
    overlay.style.opacity = "0";
});