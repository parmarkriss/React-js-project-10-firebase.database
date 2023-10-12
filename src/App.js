import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from './firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from 'react';


function App() {

  const tbl = collection(db, "users")
  const [record, setRecord] = useState([]);
  const [todo, setTodo] = useState("");
  // const [phone,setPhone]  = useState("");
  const [editid, setEditid] = useState("");
  const getUser = async () => {
    const data = await getDocs(tbl);
    let ans = data.docs.map((val) => {
      return ({ ...val.data(), id: val.id })
    })
    setRecord(ans);
  }

  const handleSubmit = async () => {
    let insert = await addDoc(tbl, { todo: todo });
    if (insert) {
      alert("Record successfully insert")
    } else {
      alert("Record not successfully insert")
    }
    setTodo("");
    getUser();
  }

  const deleteData = async (id) => {
    const userDoc = doc(db, "users", id);
    let res = await deleteDoc(userDoc);
    alert("user successfully delete");
    setTodo("");
    getUser();
  }

  const editData = (id, todo) => {
    setEditid(id);
    setTodo(todo);
  }
  const handleUpdate = async () => {
    const userDoc = doc(db, "users", editid);
    const newFields = { todo: todo };
    await updateDoc(userDoc, newFields);
    alert("Record successfully update");
    setTodo("");
    setEditid("");
    getUser();
  }

  useEffect(() => {
    getUser();
  }, [])


  return (

    <div className="App">
      <h1>To-Do List</h1>
      <div class="container-1">

        <form id="todo-form">
          <input type="text" placeholder="Add a new task" name='todo' onChange={(e) => setTodo(e.target.value)} value={todo} />
          {
            editid ? (<button type="button" onClick={() => handleUpdate()}>Edit</button>) : (<button type="button" onClick={() => handleSubmit()}>Add</button>)
          }
        </form>
      </div><br></br>

     <div className='container'>
     <table class="table table-success table-striped">
        <thead>
          <tr>
            <td>Todo</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {
            record.map((val) => {
              return (
                <tr>
                  <td>{val.todo}</td>
                  <td>
                    <button type="button" class="btn btn-danger" onClick={() => deleteData(val.id)}>Delete</button>
                    <button type='button' className='btn btn-success ms-2' onClick={() => editData(val.id, val.todo)}>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
     </div>

      

    </div>
  );
}

export default App;
