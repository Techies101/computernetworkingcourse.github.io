import { urlParams, getCurrentTopic } from './crud.js'

async function displayNav() {
    let params = urlParams()
    const data = await getCurrentTopic()
    const navContainer = document.querySelector('.nav-container')
    const { item } = data

    item.map( (item, index) => {
        const divLink = document.createElement('div')
        const divLinkInner = document.createElement('div')
        divLink.dataset.number = index
        divLink.className = 'link'
        divLinkInner.className = 'filler'
        navContainer.appendChild(divLink)
        divLink.appendChild(divLinkInner)
        divLink.dataset.number == params.item ? divLink.classList.add('started') : false
        if (item == '100%') {
            document.documentElement.style.setProperty('--width', item)
            divLinkInner.classList.add('complete')
        }
    })

}

displayNav()