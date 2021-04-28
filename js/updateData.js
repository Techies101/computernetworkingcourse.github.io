import  { Updatetopic } from './crud.js'

document.querySelector('#continue').addEventListener('click', async (e) => {
    Updatetopic()
    location.assign(e.target.dataset.link)
})