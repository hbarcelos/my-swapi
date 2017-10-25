import '../css/nav.css'

export default function Header () {
  return (
    <header>
      <nav className="mainNav">
        <a className="mainNav-link" href="#!/films">Films</a>
        <a className="mainNav-link" href="#!/films-form">New film</a>
        <a className="mainNav-link" href="#!/people">People</a>
        <a className="mainNav-link" href="#!/people-form">New character</a>
        <a className="mainNav-link" href="#!/starships">Starships</a>
        <a className="mainNav-link" href="#!/planets">Planets</a>
      </nav>
      <div className="spacer-v-s"></div>
    </header>
  )
}
