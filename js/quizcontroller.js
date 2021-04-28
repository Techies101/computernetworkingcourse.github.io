import { 
    networkComponents,
    internetwork,
    tcpip
 } from './ComputerNetworkQ.js'
import { Updatetopic, quizUrlParams } from './crud.js'

const topicQue = [[...networkComponents], [...internetwork], [...tcpip] ]
const currentQue = parseInt(localStorage.getItem('index'))


 function getCurrentTopic() {
    const params = quizUrlParams()
    const questionData = topicQue[currentQue][params.quiz]
    const choices = questionData.choices
    const convertedQuestion = Object.entries(choices)
    const question = questionData.question
    const answer = questionData.answer
    const path = questionData.nextPath
    return {convertedQuestion, question, answer, path}
}


function checkIsLastItem() {
    const params = quizUrlParams()
    const questionData = topicQue[currentQue][params.quiz]
    const last = questionData.last
    if (last == undefined) {
        return
    }

    const object_details = { 
        title: questionData.last.titleUnlock,
        key:   questionData.last.finishedKey
    }

    const serialize_object = JSON.stringify(object_details)
    localStorage.setItem('topic', serialize_object)

}


const currentQuestion = getCurrentTopic()
const btnCheck = document.querySelector('#continue')
const btnBack = document.querySelector('#back')
function showChoices() {
    const quizContainer = document.querySelector('.content')
    const shuffled = currentQuestion.convertedQuestion.sort(() => Math.random() - 0.5)
    const h5 = document.createElement('h5')
    const divParent = document.createElement('div')
    h5.textContent = currentQuestion.question
    divParent.classList.add('items')
    divParent.appendChild(h5)
    shuffled.map( choice => {
        const div = document.createElement('div')
        div.classList.add('choice-text')
        div.dataset.number = choice[0]
        div.textContent = choice[1]
        divParent.appendChild(div)
        quizContainer.appendChild(divParent)
    })
}
showChoices()
let num;
const choices = Array.from(document.querySelectorAll('.choice-text'))
document.body.addEventListener('click', (e) => {

const parentChoices = document.querySelector('.items')
const target = e.target
const match = target.matches('[data-number]')

   if (match) {
    target.classList.add('selected')
    parentChoices.style.pointerEvents = 'none'
    btnCheck.classList.remove('pointer-none')
    return num = target.dataset.number
   }
})

function classToApply(action,resultClass, btnText, color, resultText) {
    const choice = choices.find( choice => choice.classList.contains('selected'))
    const result = document.querySelector('.result')
    choice.classList[action](resultClass)
    btnCheck.textContent = btnText
    result.classList[action]('animate')
    result.style.backgroundColor = color
    result.firstElementChild.lastElementChild.textContent = resultText
}


async function checkSelected(e) {
   const isCorrect = num == currentQuestion.answer
   const target = e.target.textContent
   const parentChoices = document.querySelector('.items')
   const choice = choices.find( choice => choice.classList.contains('selected'))

   if (isCorrect) {
       classToApply('add', 'correct', 'Continue', '#40bf9c', 'Well done!')
   }else {
       classToApply('add', 'error', 'Retry', '#f35843', 'Incorrect, try again')
   }

   switch (target) {
       case 'Continue':
            Updatetopic()
            checkIsLastItem()
            window.location.assign(currentQuestion.path)
           break;
       case 'Retry':
            btnCheck.classList.add('pointer-none')
            classToApply('remove', 'error', 'Check', '', '')
            choice ? choice.classList.remove('selected') : false
            parentChoices.style.pointerEvents = ''
           break;
   }

}

btnCheck.addEventListener('click', checkSelected)
btnBack.addEventListener('click', () => history.back())