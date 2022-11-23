// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function logErrorToMyService(error, errorInfo) {
  console.error(error, errorInfo)
}

class ErrorBoundaryExtra4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <this.props.FallbackComponent error={error} />
      )
    }

    return this.props.children; 
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })
  const { status, pokemon, error } = state

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  React.useEffect(() => {
    // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
    if (pokemonName) {
      // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
      // (This is to enable the loading state when switching between different pokemon.)
      setState({ status: 'pending' })
      // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
      //   fetchPokemon('Pikachu').then(
      //     pokemonData => {/* update all the state here */},
      //   )
      fetchPokemon(pokemonName).then(
        (pokemonData) => {
          setState({ status: 'resolved', pokemon: pokemonData })
        },
        (error) => {
          setState({ status: 'rejected', error })
        }
      )
    } else {
      setState({ status: 'idle' })
    }
  }, [pokemonName])

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  let pokemonInfo
  switch(state.status) {
    case 'idle':
      pokemonInfo = 'Submit data'
      break
    case 'pending':
      pokemonInfo = <PokemonInfoFallback name={pokemonName} />
      break
    case 'resolved':
      pokemonInfo = <PokemonDataView pokemon={state.pokemon} />
      break
    case 'rejected':
      throw error
    default:
      throw new Error('This should be impossible')
  }

  return pokemonInfo
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* Up until extra credit 5 */}
        {/* <ErrorBoundaryExtra4 key={pokemonName} FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundaryExtra4> */}
        {/* From extra credit 6 */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
