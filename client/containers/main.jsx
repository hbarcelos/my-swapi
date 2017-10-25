import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './header.jsx'
import Body from './body.jsx'
import 'react-table/react-table.css'

export default function Main () {
  return (
    <div id="main">
      <Router>
        <div>
          <Header />
          <Body />
        </div>
      </Router>
    </div>
  )
}
