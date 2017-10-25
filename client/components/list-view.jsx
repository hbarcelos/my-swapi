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

export default function ListView ({ columns, data, error, onAdd, onEdit, onDelete }) {
  let errorShow

  if (error) {
    errorShow = (
      <div className="wrapper">
        <div className="alert alert-error">
          An error occurred:&nbsp;
          <span>
            { error.message }
          </span>
        </div>
        <div className="spacer-v-s"></div>
      </div>
    )
  }

  return (
    <div className="table-view">
      { errorShow }
      <button onClick={onAdd}>+</button>
      <div className="spacer-v-xs"></div>
      <Table columns={columns.concat(
        actionColumns({ onEdit, onDelete })
      )} data={data} />
    </div>
  )
}
