import {useEffect,useState } from "react";
import './App.css';

function App() {
  const [recipes,setRecipes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/recipes")
    .then((data) => data.json())
  .then((data2) => setRecipes(data2));
  },[]);

  console.log(recipes)
   return (<div className="App">
      {recipes.map((recipe,index) => 
          <Recipe name={recipe.Name} pic={recipe.pic} key={index} />) }
    </div> ) 

  

  
}

function Recipe({name,pic}){
  
  return <div className="recipe-container">
       
  <img className="recipe-pic"  src={pic} alt={name}/>
  <p className="recipe-name">{name}</p>
</div>

}


export default App;
