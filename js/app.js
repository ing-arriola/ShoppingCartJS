//Variables
const cart = document.getElementById('carrito')
const courses = document.getElementById('lista-cursos')
const courseList = document.querySelector('#lista-carrito tbody')

//Listeners
loadListeners()

function loadListeners(){
    courses.addEventListener('click',buyCourse)
}
//Functions

function buyCourse(e){
    e.preventDefault()
    //Delegation to add course on cart
    if(e.target.classList.contains('agregar-carrito')){
        const course=e.target.parentElement.parentElement
        //Send data of the course for reading
        readCourseData(course)
    }
    
}

//Read course data
const readCourseData=(course)=>{
    console.log(course)
    const courseData ={
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    
    insertIntoCart(courseData)
}

const insertIntoCart=(curso)=>{
    const row=document.createElement('tr')
    row.innerHTML=`
    <td> 
        <img src="${curso.image}">
    </td>
    <td> 
        ${curso.title}
    </td>
    <td> 
        ${curso.price}
    </td>
    <td> 
        <a href="#" class"borrar-curso" data-id="${curso.image}">"X"</a>
    </td>
    `
    courseList.appendChild(row)

}