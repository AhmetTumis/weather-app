console.log('client side js file is loaded')


let weatherForm = document.querySelector('form')
let search = document.querySelector('input')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault()
    let location = search.value
    console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data)=>{
        
            if(data.error){
                console.log(data.error)
                messageOne.textContent=data.error
            }else{
                console.log(data)
                messageOne.textContent=data.location
                messageTwo.textContent='Current temp: ' + data.weatherdata.temp + ' Precip:' + data.weatherdata.precip
                }
        })
    })
})


