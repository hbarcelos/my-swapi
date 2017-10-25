import ShowList from './content/show-list.jsx'
import PeopleForm from '../components/people.form.jsx'
import FilmsForm from '../components/films.form.jsx'

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
  ]
}

const films = [{
  id: 1,
  name: 'A new hope'
}, {

  id: 2,
  name: 'The empire strikes back'
}]

const onSubmit = data => {
  console.log('Data:', data)
}
export default () => {
  switch (window.location.hash) {
    case '#!/people-form':
      return (<PeopleForm
        data={ { films } }
        populateData={ { films } } />)
    case '#!/films-form':
      return (<FilmsForm
        data={ { films } }
        populateData={ { films } } />)
    case '#!/planets':
      return <ShowList columns={columns.planets} apiService={planetsApiService} />
    default:
      return <ShowList columns={columns.people} apiService={peopleApiService} />
  }
}
