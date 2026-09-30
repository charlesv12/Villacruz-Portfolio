import { useEffect, useState } from 'react'
import './App.css'

const user = 'charlesv12'

function App() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/' + user + '/repos?sort=updated&per_page=6')
      .then((response) => response.json())
      .then((items) => setRepos(items.filter((repo) => !repo.fork).slice(0, 6)))
      .catch(() => setRepos([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main>
      <nav className="nav wrap"><a className="brand" href="#top">CV<span>.</span></a><div><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Contact ?</a></div></nav>
      <header className="hero wrap" id="top"><p className="eyebrow">ACADEMIC DEVELOPER <b>/</b> 20 YEARS OLD</p><h1>Charles<br /><span>Villacruz</span><i>.</i></h1><p className="intro">A student who enjoys turning ideas into useful, thoughtful software.</p><a className="line-link" href="#work">EXPLORE MY WORK ?</a><div className="hero-art" aria-hidden="true"><div className="orbit" /><div className="core">CV<span>?</span></div></div><small className="index">PORTFOLIO / 2026</small></header>
      <section className="about wrap section" id="about"><div className="label">01 / ABOUT ME</div><div className="columns"><h2>Curious by nature.<br />Developer <em>by practice.</em></h2><p>I am Charles, a 20-year-old academic developer building my skills through study and hands-on projects. I enjoy making clear, useful experiences and learning how each part of a product fits together.<br /><br />Every project is a chance to ask better questions, try something new, and build something for people.</p></div></section>
      <section className="work section" id="work"><div className="wrap"><div className="label">02 / SELECTED WORK <small>PUBLIC GITHUB REPOSITORIES</small></div><div className="work-head"><h2>Things I have been<br /><em>building.</em></h2><p>Projects from my public GitHub.<br />Always learning, always iterating.</p></div>{loading ? <p className="notice">Loading repositories...</p> : repos.length ? <div className="projects">{repos.map((repo, index) => <a className="project" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"><small>0{index + 1} / PROJECT <b>?</b></small><h3>{repo.name.replaceAll('-', ' ')}</h3><p>{repo.description || 'A project in progress. Explore the source on GitHub.'}</p><small className="meta">{repo.language || 'OPEN SOURCE'} <span>? {repo.stargazers_count}</span></small></a>)}</div> : <p className="notice">Could not load repositories. <a href="https://github.com/charlesv12?tab=repositories">Browse on GitHub ?</a></p>}<a className="line-link all" href="https://github.com/charlesv12?tab=repositories" target="_blank" rel="noreferrer">VIEW ALL REPOSITORIES ?</a></div></section>
      <footer className="wrap section" id="contact"><div className="label">03 / GET IN TOUCH</div><div className="contact"><h2>Have a good<br /><em>idea?</em></h2><a className="line-link" href="https://github.com/charlesv12" target="_blank" rel="noreferrer">FIND ME ON GITHUB ?</a></div><div className="footer"><a className="brand" href="#top">CV<span>.</span></a><span>Designed and built with curiosity.</span><a href="#top">BACK TO TOP ?</a></div></footer>
    </main>
  )
}

export default App
