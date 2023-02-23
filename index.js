//Digital Clock
const hourEl = document.getElementById("hours")
const minutesEl = document.getElementById("minutes")
const secondsEl = document.getElementById("seconds")
const ampmEl = document.getElementById("ampm")
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Dad Joke

const btnEl = document.getElementById("btn");
const apiKey = "J4ixtiaF1Oo4Md0ntV/fzQ==kgcheFJUJwIJgmP1"
const options = {
    method: "GET",
    headers: { 
        'X-Api-Key': apiKey},
};
const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1"
const jokeEl = document.getElementById("joke")




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
        jokeEl.innerText ="An error happened ⚠️, try again later";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a Joke"
        console.log(error);
    }

   
}


btnEl.addEventListener("click", getJoke)