import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

export default function Chapter(){
  const { storyId, chapterId } = useParams()
  const navigate = useNavigate()
  const [story, setStory] = useState(null)
  const [chapters, setChapters] = useState([])
  const [chapterImages, setChapterImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [imagesLoading, setImagesLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch('/api/stories').then((r) => r.json()),
      fetch(`/api/stories/${storyId}/chapters`).then((r) => r.json())
    ]).then(([list, chaptersList]) => {
      const selectedStory = list.find((x) => String(x.id) === String(storyId))
      setStory(selectedStory || null)
      setChapters(Array.isArray(chaptersList) ? chaptersList : [])
    }).catch(() => {
      setStory(null)
      setChapters([])
    }).finally(() => setLoading(false))
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

    setImagesLoading(true)
    fetch(`/api/chapter/${chapterId}`)
      .then((r) => r.json())
      .then((images) => setChapterImages(Array.isArray(images) ? images : []))
      .catch(() => setChapterImages([]))
      .finally(() => setImagesLoading(false))
  }, [chapterId, chapters])

  if (loading) return <div className="story-page"><Spinner label="Loading chapter..." /></div>
  if (!story) return <div className="story-page">Story not found.</div>

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

        {imagesLoading ? (
          <Spinner label="Loading pages..." />
        ) : chapterImages.length ? (
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
