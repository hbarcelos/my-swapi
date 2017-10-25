import ListView from '../../components/list-view.jsx'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

const actionTypes = {
  SHOW_LIST: 'showList',
  SHOW_ADD: 'showAdd',
  SHOW_EDIT: 'showEdit',
  REMOVE: 'remove',
  REQUEST_ERROR: 'REQUEST_ERROR'
}

const initialState = {
  data: [],
  loading: true
}

const mapStateToProps = ({ data, error }, { columns }) => ({
  data,
  error,
  columns
})

const buildMapDispatchToProps = apiService => dispatch => ({
  onAdd: () => dispatch({
    type: actionTypes.SHOW_ADD
  }),
  onEdit: ({ id }) => dispatch({
    type: actionTypes.SHOW_EDIT,
    id
  }),
  onDelete: ({ id }) =>
    apiService.remove(id)
      .then(() => dispatch({
        type: actionTypes.REMOVE,
        id
      }))
      .catch(err => dispatch({
        type: actionTypes.REQUEST_ERROR,
        error: err
      }))
})

const reducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.SHOW_ADD:
      return state
    case actionTypes.SHOW_EDIT:
      return state
    case actionTypes.REMOVE:
      return {
        data: state.data.filter(item => item.id !== action.id),
        loading: false
      }
    case actionTypes.SHOW_LIST:
      return {
        data: action.data,
        loading: false
      }
    case actionTypes.REQUEST_ERROR:
      return {
        error: action.error,
        data: state.data,
        loading: false
      }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default ({ columns, apiService }) => {
  console.log(apiService)
  const Container = connect(mapStateToProps, buildMapDispatchToProps(apiService))(ListView)

  apiService.getList()
    .then(data => store.dispatch({
      type: actionTypes.SHOW_LIST,
      data
    }))

  return (
    <Provider store={store}>
      <Container columns={columns}/>
    </Provider>
  )
}
