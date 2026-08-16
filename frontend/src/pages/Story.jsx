import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

export default function Story(){
  const {id} = useParams()
  const [story,setStory] = useState(null)
  const [chapters,setChapters] = useState([])

  useEffect(()=>{
    fetch(`/api/stories`).then(r=>r.json()).then(list=>{
      const s = list.find(x=>String(x.id)===String(id))
      setStory(s)
    }).catch(console.error)
    fetch(`/api/stories/${id}/chapters`).then(r=>r.json()).then(setChapters).catch(console.error)
  },[id])

  if(!story) return <div className="story-page">Loading...</div>

  return (
    <div className="story-page">
      <div className="story-header">
        <Link to="/" className="story-back">← Back</Link>
      </div>

      <div className="story-content-grid">
        <div className="story-cover-wrap">
          <img
            className="story-cover"
            src={story.coverUrl || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'}
            alt={story.title || 'Story cover'}
          />
        </div>

        <div className="story-info">
          <h1 className="story-title">{story.title}</h1>
          <p className="story-description">{story.description}</p>

          <div className="story-meta-row">
            <div>
              <span className="meta-label">Author</span>
              <strong>{story.authorId}</strong>
            </div>
          </div>
        </div>
      </div>

      <section className="chapter-section">
        <h3>Chapters</h3>
        <ol className="chapter-list">
          {chapters.map(c => (
            <Link to={c.id ? `/story/${story.id}/chapter/${c.id}` : '/'} key={c.id}>            
              <li key={c.id} className="chapter-item">
                <span className="chapter-no">Chapter {c.chapterNumber}</span>
                <span className="chapter-title">{c.title}</span>
              </li>
            </Link>
          ))}
        </ol>
      </section>
    </div>
  )
}
