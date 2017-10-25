import { Route } from 'react-router-dom'

import ShowList from './content/show-list.jsx'
import PeopleForm from '../components/people.form.jsx'
import FilmsForm from '../components/films.form.jsx'
import StarshipsForm from '../components/starships.form.jsx'
import PlanetsForm from '../components/planets.form.jsx'

import peopleApiService from '../services/people.service'
import filmsApiService from '../services/films.service'
import planetsApiService from '../services/planets.service'
import starshipsApiService from '../services/startships.service'

const columns = {
  people: [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Name', accessor: 'name' }
  ],
  planets: [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Name', accessor: 'name' }
  ],
  films: [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Title', accessor: 'title' }
  ],
  starships: [
    { Header: 'Id', accessor: 'id' },
    { Header: 'Name', accessor: 'name' }
  ]
}

// const films = [{
//   id: 1,
//   name: 'A new hope'
// }, {

//   id: 2,
//   name: 'The empire strikes back'
// }]

// const onSubmit = data => {
//   console.log('Data:', data)
// }
// export default () => {
//   switch (window.location.hash) {
//     case '#!/people-form':
//       return (<PeopleForm
//         data={ { films } }
//         populateData={ { films } } />)
//     case '#!/films-form':
//       return (<FilmsForm
//         data={ { films } }
//         populateData={ { films } } />)
//     case '#!/planets':
//       return <ShowList columns={columns.planets} apiService={planetsApiService} />
//     default:
//       return <ShowList columns={columns.people} apiService={peopleApiService} />
//   }
// }

const PeopleList = () => (
  <ShowList
    columns={columns.people}
    apiService={peopleApiService}
    resource='people-form'
  />
)

const FilmsList = () => (
  <ShowList
    columns={columns.films}
    apiService={filmsApiService}
    resource='films-form'
  />
)

const PlanetsList = () => (
  <ShowList
    columns={columns.planets}
    apiService={planetsApiService}
    resource='planets-form'
  />
)

const StarshipsList = () => (
  <ShowList
    columns={columns.starships}
    apiService={starshipsApiService}
    resource='starships-form'
  />
)

const Body = () => {
  return (
    <div>
      <Route exact path="/" component={FilmsList} />
      <Route path="/films" component={FilmsList} />
      <Route path="/people" component={PeopleList} />
      <Route path="/starships" component={StarshipsList} />
      <Route path="/planets" component={PlanetsList} />

      <Route exact path="/people-form" component={PeopleForm} />
      <Route exact path="/people-form/:id" component={PeopleForm} />
      <Route exact path="/films-form" component={FilmsForm} />
      <Route exact path="/films-form/:id" component={FilmsForm} />
      <Route exact path="/starships-form" component={StarshipsForm} />
      <Route exact path="/starships-form/:id" component={StarshipsForm} />
      <Route exact path="/planets-form" component={PlanetsForm} />
      <Route exact path="/planets-form/:id" component={PlanetsForm} />
    </div>
  )
}

export default Body
