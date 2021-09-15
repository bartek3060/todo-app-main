let allTasks = [...document.querySelectorAll('.listOfTasks li')]
let buttons = [...document.querySelectorAll('.listOfTasks button')]
let darkMode = false
const queringOneElementFunction = (selector) => document.querySelector(selector)
const createElement = (element) => {
    return document.createElement(element)
}
const queringMultiElementFunction = (selector) => document.querySelectorAll(selector)
const getNumberOFActiveTasks = () => {
    const activeTasks = queringMultiElementFunction('[data-tasktype="active"]')
    console.log(activeTasks)
    return activeTasks.length
}
const updateNumberOFActiveTasks = () => {
    const numberActiveTasksDOM = queringOneElementFunction('.numberOfTasks')
    numberActiveTasksDOM.textContent = `${getNumberOFActiveTasks()} items left`
}
const clearInputHandler = () => {
    const input = queringOneElementFunction('input')
    input.value = ''
}
const submitFunctionHandler = (e) => {
    e.preventDefault()
    if (!queringOneElementFunction('input').value) {
        return
    } else {
        updateNumberOFActiveTasks()
        const inputValue = queringOneElementFunction('input').value

        allTasks.push(renderTask(inputValue, 'active'))
        updateNumberOFActiveTasks()
        console.log(inputValue)
        clearInputHandler()
        buttons = [...document.querySelectorAll('.listFfTasks button')]
    }
}
const removeTaskHandler = (e) => {
    console.log(e.target.closest('li').textContent)
    allTasks = allTasks.filter(task => !(task.textContent == e.target.closest('li').textContent))
    e.target.closest('li').remove()
    console.log(allTasks)
    updateNumberOFActiveTasks()
}
const changeStatusHandler = (e) => {
    const li = e.target.closest('li')
    if (li.dataset.tasktype == 'active') {
        li.dataset.tasktype = 'complete'
        e.target.classList.add('complete')
    } else {
        li.dataset.tasktype = 'active'
        e.target.classList.remove('complete')
    }
    allTasks = [...document.querySelectorAll('.listOfTasks li')]
    buttons = [...document.querySelectorAll('.listofTasks button')]
    updateNumberOFActiveTasks()
}
const dragAndDrop = () => {
    const dragArea = queringOneElementFunction('.listOfTasks')
    new Sortable(dragArea, {
        animation: 500
    })
}

const renderTask = (taskContent, listType) => {
    const ul = queringOneElementFunction('.listOfTasks')
    const li = createElement('li')
    li.classList.add('task')
    li.setAttribute('data-tasktype', listType)
    li.setAttribute('draggable', true)

    const button = createElement('button')
    button.addEventListener('click', changeStatusHandler)
    if (darkMode) {
        button.classList.add('dark')
        li.style.color = 'white'
    } else {
        button.classList.remove('dark')
        li.style.color = 'black'
    }
    if (listType == 'complete') {
        li.classList.add('complete')
        button.classList.add('complete')

    }
    const h3 = createElement('h3')
    h3.textContent = taskContent
    const img = createElement('img')
    img.addEventListener('click', removeTaskHandler)
    img.src = '../images/icon-cross.svg'
    li.append(button)
    li.append(h3)
    li.append(img)
    ul.append(li)
    return li
}
const renderList = (list) => {
    const ul = queringOneElementFunction('.listOfTasks')
    ul.textContent = ''
    list.forEach(task => {
        renderTask(task.textContent, task.dataset.tasktype)
    })
}
const changeListHandler = (e) => {
    let listToCreate
    const allTasksclass = queringOneElementFunction('.filterAllTasks')
    const aciveTasksclass = queringOneElementFunction('.filterActiveTasks')
    const completeTasksclass = queringOneElementFunction('.filterTasksCompleted')
    if (e.target.textContent == 'All') {

        allTasksclass.classList.add('active')
        aciveTasksclass.classList.remove('active')
        completeTasksclass.classList.remove('active')
        listToCreate = allTasks

    } else if (e.target.textContent == 'Active') {
        listToCreate = allTasks.filter(task => task.dataset.tasktype == 'active')
        allTasksclass.classList.remove('active')
        aciveTasksclass.classList.add('active')
        completeTasksclass.classList.remove('active')

    } else if (e.target.textContent == 'Completed') {
        listToCreate = allTasks.filter(task => task.dataset.tasktype == 'complete')
        allTasksclass.classList.remove('active')
        aciveTasksclass.classList.remove('active')
        completeTasksclass.classList.add('active')
    }
    renderList(listToCreate)
}
const removeDoneHandler = (e) => {
    allTasks = allTasks.filter(task => task.dataset.tasktype != 'complete')
    renderList(allTasks)
}
const darkModeHandler = (e) => {
    const bgi = queringOneElementFunction('.background-image')
    const form = queringOneElementFunction('form')
    const formBtn = queringOneElementFunction('form button')
    const input = queringOneElementFunction('input')
    const ul = queringOneElementFunction('.allTasks')
    const ulMobile = queringOneElementFunction('.allTasks .options .filterOptions')
    const allTasksclass = queringOneElementFunction('.filterAllTasks')
    const aciveTasksclass = queringOneElementFunction('.filterActiveTasks')
    const completeTasksclass = queringOneElementFunction('.filterTasksCompleted')
    allTasks = [...document.querySelectorAll('.listOfTasks li')]
    buttons = [...document.querySelectorAll('.listOfTasks button')]
    console.log(buttons)

    darkMode = !darkMode

    bgi.classList.toggle('dark')
    document.body.classList.toggle('dark')
    form.classList.toggle('dark')
    formBtn.classList.toggle('dark')
    input.classList.toggle('dark')
    ul.classList.toggle('dark')
    allTasksclass.classList.toggle('dark')
    aciveTasksclass.classList.toggle('dark')
    completeTasksclass.classList.toggle('dark')
    ulMobile.classList.toggle('dark')
    console.log(buttons)
    if (darkMode == true) {
        e.target.src = './images/icon-sun.svg'
        buttons.forEach(btn => {
            btn.classList.add('dark')

        })
        allTasks.forEach(task => {
            task.style.color = "white"
        })
    } else {
        e.target.src = './images/icon-moon.svg'
        buttons.forEach(btn => {
            btn.classList.remove('dark')
        })
        allTasks.forEach(task => {
            task.style.color = "black"
        })
    }
}
const startApp = () => {
    const form = queringOneElementFunction('form')
    const input = queringOneElementFunction('input')
    const filterOptions = queringOneElementFunction('.filterOptions')
    const allTasks = [...queringMultiElementFunction('.listOfTasks li')]
    const ul = queringOneElementFunction('.listOfTasks')
    const removeDone = queringOneElementFunction('.clearCompletedTasks')
    const darkMode = queringOneElementFunction('.darkIcon')
    renderList(allTasks)
    form.addEventListener('submit', submitFunctionHandler)
    input.addEventListener('click', clearInputHandler)
    filterOptions.addEventListener('click', changeListHandler)
    removeDone.addEventListener('click', removeDoneHandler)
    darkMode.addEventListener('click', darkModeHandler)
    updateNumberOFActiveTasks()
    dragAndDrop()
}
startApp()