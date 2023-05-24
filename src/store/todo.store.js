import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All:       'all',
    Completed: 'Completed',
    Pending:   'Pending'
}

const state = {
    todos: [
        new Todo('dedicar 3hrs diarias a aprender JavaScript'),
        // new Todo('Obtener Gema del Espacio'),
        // new Todo('Obtener Gema del Poder'),
        // new Todo('Obtener Gema del Tiempo'),
        // new Todo('Obtener Gema de la Mente'),
        // new Todo('Obtener Gema de la Realidad'),
    ],
    filter: Filters.All,
}

const initStore = () =>{
    loadStore();
    console.log('Init Store'); 
}

const loadStore = () => {
    if ( !localStorage.getItem('state') ) return;
    const { todos =[], filter = Filters.All } =  JSON.parse( localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter;


}

const saveStateToLocalStorage = () => {
    console.log(  )
    localStorage.setItem('state', JSON.stringify(state) );
}

const getTodos = ( filter =  Filters.All )  => {
    switch( filter ){
        case Filters.All:
            return [...state.todos];
        
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);

        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);

        default:
            throw new Error(`Option ${ filter } is not valid`);
    };
}

/**
 * 
 * @param {String} description recibe el todo o tarea
 */
const addTodo = ( description ) =>{
    if( !description ) throw new Error('Description is required');
    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Strig} todoId recibe el todoId para saber so lo miestra o no
 */
const toggleTodo = ( todoId ) =>{
    state.todos =  state.todos.map( todo =>{
        if(todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    } );
    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId recive el todoId para eliminarlo de lista
 */
const deleteTodo = ( todoId ) =>{
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteCompleted  = () =>{
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) =>{
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () =>{
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}