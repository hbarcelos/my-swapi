import TableView from '../components/table-view.jsx'
import { showAdd, showEdit, remove } from '../controllers/people.controller'

const data = [{
  id: 1,
  name: 'Luke Skywalker'
}]

const columns = [{
  Header: 'Id',
  accessor: 'id'
}, {
  Header: 'Name',
  accessor: 'name'
}]

export default function Body () {
  return (
    <div id="body">
      <TableView columns={columns}
        onEdit={showEdit}
        onDelete={remove}
        onAdd={showAdd}
        data={data} />
    </div>
  )
}
