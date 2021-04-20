const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.answer'));
const progressText = document.querySelector('#progress-text');
const progressBar = document.querySelector('#progressbar');
const congratsContainer = document.querySelector('#greet')
const contentContainer = document.querySelector('.content')
const scoreText = document.querySelector('#score-text')
const choiceParent = document.querySelector('#choice-texts-parent')
const resultContainer = document.querySelector('.result-container')
const title = document.querySelector('.title')
const btnNext = document.querySelector('[type="button"]')
let selectedChoice;
let selectedAnswer;
let classToApply;

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const MAX_QUESTIONS = 5;



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


loadQuestion = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions9]
    getNewQuestion()
}


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        const fromLocalStorageScore = parseInt(localStorage.getItem('DNSscore'))
        localStorage.setItem('DNSscore', (fromLocalStorageScore + score))
        contentContainer.style.display = 'none'
        scoreText.innerText = `${score} out of ${MAX_QUESTIONS}`
        return congratsContainer.style.display = 'block'
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerHTML = currentQuestion.question
    title.textContent = currentQuestion.title

     const numbers = generateRandomChoices()

     for (let i = 0; i < numbers.length; i++) {
         let number = numbers[i]
         choices[i].dataset.number = number
         choices[i].innerText = currentQuestion['choice' + number]
     }

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswer = true

    
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return

        acceptingAnswer = false
         selectedChoice = e.target
         selectedAnswer = selectedChoice.dataset['number']

         classToApply = selectedAnswer == currentQuestion.answer ? 'answer-correct' : 'answer-wrong'

        if (classToApply === 'answer-correct') {
            score += 1
        }

        selectedChoice.classList.add(classToApply)
        choiceParent.classList.add('disabled')

        setTimeout(() => {
            selectedChoice.classList.remove(classToApply)
            choiceParent.classList.remove('disabled')
            getNewQuestion()
        }, 1000)
    })
})



// giveExample = () => {
//     choicesChild.forEach( choice => choice.style.display = 'none')
//     choiceParent.innerHTML = ''
// }


onload = loadQuestion()
