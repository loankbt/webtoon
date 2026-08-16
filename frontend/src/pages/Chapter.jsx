import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function Chapter(){
  const { storyId, chapterId } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [chapters, setChapters] = useState([])
  const [chapterImages, setChapterImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/stories')
      .then((r) => r.json())
      .then((list) => {
        const selectedStory = list.find((x) => String(x.id) === String(storyId))
        setStory(selectedStory || null)
      })
      .catch(() => setStory(null))

    fetch(`/api/stories/${storyId}/chapters`)
      .then((r) => r.json())
      .then((list) => {
        setChapters(Array.isArray(list) ? list : [])
      })
      .catch(() => setChapters([]))
  }, [storyId])

  useEffect(() => {
    if (!chapters.length || !chapterId) {
      setChapterImages([])
      setCurrentIndex(0)
      return
    }

    const index = chapters.findIndex((chapter) => String(chapter.id) === String(chapterId))
    const safeIndex = index >= 0 ? index : 0
    setCurrentIndex(safeIndex)

    fetch(`/api/chapter/${chapterId}`)
      .then((r) => r.json())
      .then((images) => setChapterImages(Array.isArray(images) ? images : []))
      .catch(() => setChapterImages([]))
  }, [chapterId, chapters])

  if (!story) return <div className="story-page">Loading...</div>

  const currentChapter = chapters[currentIndex] || null
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  const handleChapterSelect = (event) => {
    const nextId = event.target.value
    if (nextId) {
      navigate(`/story/${storyId}/chapter/${nextId}`)
    }
  }

  return (
    <div className="story-page chapter-page">
      <div className="chapter-toolbar">
        <div className="chapter-toolbar-left">
          <Link to={`/story/${storyId}`} className="story-back">← Story</Link>
        </div>

        <div className="chapter-controls">
          {previousChapter ? (
            <Link to={`/story/${storyId}/chapter/${previousChapter.id}`} className="chapter-nav-button small">Prev</Link>
          ) : (
            <span className="chapter-nav-button small disabled">Prev</span>
          )}

          <select className="chapter-select" value={currentChapter?.id ?? ''} onChange={handleChapterSelect}>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.chapterNumber}: {chapter.title}
              </option>
            ))}
          </select>

          {nextChapter ? (
            <Link to={`/story/${storyId}/chapter/${nextChapter.id}`} className="chapter-nav-button small">Next</Link>
          ) : (
            <span className="chapter-nav-button small disabled">Next</span>
          )}
        </div>
      </div>

      <section className="chapter-reader-section">
        <div className="reader-header">
          {currentChapter ? `Chapter ${currentChapter.chapterNumber}: ${currentChapter.title}` : 'Loading chapter...'}
        </div>

        {chapterImages.length ? (
          <div className="reader-pages">
            {chapterImages.map((image) => (
              <img
                key={image.id}
                src={image.filePath}
                alt={image.caption || 'Chapter page'}
                className="reader-page"
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">No images available for this chapter yet.</div>
        )}
      </section>

      {/* <section className="chapter-section">
        <h3>Chapter list</h3>
        <ol className="chapter-list">
          {chapters.map((chapter) => (
            <li key={chapter.id} className={`chapter-item ${String(chapter.id) === String(chapterId) ? 'active' : ''}`}>
              <Link to={`/story/${storyId}/chapter/${chapter.id}`} className="chapter-link">
                <span className="chapter-no">Chapter {chapter.chapterNumber}</span>
                <span className="chapter-title">{chapter.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section> */}
      <div className="chapter-toolbar">
        <div className="chapter-toolbar-left">
          <Link to={`/story/${storyId}`} className="story-back">← Story</Link>
        </div>

        <div className="chapter-controls">
          {previousChapter ? (
            <Link to={`/story/${storyId}/chapter/${previousChapter.id}`} className="chapter-nav-button small">Prev</Link>
          ) : (
            <span className="chapter-nav-button small disabled">Prev</span>
          )}

          <select className="chapter-select" value={currentChapter?.id ?? ''} onChange={handleChapterSelect}>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.chapterNumber}: {chapter.title}
              </option>
            ))}
          </select>

          {nextChapter ? (
            <Link to={`/story/${storyId}/chapter/${nextChapter.id}`} className="chapter-nav-button small">Next</Link>
          ) : (
            <span className="chapter-nav-button small disabled">Next</span>
          )}
        </div>
      </div>
    </div>
  )
}
