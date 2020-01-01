//Variables
const cart = document.getElementById('carrito')
const courses = document.getElementById('lista-cursos')
const courseList = document.querySelector('#lista-carrito tbody')
const emptyCartButton=document.getElementById('vaciar-carrito')

//Listeners
loadListeners()

function loadListeners(){
    //Listerner for the courses list element in the DOM
    courses.addEventListener('click',buyCourse)

    cart.addEventListener('click',deleteCourse)

    //Listener for the emptyCartButton
    emptyCartButton.addEventListener('click',emptyTheEntireCart)

    //When the HTML is loaded, show Local Storage
    document.addEventListener('DOMContentLoaded',readLocalStorage)
}
//Functions
//This function determines with delegation if the clicked element is a "a" markup with the class "agregar carrito"
function buyCourse(e){
    e.preventDefault()
    //Delegation to add course on cart
    if(e.target.classList.contains('agregar-carrito')){//If this condition is True then
        const course=e.target.parentElement.parentElement//Save the HTML of the element
        //Send data of the course for reading.
        readCourseData(course)
    }
    
}

//Read course data
//We need to read course selected information in order to send the information to the cart..
//When the client see the cart, it will contains the selected elements from the course list
const readCourseData=(course)=>{
    console.log(course)
    //Object that contains all the info of a selected course
    const courseData ={
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    
    insertIntoCart(courseData)//Send information to be inserted in the cart
}

const insertIntoCart=(curso)=>{
    const row=document.createElement('tr')//Create a table row element for each course add at the cart
    //Here is the hmtl structure inside the tr, a detail of the selected course with image, tittle, price and...
    //... a "X" to delete the course of the cart
    row.innerHTML=`
    <td> 
        <img src="${curso.image}" width=100>
    </td>
    <td> 
        ${curso.title}
    </td>
    <td> 
        ${curso.price}
    </td>
    <td> 
        <a href="#" class="borrar-curso" data-id="${curso.image}">X</a>
    </td>
    `
    courseList.appendChild(row)//Finished the structure of the tr, it is added to the courseList in the cart
    //Save on Local Storage (LS)
    saveCourseOnLS(curso)

}
//This function deletes a course from the cart when the element "X" is clicked 
function deleteCourse(e) {
    e.preventDefault()//Prevent the default action of the anchor tag
    //Delegation... we must validate that the clicked element has the classlist "borrar-curso"... because it means that the user wants to delete 
    //a course from the cart, after that the targert ups two parentElement to achieve the "tr".. as you can see in insertIntoCart function
    //The first parent of the anchor tag is the td... but we need to delete all the information of the selected course and the elementent
    //that contains that data is the "tr"
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove()
    }

}
//This function deletes all the courses from the cart
function emptyTheEntireCart (e){
    e.preventDefault()
    //While there are elements in the cart... these are removed
    //Remeber that course list has the entire list of courses added to the cart
    while(courseList.firstChild){
        courseList.firstChild.remove()//When the first element is removed, the second will be first, when the second is remove the third will be the first... etc
    }
}
//This arrow function saves the courses in the Local Storage
var saveCourseOnLS=(course)=>{
    //variable to hold the array of objects that getCoursesFromLS retrieves
    let courses
    courses=getCoursesFromLS()
    courses.push(course)//Insert the new course into the LS
    localStorage.setItem('courses',JSON.stringify(courses))//Save the new array that includes the new course in the LS
}

var getCoursesFromLS=()=>{
    let coursesLS//Array to hold the courses or an empty array
    if(localStorage.getItem('courses')===null){//If the LS is empty in the courses variable... then save a empty array in the coursesLS variable
        coursesLS=[]
    }else{
        coursesLS=JSON.parse(localStorage.getItem('courses'))//Else get all the courses that are in the LS
    }
    return coursesLS//Retrieve data... a empty array or courses, it depends of the state of LS
}

function readLocalStorage(){
    let coursesLS
    //First get courses from Local Storage
    coursesLS=getCoursesFromLS()
    //Then ... add to the DOM
    coursesLS.forEach(element => {
    const row=document.createElement('tr')//Create a table row element for each course add at the cart
    //Here is the hmtl structure inside the tr, a detail of the selected course with image, tittle, price and...
    //... a "X" to delete the course of the cart
    row.innerHTML=`
    <td> 
        <img src="${element.image}" width=100>
    </td>
    <td> 
        ${element.title}
    </td>
    <td> 
        ${element.price}
    </td>
    <td> 
        <a href="#" class="borrar-curso" data-id="${element.image}">X</a>
    </td>
    `
    courseList.appendChild(row)//Finished the structure of the tr, it is added to the courseList in the cart
    //Save on Local Storage (LS)
        
    });
}
