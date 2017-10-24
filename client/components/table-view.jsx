import Table from 'react-table'

const actionColumns = ({ onEdit, onDelete }) => [{
  Header: 'Actions',
  columns: [
    {
      id: 'edit',
      accessor: 'id',
      Cell: ({ value }) => (<button onClick={() => onEdit({ id: value })}>Edit</button>),
      maxWidth: 100
    },
    {
      id: 'delete',
      accessor: 'id',
      Cell: ({ value }) => (<button onClick={() => onDelete({ id: value })}>Delete</button>),
      maxWidth: 100
    }
  ]
}]

export default function Body ({ columns, data, onAdd, onEdit, onDelete }) {
  return (
    <div className="table-view">
      <button onClick={onAdd}>+</button>
      <Table columns={columns.concat(
        actionColumns({ onEdit, onDelete })
      )} data={data} />
    </div>
  )
}
