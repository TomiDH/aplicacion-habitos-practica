const nombreHabitoInput = document.getElementById('nombreHabito')
const categoriaHabitoInput = document.getElementById('categoriaHabito')
const descripcionHabitoInput = document.getElementById('descripcionHabito')
const errorNombre = document.getElementById('errorNombre')
const errorCategoria = document.getElementById('errorCategoria')
const errorDescripcion = document.getElementById('errorDescripcion')
const listaHabito = document.getElementById('lista-habito')
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')

const toggleHabit = (index) => {
    habits[index].completed = !habits[index].completed;
    saveAndRender();
}

const closePopUp = () => {
    overlay.style.display = overlay.style.display == "flex" ? "none" : "flex";
    modal.style.display = modal.style.display == "block" ? "none" : "block";
}  

const deleteHabit = (index) => {
    habits.splice(index, 1);
    saveAndRender();
}

const saveAndRender = () => {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

const renderHabits = () => {
    listaHabito.innerHTML = '';
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = habit.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="showData(habits, ${index})">${habit.name}</span>
            <button id="buttonGreen" onclick="toggleHabit(${index})"></button>
            <button id="buttonRed" onclick="deleteHabit(${index})">X</button>
        `;
        listaHabito.appendChild(li);
    });
}

let habits = JSON.parse(localStorage.getItem('habits')) || [];
renderHabits();

const showData = (habits, index) => {
    closePopUp();

    const h2Modal = document.getElementById('h2-modal');
    const p1Modal = document.getElementById('p1-modal');
    const p2Modal = document.getElementById('p2-modal');

    h2Modal.innerHTML = `${habits[index].name}`;
    
    p1Modal.innerHTML = `
        <strong>Descripcion</strong><br>
        ${habits[index].description}
        `;

    p2Modal.innerHTML = `
    <strong>Categoria:</strong><br>
    ${habits[index].category}
    `;
}

const submitFunction = (event) => {
    
    if (!validarFormulario()){
        event.preventDefault();
    }else{
        event.preventDefault();
        const habit = nombreHabitoInput.value;
        const categoria = categoriaHabitoInput.value;
        const description = descripcionHabitoInput.value;
        habits.push({
            name: habit,
            category: categoria,
            description: description,
            completed: false
        })
        nombreHabitoInput.value = '';
        descripcionHabitoInput.value = '';
        categoriaHabitoInput.value = '';
        saveAndRender();
    }
}

document.getElementById('formulario').addEventListener('submit', submitFunction)

function validarFormulario() {

    let validacion = true;

    if(nombreHabitoInput.value.trim() == ''){
        mostrarError(errorNombre, 'Este campo es requerido')
        validacion = false
    }else if(nombreHabitoInput.value.length < 3 && nombreHabitoInput.value.length > 20){
        mostrarError(errorNombre, 'Debe tener minimo 3 y maximo 20 caracteres')
        validacion = false
    }else{
        ocultarError(errorNombre)
    }

    if(descripcionHabitoInput.value.trim() == ''){
        mostrarError(errorDescripcion, 'Este campo es requerido')
    }else{
        ocultarError(errorDescripcion)
    }

    if(categoriaHabitoInput.value.trim() == ''){
        mostrarError(errorCategoria, 'Este campo es requerido')
        validacion = false
    }else{
        ocultarError(errorCategoria)
    }

    return validacion
}

function mostrarError (elemento, mensaje) {
    elemento.textContent = mensaje;
    elemento.style.display = "block";
}

function ocultarError (elemento) {
    elemento.textContent = '';
    elemento.style.display = "hidden";
}