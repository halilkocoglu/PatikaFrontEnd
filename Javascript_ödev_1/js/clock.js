let name = prompt("Adınızı giriniz: ")

let info = document.querySelector("#myName")
info.innerHTML = `${name} `

const weekday = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"];





setInterval(showTime, 1000);
        function showTime() {
            const time = new Date();
            let hour = time.getHours();
            let min = time.getMinutes();
            let sec = time.getSeconds();
            let day = weekday[time.getDay()];
            am_pm = "AM";
            if (hour > 12) {
                hour -= 12;
                am_pm = "PM";
            }
            if (hour == 0) {
                hr = 12;
                am_pm = "AM";
            }
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let currentTime = `${hour}:${min}:${sec} ${am_pm} ${day}`
            document.getElementById("myClock")
                .innerHTML = currentTime;
        }
showTime();
