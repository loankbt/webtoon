import React, { useState } from 'react'
import { Routes, Route, Link, Outlet, useMatch } from 'react-router-dom'
import { AiOutlineUnorderedList } from "react-icons/ai"
import Home from './pages/Home'
import Story from './pages/Story'
import Chapter from './pages/Chapter'
import logo from './assets/logo.jpg'

export default function App(){
  return (
    <AppLayout />
  )
}

function AppLayout(){
  const chapterMatch = useMatch('/story/:title_id/:chapter_number')
  const [chapterStoryTitle, setChapterStoryTitle] = useState('')

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <Link to="/" className="brand" aria-label="Home">
            <img src={logo} alt="Logo" className="brand-mark" />
          </Link>
          {chapterMatch && (
            <Link to={`/story/${chapterMatch.params.title_id}`} className="story-back nav-story-back">
              <AiOutlineUnorderedList size={20} />
              <span>{chapterStoryTitle || 'Loading...'}</span>
            </Link>
          )}
        </div>

        <div className="header-actions" aria-label="User actions">
          <button className="menu-button" aria-label="Open menu">☰</button>
        </div>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:title_id" element={<Story />} />
          <Route
            path="/story/:title_id/:chapter_number"
            element={<Chapter setChapterStoryTitle={setChapterStoryTitle} />}
          />
        </Routes>
      </main>
    </div>
  )
}
