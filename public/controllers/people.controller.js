export function showAdd () {
  console.log('Showing add...')
}

export function showEdit ({ id }) {
  console.log(`Showing edit for ${id}...`)
}

export function remove ({ id }) {
  console.log(`Removing ${id}...`)
}
