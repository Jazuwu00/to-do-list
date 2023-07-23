import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [TextTodo, setTextTodo] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>('');

  //actualiza el valor del input
  const CambiarInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextTodo(event.target.value);
  };

  //agrega un nuevo elemento a la lista 
  const AgregarTodo = () => {
    //compueba si es nuevo elemento, corta los espacios vacios y verifica si no esta vacia
    if (TextTodo.trim() !== '') {
      const NuevoTodo: Todo = {
        //id es el tiempo actual 
        id: Date.now(),
        text: TextTodo,
        done: false,
      };
      // se añade a array de tareas
      setTodos([...todos, NuevoTodo]);
      //se agrega un espacio vacio  
      setTextTodo('');
    }
  };

 //cambia estado de done
  const CambiarEstado = (todoId: number) => {
    //se recorre toda la lista
    const NuevoTodo = todos.map(todo =>
      //en cada tarea se comprueba si tiene el mismo id que todoId
      //en caso de que sea igual cambia su estado de done 
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );
    //devuelve la lista actualizada
    setTodos(NuevoTodo);
  };


  //edita la tarea
  const EditarTodo = (todoId: number) => {
    //cambia estado del id
    setEditingTodoId(todoId);
    //busca en la lista una tarea igual al todoId y la guarda
    const todoToEdit = todos.find(todo => todo.id === todoId);
    if (todoToEdit) {
      //actualiza el texto
      setEditedTodoText(todoToEdit.text);
    }
  };


  //guarda edicion de la tarea
  const GuardadEdicion = () => {
    
    const NuevoTodo = todos.map(todo =>
      //busca el elemento que este siendo editado y actualiza su texto
      todo.id === editingTodoId ? { ...todo, text: editedTodoText } : todo
    );
    //actualiza la lista
    setTodos(NuevoTodo);
    //indica que ya no se esta actualizando la tarea
    setEditingTodoId(null);
  };


  //cancela la edicion
  const CancelarEdicion = () => {
    //cambia el estado de edicion a null
    setEditingTodoId(null);
    //deja el campo vacio
    setEditedTodoText('');
  };


  //elimina una tarea de la lista
  const EliminaTodo = (todoId: number) => {
    //crea una lista excluyendo al elemento a borrar 
    const NuevoTodo = todos.filter(todo => todo.id !== todoId);
    //actualiza la lista
    setTodos(NuevoTodo);
  };

  return (
    <div className="container">
      <h1>Lista de tareas</h1>
      <div className="barra">
        <input className="texto" type="text" value={TextTodo} onChange={CambiarInput} />
        <button className="add" onClick={AgregarTodo}>Añadir</button>
      </div>
      

      <ul className='buttons'>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={e => setEditedTodoText(e.target.value)}
                />
                <div className="botones"><button onClick={GuardadEdicion}>Guardar</button>
                <button onClick={CancelarEdicion}>Cancelar</button></div>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                  onClick={() => CambiarEstado(todo.id)}
                >
                  {todo.text}
                </span>
               <div> <button onClick={() => EditarTodo(todo.id)}>Editar</button>
                <button onClick={() => EliminaTodo(todo.id)}>Borrar</button></div>
              </>
            )}
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
