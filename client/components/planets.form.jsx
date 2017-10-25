import filmsApiService from '../services/films.service'
import peopleApiService from '../services/people.service'
import planetsApiService from '../services/planets.service'

function getSelectedValues (select) {
  return Array.from(select.options)
    .filter(opt => opt.selected)
    .map(opt => opt.value)
}

function extractIdFromParam (param) {
  if (typeof param === 'string') {
    const parts = param.split('/')
    return parts[parts.length - 1]
  }

  return param.id
}

export default class PlanetsForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: props.match.params.id,
      data: {},
      populateData: {}
    }
  }

  componentDidMount () {
    let entityData = Promise.resolve({})
    if (this.state.id) {
      entityData = planetsApiService.getById(this.state.id)
    }

    return Promise.all([
      entityData,
      peopleApiService.getList(),
      filmsApiService.getList()
    ])
      .then(([ data, people, films ]) => this.setState({
        data,
        populateData: {
          people,
          films
        }
      }))
  }

  onSubmit (ev) {
    ev.preventDefault()
    const id = this.refs.id.value
    const name = this.refs.name.value

    const residents = getSelectedValues(this.refs.residents)
      .map(id => ({ id }))
    const films = getSelectedValues(this.refs.films)
      .map(id => ({ id }))

    console.log('Submitting form:', { id, name, residents, films })
    planetsApiService.save({ id, name, residents, films })
      .then(jsonResponse => this.setState(
        Object.assign(this.state, { message: `OK - ID: ${jsonResponse.id}` })
      ))
      .catch(e => this.setState(
        Object.assign(this.state, { message: `${e.message}` })
      ))
  }

  updateState (evt) {
    const name = evt.target.name
    const tagName = evt.target.tagName

    let value = evt.target.value

    if (tagName === 'SELECT') {
      value = Array.from(evt.target.options)
        .filter(op => op.selected)
        .map(op => op.value)
    }

    const newState = Object.assign(
      {},
      this.state,
      {
        data: Object.assign(
          {},
          this.state.data,
          { [name]: value }
        )
      }
    )

    this.setState(newState)
  }

  render () {
    const msg = this.state.message
      ? (<div className="message">{this.state.message}</div>)
      : ''

    return (
      <div className="wrapper">
        { msg }
        <form onSubmit={ev => this.onSubmit(ev)}>
          <input name="id" type="hidden" ref="id" value={this.state.data.id}/>
          <p>Name: <input name="name" type="text" ref="name" value={this.state.data.name}
            onChange={this.updateState.bind(this)}
          /></p>

          <p>Residents: <select name="residents" ref="residents" multiple="multiple"
            value={(this.state.data.residents || []).map(extractIdFromParam)}
            onChange={this.updateState.bind(this)}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.people || []).map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))
            }
          </select></p>

          <p>Films: <select name="films" ref="films" multiple="multiple"
            value={(this.state.data.films || []).map(extractIdFromParam)}
            onChange={this.updateState.bind(this)}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.films || []).map(film => (
                <option key={film.id} value={film.id}>{film.title}</option>
              ))
            }
          </select></p>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

