import actionTypes from '../conf/action-types'

export function showAdd () {
  console.log('Showing add...')
  return { type: actionTypes.ADD }
}

export function showEdit ({ id }) {
  console.log(`Showing edit for ${id}...`)
  return {
    type: actionTypes.SHOW_EDIT,
    id
  }
}

export function remove ({ id }) {
  console.log(`Removing ${id}...`)
  return {
    type: actionTypes.REMOVE,
    id
  }
}
