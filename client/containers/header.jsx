import { Link } from 'react-router-dom'
import '../css/nav.css'

export default function Header () {
  return (
    <header>
      <nav className="mainNav">
        <Link className="mainNav-link" to="/films">Films</Link>
        <Link className="mainNav-link" to="/people">People</Link>
        <Link className="mainNav-link" to="/starships">Starships</Link>
        <Link className="mainNav-link" to="/planets">Planets</Link>
      </nav>
      <div className="spacer-v-s"></div>
    </header>
  )
}
