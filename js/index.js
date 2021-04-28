import { loadGreet, addModule, addModuleItem } from './crud.js'




document.addEventListener('DOMContentLoaded', async () => {

    loadGreet()

    const user = sessionStorage.getItem('student') 
    if (user == null) {
        addModuleItem()
        addModule()
    }else {
        console.log('user exist')
    }

  
    if (sessionStorage.getItem('student') == null) {
        
       
    }
       
    



    const lockedItems = Array.from(document.querySelectorAll('.card'))

    document.body.addEventListener('click', (e) => {
        const targetEl = e.target
        if (targetEl.matches('[data-link]')) {
           localStorage.setItem('index', targetEl.dataset.index)
           location.href = targetEl.dataset.link
        }
    })

    lockedItems.forEach( itemLocked => {
        const caption = itemLocked.firstElementChild.lastElementChild.innerText
        itemLocked.addEventListener('click', () => {
            if ( itemLocked.lastElementChild.classList.contains('locked') ) {
                swal(caption, 'Sorry! this item is currently locked!', 'warning')
            }
        })
    })

   


})