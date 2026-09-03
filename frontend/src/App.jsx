import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Story from './pages/Story'
import Chapter from './pages/Chapter'
import logo from './assets/logo.jpg'

export default function App(){
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <Link to="/" className="brand" aria-label="Home">
            <img src={logo} alt="Logo" className="brand-mark" />
          </Link>
        </div>

        <div className="header-actions" aria-label="User actions">
          <button className="menu-button" aria-label="Open menu">☰</button>
        </div>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/story/:id" element={<Story/>} />
          <Route path="/story/:storyId/chapter/:chapterId" element={<Chapter/>} />
        </Routes>
      </main>
    </div>
  )
}
