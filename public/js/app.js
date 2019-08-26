
// public/app.js is a CLIENT-side file, so you can use browser functions like fetch()


// grab the value from the form in index.hbs
const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //search.value is the value on submit
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault() // don't try to go to another route after submit
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''
// use search value as a query string to /weather?address=THING and fetch data
  fetch('/weather?address=' + encodeURIComponent(search.value)).then(response => {
  response.json().then(data => {
    if (data.error){
      messageOne.textContent = data.error
    }
    else{
    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
    }
  })
 })
})