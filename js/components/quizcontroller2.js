const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.answer'));
const progressText = document.querySelector('#progress-text');
const progressBar = document.querySelector('#progressbar');
const congratsContainer = document.querySelector('#greet')
const contentContainer = document.querySelector('.content')
const scoreText = document.querySelector('#score-text')
const choiceParent = document.querySelector('#choice-texts-parent')
const resultContainer = document.querySelector('.result-container')
const choicesChild = Array.from(choiceParent.children)


let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10



loadQuestion = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...question2]
    getNewQuestion()
}


getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
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

    const divHide = Array.from(document.querySelectorAll('[js-hide]'))
    if (currentQuestion.type === "true-or-false")  {
        divHide.forEach(divHide => divHide.style.display = 'none')
    }else {
        divHide.forEach(divHide => divHide.style.display = 'flex')
    }

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswer = true
    
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'answer-correct' : 'answer-wrong'

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


window.onload = loadQuestion()
