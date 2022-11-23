// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

// 🐨 uncomment this
function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

// Extra credit 1
function NameExtra() {
  const [name, setName] = React.useState('');

  const onNameChange = (event) => setName(event.target.value);
  
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function DisplayExtra({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}


function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <>
      <h1>Basic</h1>
      <form>
        <Name name={name} onNameChange={event => setName(event.target.value)} />
        {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
        <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
        {/* 🐨 pass the animal prop here */}
        <Display name={name} animal={animal} />
      </form>
      <h1>Extra credit 1</h1>
      <form>
        <NameExtra />
        <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)} />
        <DisplayExtra animal={animal} />
      </form>
    </>
  )
}

export default App
