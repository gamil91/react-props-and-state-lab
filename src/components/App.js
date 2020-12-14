import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (type) => {
    this.setState({
      filters: {...this.state.filters, type: type}
    })
  }

  onFindPetsClick = () => {
    let fetchedData
      if (this.state.filters.type === 'all'){
        fetchedData = fetch("/api/pets")
      } else {
        fetchedData = fetch(`/api/pets?type=${this.state.filters.type}`)
      }
    fetchedData.then(resp => resp.json())
    .then(pets => this.setState({pets:[pets]}))
  }

 

  onAdoptPet = (id) => {
    let newPets = this.state.pets.map(p => {
        return p.id === id ? {...p, isAdopted: true} : p
    })
    this.setState({pets: newPets})

    }
  


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
