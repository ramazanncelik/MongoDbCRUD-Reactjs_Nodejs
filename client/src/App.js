import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState('')

  const addToList = () => {
    axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      days: days
    });
    setFoodName('');
    setDays('');
  }

  function getFood() {
    axios.get("http://localhost:3001/read").then((result) => {
      setFoodList(result.data);
      console.log(result.data);
    });
  }

  const updateFood = (id) => {
    axios.put('http://localhost:3001/update', { id: id, newFoodName: newFoodName }).then(() => {
      setNewFoodName('');
    })
  }

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  }

  useEffect(() => {

    getFood();

    return () => {
      setFoodList([])
    }
  }, [])


  return (
    <div className="App">
      <h1>First MongoDb Project</h1>

      <label>Food Name</label>
      <input value={foodName} onChange={e => setFoodName(e.target.value)} type='text' />
      <label>Days Since You Ate It</label>
      <input value={days} onChange={e => setDays(e.target.value)} type='number' />
      <button onClick={() => addToList()}>Add To List</button>

      <h1>Food List</h1>
      {foodList.map(food => {
        return (
          <div className='food' key={food._id}>
            <h1>{food.foodName}</h1>
            <h1>{food.daysSinceIAte}</h1>
            <input value={newFoodName} onChange={e => setNewFoodName(e.target.value)} type='text' placeholder='New Food Name' />
            <button onClick={() => updateFood(food._id)}>Update</button>
            <button onClick={() => deleteFood(food._id)}>Delete</button>
          </div>
        )
      })}

    </div>
  );
}

export default App;
