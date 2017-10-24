import TableView from '../components/table-view.jsx'
import { showAdd, showEdit, remove } from '../controllers/people.controller'
import actionTypes from '../conf/action-types'

const initialState = {
  dataList: [{
    id: 1,
    name: 'Luke Skywalker'
  }]
}

const columns = [{
  Header: 'Id',
  accessor: 'id'
}, {
  Header: 'Name',
  accessor: 'name'
}]

export default function BodyContainer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_LIST:
      return { ...state }
    default:
      return {}
  }
}

function Body({ view, subProps }) {
  let CurrentView

  switch (view) {
    case 'list':
      CurrentView = <TableView columns={subProps.columns}
        onEdit={subProps.showEdit}
        onDelete={subProps.remove}
        onAdd={subProps.showAdd}
        data={subProps.data} />
  }

  return (
    <div id="body">
      <CurrentView />
    </div>
  )
}
