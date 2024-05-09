const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_temp = document.getElementById("city_temp");
const temp_status = document.getElementById("temp_status");
const temp_val = document.getElementById("temp_val");
const dataHide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");

const getCurrentDay = () =>{
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Mondat";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let days = weekday[currentTime.getDay()];
    day.innerText = days;
};
getCurrentDay();

const getCurrentDate = () =>{
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];
    var now = new Date();
    var date = now.getDate();
    var month = months[now.getMonth()];
  today_date.innerText = `${date} ${month}` 
}
getCurrentDate();

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
    city_temp.innerText = `Plz write the name before search`;
    city_temp.style.color = "red";
    dataHide.classList.add(`data_hide`);
    }
    else {
        try{
             let url =
            `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=6230a002bb5a530131cffeccc2bf5a4e`;

        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        const arrData = [data];

        city_temp.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
        temp_val.innerText = arrData[0].main.temp;
        // temp_status.innerText = arrData[0].weather[0].main;
        const tempMood = arrData[0].weather[0].main;
        if(tempMood == "Clear"){
            temp_status.innerHTML =
              "<i class='fa-solid fa-sun' style='color:#f5ed07'></i>";
        }
        if (tempMood == "Clouds") {
          temp_status.innerHTML =
            "<i class='fa-solid fa-cloud ' style='color:rgb(0, 217, 255)'></i>";
        }
        if (tempMood == "Rain") {
          temp_status.innerHTML =
            "<i class='fa-solid fa-cloud-showers-heavy' style='color:rgb(0, 217, 255)'></i>";
        }
        if (tempMood == "Fog" || tempMood == "Mist") {
          temp_status.innerHTML =
            "<i class='fa-solid fa-smog' style='color:#8f8f8f'></i>";
        }
        else{
             temp_status.innerHTML =
               "<i class='fa-solid fa-sun' style='color:#f5ed07'></i>";
        }
        dataHide.classList.remove(`data_hide`);
        }
        catch{
            city_temp.innerText = `Plz Enter The City Name Properly`;
            city_temp.style.color = "red";
            dataHide.classList.add(`data_hide`);
        }
      
    }
}

submitBtn.addEventListener("click", getInfo);