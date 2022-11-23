// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Basic
function Greeting({initialName = ''}) {
  console.log('rendering basic');

  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const realInitialName = window.localStorage.getItem('name') || initialName;
  const [name, setName] = React.useState(realInitialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  React.useEffect(() => window.localStorage.setItem('name', name))

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

// Extra credits 1, 2, 3
function getDefaultValue(defaultValue) {
  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

function useLocalStorageState(
  key,
  defaultValue,
  { serialize = JSON.stringify, deserialize = JSON.parse }
) {
  const [state, setState] = React.useState(() => {
    try {
      return (
        deserialize(window.localStorage.getItem(key)) ||
        getDefaultValue(defaultValue)
      )
    } catch {
      return getDefaultValue(defaultValue)
    }
  })

  const prevKeyRef = React.useRef(key);

  React.useEffect(
    () => {
      console.log('use effect for key:', key)
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.removeItem(prevKey)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, serialize(state))
    },
    [key, serialize, state]
  )

  return [state, setState];
}

function GreetingExtra123({initialName = ''}) {
  console.log('rendering extra 1, 2, 3');

  const [name, setName] = useLocalStorageState('name_extra_123', initialName, {});

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

// Extra credit 4
function GreetingExtra4({initialName = '', initialExtra = {}}) {
  console.log('rendering extra 4');

  const [name, setName] = useLocalStorageState('name_extra_4', initialName, {});
  const [extra, setExtra] = useLocalStorageState('extra', initialExtra, {});

  console.log(`Extra:`, extra);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      <div>{name ? <strong>Hello {name}</strong> : 'Please type your name'}</div>
      <button onClick={() => setExtra({ 'reset': true })}>Reset extra</button>
    </div>
  )
}

function App() {
  console.log('rendering APP')
  const [ num, setNum ] = React.useState(0)
  return (
    <>
      <button onClick={() => setNum(num + 1)}>{num}</button>
      <h1>Basic</h1>
      <Greeting initialName="Jaimito"/>
      <h1>Extra credits 1, 2, 3</h1>
      <GreetingExtra123 initialName="Jaimito extra 1, 2, 3"/>
      <h1>Extra credit 4</h1>
      <GreetingExtra4
        initialName="Jaimito extra 4"
        initialExtra={{
          a: 1,
          b: 2,
          c: 3,
        }}
      />
    </>
  )
}

export default App
