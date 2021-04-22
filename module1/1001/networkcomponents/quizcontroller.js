const question = {
    choices1: "Equipment gadget that splits the organization association between different gadgets.",
    choices2: "Embrace each physical elements and also the software system needed to put in pc networks in each organizations and houses.",
    choices3: "That offer even as get administrations from totally different companions in a very workgroup network",
    choices4: "A gadget that adds 3G or 4G (LTE) cell network to PCs, PCs and different tablets.",
    answer: 2
}


const btnCheck = document.querySelector('.primary-btn')
const textChoices = Array.from(document.querySelectorAll('.choice-text'))
const itemsDisabled = document.querySelector('.items')

let dataNumber;
let selectedAnswer;

onload = showQuestion = () => {
    const numbers = generateRandomChoices()
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i]
        textChoices[i].dataset.number = number
        textChoices[i].innerText = question['choices' + number]
    }
    
}

document.body.addEventListener('click', (e) => {
    const target = e.target
    const isMatch = target.matches('[data-number]')
    const PrevSelected = textChoices.find( choice => choice.classList.contains('selected')) 
    
    if (isMatch) {
        selectedAnswer = target
        dataNumber = target.dataset.number
        target.classList.add('selected')
        btnCheck.classList.remove('remove-pointer')
        btnCheck.style.opacity = '1'
        PrevSelected !== undefined ? PrevSelected.classList.remove('selected') : false
    }
})

generateRandomChoices = () => {
    let unique_numbers = []

    while (unique_numbers.length < 4) {
      for (let i = 0; i < 10; i++) {
          const n = Math.floor(Math.random() * (5 - 1)) + 1
          if (unique_numbers.indexOf(n) == -1) unique_numbers.push(n)
      }
  
  }
      return unique_numbers
}



let db = new Localbase('db')




checkAnswer = () => {
    const result = dataNumber == question.answer
    const resultContainer = document.querySelector('.result')
    const text = btnCheck.innerText
    const resultText = document.querySelector('.result-text')

    switch (text) {
        case 'Check':
            if (result) {
                resultContainer.classList.add('animate')
                selectedAnswer.classList.add('correct')
                resultContainer.style.backgroundColor = '#40bf9c'
                itemsDisabled.style.pointerEvents = 'none'
                resultText.innerText = 'Well done!'
                btnCheck.innerText = 'Continue'
                console.log(db.collection('users').add( {id : 1}))
            }else {
                selectedAnswer.classList.add('error')
                resultContainer.classList.add('animate')
                resultContainer.style.backgroundColor = '#f35843'
                itemsDisabled.style.pointerEvents = 'none'
                resultText.innerText = 'Incorrect, try again!'
                btnCheck.innerText = 'Try Again'
            }
        break;

        case 'Try Again':
            resultText.innerText = ''
            resultContainer.style.backgroundColor = 'transparent'
            resultContainer.classList.remove('animate')
            itemsDisabled.style.pointerEvents = 'visible'
            selectedAnswer.classList.remove('error', 'selected')
            btnCheck.innerText = 'Check'
        break;

        case 'Continue':
        window.location.assign('./networkcomponents.html')
        break;

    }
    
}



btnCheck.addEventListener('click', checkAnswer)