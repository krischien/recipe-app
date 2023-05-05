import react, { useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () =>{

  const APP_ID = '80c16343';
  const APP_KEY = '876a1ae0891ff6e749846dfb709e7793'
  // const exampleReq = `https://api.edamam.com/api/recipes/v2?type=public&q=mango&app_id=${APP_ID}&app_key=${APP_KEY}`

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('mango');

  useEffect(() =>{
      getRecipes();
  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('')
  }

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input type='text' className='search-bar' value={search} onChange={updateSearch}/>
        <button className='search-button' typeof='submit'>search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => ( 
        <Recipe 
          key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories = {recipe.recipe.calories} 
          image = {recipe.recipe.image}
          ingredients ={recipe.recipe.ingredients}
          />
      ))}
      </div>
    </div>
  );
}

export default App;
