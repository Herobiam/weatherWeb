

console.log('java script file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data) =>{
        console.log(data)
    })
})

fetch('/weather?address=Windhoek').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)

        }

    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherForecast = document.querySelector('#weather')
const errorMessage = document.querySelector('#error')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    weatherForecast.textContent ='loading..'

    fetch('http://localhost:3005/weather?address='+ location + '').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            errorMessage.textContent = data.error
            weatherForecast.textContent =''
        }else{
            weatherForecast.textContent = data.location

        }

    })
})

    
    console.log(location)
})