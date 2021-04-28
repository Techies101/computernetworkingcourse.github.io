

async function addModule(){

    try {
      
        let db = new Localbase('erodb')
            await db.collection('finishedModules').add({ title: 'Computer Network Components', 
            isFinished: false}, 'cnc')
            await db.collection('finishedModules').add( { title: 'Types of Network', isFinished: false},'top')
            await db.collection('finishedModules').add( { title: 'The OSI & TCP/IP Model', isFinished: false}, 'osi')
            await db.collection('finishedModules').add( { title: 'Domain Name System', isFinished: false}, 'dns')
            await db.collection('finishedModules').add( { title: 'IP Addressing and Subnetting', isFinished: false}, 'ipaddress')
            await db.collection('finishedModules').add( { title: 'Switches & Routers', isFinished: false}, 'sr')
            await db.collection('finishedModules').add( { title: 'Configuration of P2P Network', isFinished: false}, 'p2p')
            await db.collection('finishedModules').add( { title: 'Network Cabling', isFinished: false}, 'nc')
    } catch (error) {
        console.log(error)
    }   
}

async function addModuleItem() {

       try {
    
        let db = new Localbase('erodb')
        await db.collection('moduleItem').add( { item: ['0%', '0%'] }, 'cnc' )
        await db.collection('moduleItem').add( { item: ['0%'] }, 'adv' )
        await db.collection('moduleItem').add( { item: ['0%', '0%', '0%'] }, 'hp' )
        await db.collection('moduleItem').add( { item: ['0%'] }, 'sp' )
        await db.collection('moduleItem').add( { item: ['0%','0%','0%','0%','0%','0%','0%','0%','0%','0%','0%','0%', '0%']}, 'mc' )
        await db.collection('moduleItem').add( { item: ['0%'] }, 'cn' )
        await db.collection('moduleItem').add( { item: ['0%', '0%', '0%'] }, 'lan' )
        await db.collection('moduleItem').add( { item: ['0%','0%', '0%'] }, 'pan' )
        await db.collection('moduleItem').add( { item: ['0%', '0%'] }, 'man' )
        await db.collection('moduleItem').add( { item: ['0%', '0%', '0%', '0%', '0%', '0%', '0%' ]}, 'wan' )
        await db.collection('moduleItem').add( { item: ['0%','0%', '0%'] }, 'in' )
        await db.collection('moduleItem').add( { item: ['0%'] }, 'osi' )
        await db.collection('moduleItem').add( { item: ['0%', '0%', '0%', '0%', '0%', '0%', '0%', '0%'] }, 'nl' )
        await db.collection('moduleItem').add( { item: ['0%', '0%', '0%', '0%', '0%', '0%', '0%'] }, 'tcp' )
        await db.collection('moduleItem').add( { item: ['0%', '0%', '0%', '0%'] }, 'quiz' )
    } catch (error) {
        
    }
   

}

async function updateFinishedModule(topic){
    try {
    let db = new Localbase('erodb')
    await db.collection('finishedModules').doc(topic).update( { isFinished: true} )
    } catch (error) {
        console.log(error)
    }
}

async function loadGreet(){
    try {
    if (localStorage.getItem('topic')) {
        const { title, key } = JSON.parse(localStorage.getItem('topic'))
        swal('Congratulations!', `You've just unlock ${title}`, 'success').then(async () =>{
            await updateFinishedModule(key)
            localStorage.removeItem('topic')
        })
    }
    } catch (error) {
        console.log(error)
    }
    
}



function urlParams() {
    const mySearchParams = new URLSearchParams(location.search)
    var params = []
    for (const [key, value] of mySearchParams.entries()) {
        params.push([key, value])
    }
    return Object.fromEntries(params)
}

function quizUrlParams() {
    const mySearchParams = new URLSearchParams(location.search)
    var params = []
    for (const [key, value] of mySearchParams.entries()){
        params.push([key, value])
    }
    return Object.fromEntries(params)
}

async function getCurrentTopic() {
    const params = urlParams()
    let db = new Localbase('erodb')
    const data = await db.collection('moduleItem').doc(params.topickey).get()
    return data
}

async function Updatetopic() {
    const params = urlParams()
    const data = await getCurrentTopic()
    const items = data['item']
    items[params.item] = '100%'
    let db = new Localbase('erodb')
    return await db.collection('moduleItem').doc(params.topickey).update( {item: items} ) 
}





export { loadGreet, addModule, urlParams,  addModuleItem, getCurrentTopic, Updatetopic, quizUrlParams }