//Digital Clock
const hourEl = document.getElementById("hours")
const minutesEl = document.getElementById("minutes")
const secondsEl = document.getElementById("seconds")
const ampmEl = document.getElementById("ampm")
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Dad Joke
const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const apiKey = "J4ixtiaF1Oo4Md0ntV/fzQ==kgcheFJUJwIJgmP1"
const options = {
    method: "GET",
    headers: { 
        'X-Api-Key': apiKey},
};
const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1"
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Feedback
const ratingEls = document.querySelectorAll(".rating");
const btnFBEl = document.getElementById("btnFB");

const containerEl = document.getElementById("containerFB");

let selectedRating = ""; //we create a variable with initial value of empty string.




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Digital Clock
const updateClock = () =>{
    let h = new Date().getHours();
    // console.log(h);
    let m = new Date().getMinutes();
    // console.log(m);
    let s = new Date().getSeconds();
    let ampm = "AM"

    if (h > 12) {
        h = h-12
        ampm = "PM"
    }

    //Because digital clocks have two digits
    h = h <10 ? "0" + h : h;
    m = m <10 ? "0" + m : m;
    s = s <10 ? "0" + s : s;


    hourEl.innerText = h;
    minutesEl.innerText = m;
    secondsEl.innerText = s;
    ampmEl.innerText = ampm;
    setTimeout(()=>{
        updateClock()
    }, 1000)
}

updateClock()
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Dad Joke
//    https://api-ninjas.com/api
const getJoke = async () => {
    try {
        jokeEl.innerText = "Updating...";
        btnEl.disabled = true; //make the button disable to avoid double clicking
        btnEl.innerText = "Loading..."
        const response = await fetch(apiURL, options) //we need to change it to asynchronous
        const data = await response.json()
        // console.log(data[0]); //there is a delay to see the results
    
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a Joke"
    
    
        jokeEl.innerText = data[0].joke;
        
    } catch (error) {
        jokeEl.innerText ="An error happened ⚠️, Please try again later";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a Joke"
        console.log(error);
    }
}

btnEl.addEventListener("click", getJoke)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Feedback
ratingEls.forEach((ratingEl) => {
    ratingEl.addEventListener("click", (event)=> {
        // console.log(event.target.innerText || event.target.parentNode.innerText); //even when the user clicks on img, we'll have the innerText
        removeActive(); //we need to call the function (removeActive) and then add "active" class to the one that is clicked.
        selectedRating = event.target.innerText || event.target.parentNode.innerText;
        event.target.classList.add("active");
        event.target.parentNode.classList.add("active");
    });
});

const reload = () => {
    window.location.reload()
}

btnFBEl.addEventListener("click", () => {
    if (selectedRating == "") {
        window.alert("You need to select a feedback to send review!")
    }else 
    if (selectedRating !== "") {
        containerEl.innerHTML = `
        <p class="thankYou">Thank you! </p>
        <p class="feedback">Feedback: ${selectedRating}</p>
        <p class="para">We'll use your feedback to improve our jokes!</p>
        `
        const btnBackEl = document.createElement("button");
        btnBackEl.innerText = "Back";
        containerEl.appendChild(btnBackEl);
        btnBackEl.classList.add('btnBack');
        btnBackEl.addEventListener("click", reload)
    }
})




const removeActive = () => {
    ratingEls.forEach((ratingEl) => {
        ratingEl.classList.remove("active")
    })
}

// const linkCss = document.createElement("link");
// linkCss.href = "style.css";
// linkCss.rel = "stylesheet";
// linkCss.type = "text/css";
// document.querySelector('head').appendChild(linkCss);

