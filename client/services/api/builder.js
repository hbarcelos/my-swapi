const API_ENDPOINT = `//localhost:3000/api`

function buildErrorFromResponse (response) {
  return Object.assign(Object.create(Error.prototype), {
    statusCode: response.status,
    statusText: response.statusText,
    message: `${response.status} - ${response.statusText}`
  })
}

function handleJsonResponse (response) {
  if (response.status !== 200) {
    throw buildErrorFromResponse(response)
  }

  return response.json()
}

function getById (resource, id) {
  console.log('Requesting by ID...')
  return window.fetch(`${API_ENDPOINT}/${resource}/${id}`)
    .then(handleJsonResponse)
}

function getList (resource) {
  console.log('Requesting list...')
  return window.fetch(`${API_ENDPOINT}/${resource}`)
    .then(handleJsonResponse)
}

function remove (resource, id) {
  console.log('Requesting remove...')
  return window.fetch(`${API_ENDPOINT}/${resource}/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.status !== 204) {
        throw buildErrorFromResponse(response)
      }
    })
}

function save (resource, data) {
  const id = data.id

  console.log('ID', id)

  const url = id == ''
    ? `${API_ENDPOINT}/${resource}`
    : `${API_ENDPOINT}/${resource}/${id}`

  const method = id == ''
    ? 'POST'
    : 'PUT'

  console.log('Requesting save...')
  return window.fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data),
    method
  })
    .then(handleJsonResponse)
}

export default resource => ({
  getList: getList.bind(null, resource),
  getById: getById.bind(null, resource),
  remove: remove.bind(null, resource),
  save: save.bind(null, resource)
})
