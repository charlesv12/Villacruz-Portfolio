import { useEffect, useState } from 'react'
import './App.css'

const user = 'charlesv12'
const portfolioName = 'villacruzportfolio'

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" className={diagonal ? 'arrow-icon arrow-diagonal' : 'arrow-icon'} viewBox="0 0 20 20" fill="none">
      {diagonal ? <path d="M5 15 15 5M6 5h9v9" /> : <path d="M3.5 10h12m-5-5 5 5-5 5" />}
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className="github-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.59 1.2 3.22.91.1-.71.39-1.2.7-1.47-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.24-5.11 5.51.4.35.75 1.03.75 2.08v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  )
}

function App() {
  const [repos, setRepos] = useState([])
  const [repoState, setRepoState] = useState('loading')

  useEffect(() => {
    fetch('https://api.github.com/users/' + user + '/repos?sort=updated&per_page=100')
      .then((response) => {
        if (!response.ok) throw new Error('GitHub request failed')
        return response.json()
      })
      .then((items) => {
        if (!Array.isArray(items)) throw new Error('Unexpected GitHub response')
        const projects = items.filter((repo) => {
          const name = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '')
          return !repo.fork && name !== portfolioName
        }).slice(0, 6)
        setRepos(projects)
        setRepoState(projects.length ? 'ready' : 'empty')
      })
      .catch(() => setRepoState('error'))
  }, [])

  return (
    <main>
      <nav className="nav wrap" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Charles Villacruz, home">CV<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Selected work</a>
          <a href="#contact">Contact <ArrowIcon diagonal /></a>
        </div>
      </nav>

      <header className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> ACADEMIC DEVELOPER <b>/</b> 20 YEARS OLD</p>
          <h1>Charles<br /><span>Villacruz</span><i>.</i></h1>
          <p className="intro">A student who enjoys turning ideas into useful, thoughtful software.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">Explore selected work <ArrowIcon /></a>
            <a className="icon-link" href="https://github.com/charlesv12" target="_blank" rel="noreferrer" aria-label="Visit Charles on GitHub"><GitHubIcon /></a>
          </div>
          <p className="hero-note">Learning by building, one project at a time.</p>
        </div>

        <div className="hero-visual">
          <div className="portrait-orbit orbit-one" />
          <div className="portrait-orbit orbit-two" />
          <div className="portrait-frame"><img src="/charles-villacruz.png" alt="Charles Villacruz" /></div>
          <div className="portrait-caption"><span className="caption-mark" /><span>STUDENT<br />&amp; BUILDER</span></div>
          <span className="visual-coordinate">14.5995 N / 120.9842 E</span>
        </div>
        <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        <span className="hero-index">PORTFOLIO <b>2026</b></span>
      </header>

      <section className="about wrap section" id="about">
        <div className="section-label"><span>01</span> A LITTLE ABOUT ME</div>
        <div className="about-grid">
          <h2>Curious by nature.<br />Developer <em>by practice.</em></h2>
          <div className="about-copy">
            <p>I am Charles, a 20-year-old academic developer building my skills through study and hands-on projects. I enjoy making clear, useful experiences and learning how each part of a product fits together.</p>
            <p>Every project is a chance to ask better questions, try something new, and build something for people.</p>
            <a className="text-link" href="https://github.com/charlesv12" target="_blank" rel="noreferrer">More about my work <ArrowIcon diagonal /></a>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="wrap">
          <div className="section-label"><span>02</span> SELECTED WORK <small>PUBLIC REPOSITORIES <i /> GITHUB</small></div>
          <div className="work-heading">
            <h2>Built with<br /><em>curiosity.</em></h2>
            <p>A selection of projects from my public GitHub.<br />Always learning, always iterating.</p>
          </div>
          {repoState === 'loading' && <p className="repo-message"><span className="loading-dot" /> Loading projects from GitHub</p>}
          {repoState === 'error' && <p className="repo-message">Projects could not be loaded right now. <a href="https://github.com/charlesv12?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories <ArrowIcon diagonal /></a></p>}
          {repoState === 'empty' && <p className="repo-message">No public projects to show yet.</p>}
          {repoState === 'ready' && (
            <div className="projects">
              {repos.map((repo, index) => (
                <a className="project" key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer">
                  <div className="project-topline"><span>0{index + 1} <i /> PROJECT</span><ArrowIcon diagonal /></div>
                  <h3>{repo.name.replaceAll('-', ' ')}</h3>
                  <p>{repo.description || 'A project in progress. Explore the source on GitHub.'}</p>
                  <div className="project-meta"><span>{repo.language || 'OPEN SOURCE'}</span><span className="project-stars"><b>★</b> {repo.stargazers_count}</span></div>
                </a>
              ))}
            </div>
          )}
          <a className="all-projects" href="https://github.com/charlesv12?tab=repositories" target="_blank" rel="noreferrer">View all repositories <ArrowIcon diagonal /></a>
        </div>
      </section>

      <footer className="contact wrap section" id="contact">
        <div className="section-label"><span>03</span> GET IN TOUCH</div>
        <div className="contact-main">
          <div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make<br /><em>something good.</em></h2></div>
          <a className="contact-link" href="https://github.com/charlesv12" target="_blank" rel="noreferrer">
            <span className="contact-icon"><GitHubIcon /></span>
            <span>Find me on GitHub<small>@charlesv12</small></span>
            <ArrowIcon diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <a className="brand" href="#top">CV<span>.</span></a>
          <span>Designed and built with curiosity.</span>
          <a href="#top">BACK TO TOP <b>↑</b></a>
        </div>
      </footer>
    </main>
  )
}

export default App
