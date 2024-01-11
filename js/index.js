let searchInput = document.querySelector("#search")
let btnSubmit = document.querySelector("#submit")
let Weather = document.querySelector(".row")
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDay;
let cartona=``;
let afterday;
let finalDay;

async function getApi(countryName){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea2b870af6ed4b058e5155121240601&q=${countryName}&days=3`);
    const finalResponse = await response.json()
    display(finalResponse)
    console.log(finalResponse);
    
}
btnSubmit.addEventListener('click' , function(e){
    e.preventDefault();
    getApi(searchInput.value)
    searchInput.value = "" 
})
searchInput.addEventListener("input" , function(){
    getApi(searchInput.value)
    
})

function display(arr){
    currentDay = new Date();
    cartona =`<div class="col-lg-4 g-1">
    <div class="item text-white rounded-3" style="background-color: #323544; width: 100%; height: 100%;">
      <div class="headDiv d-flex justify-content-between rounded-3">
        <div id="day">${days[currentDay.getDay()]}</div>
        <div id="date">${currentDay.getDate() } ${months[currentDay.getMonth()]}</div>
      </div>
      <div class="py-4 px-3">
        <div id="location" class="text-white-50">${arr.location.name}</div>
        <div id="detTemprechar" class="fw-bolder">
        ${arr.current.temp_c}&#176c <img src="https:${arr.current.condition.icon}" class="w-25" alt="">
        </div>
        <div id="State" class="text-info my-3">
        ${arr.current.condition.text}
        </div>
        <span class="me-4"><img src="img/icon-umberella.png" alt=""> 20%</span>
        <span class="me-4"><img src="img/icon-wind.png" alt=""> 18km/h</span>
        <span><img src="img/icon-compass.png" alt=""> East</span>
      </div>
    </div>
  </div>`
  for(let i = 1; i<arr.forecast.forecastday.length; i++){
    afterday = arr.forecast.forecastday[i].date
    currentDay = new Date(afterday)
    finalDay = days[currentDay.getDay()]
    cartona += `<div class="col-lg-4 g-1">
    <div class="item text-white rounded-3" style="background-color: #323544; width: 100%; height: 100%;">
      <div class="headDiv text-center rounded-3">
        <div id="secDay">${finalDay}</div>
      </div>
      <div class="d-flex flex-column align-items-center py-5">
        <div class="py-3"><img src="https:${arr.forecast.forecastday[i].day.condition.icon}" alt="" class="w-100"></div>
        <div class="fw-bolder fs-2">
        ${arr.forecast.forecastday[i].day.maxtemp_c}&#176c
        </div>
        <div class="text-white-50">
        ${arr.forecast.forecastday[i].day.mintemp_c}&#176c
        </div>
        <div class="text-info py-3">
        ${arr.forecast.forecastday[i].day.condition.text}
        </div>
      </div>
    </div>
  </div>`
  }
  if(arr.location.name != undefined)
    {
        Weather.innerHTML = cartona;
    }
    else
    {
        alert("Please Enter Valid Country");
    }
}
getApi("egypt")
