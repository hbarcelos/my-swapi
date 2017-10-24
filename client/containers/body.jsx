import ListView from '../components/list-view.jsx'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const actionTypes = {
  SHOW_ADD: 'showAdd',
  SHOW_EDIT: 'showEdit',
  REMOVE: 'remove'
}

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

const mapStateToProps = ({ dataList }) => ({
  data: dataList,
  columns
})

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch({
    type: actionTypes.SHOW_ADD
  }),
  onEdit: ({ id }) => dispatch({
    type: actionTypes.SHOW_EDIT,
    id
  }),
  onDelete: ({ id }) => dispatch({
    type: actionTypes.REMOVE,
    id
  })
})

const reducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.SHOW_ADD:
      return state
    case actionTypes.SHOW_EDIT:
      return state
    case actionTypes.REMOVE:
      return state
    default:
      return state
  }
}

const store = createStore(reducer)

const Container = connect(mapStateToProps, mapDispatchToProps)(ListView)

export default () => (
  <Provider store={store}>
    <Container />
  </Provider>)
