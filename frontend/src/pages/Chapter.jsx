import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner'


export default function Chapter({ setChapterStoryTitle }){
  const { title_id, chapter_number } = useParams()
  const [story, setStory] = useState(null)
  const [chapters, setChapters] = useState([])
  const [chapterImages, setChapterImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch(`/api/stories/${title_id}`),
      fetch(`/api/stories/${title_id}/${chapter_number}`)
    ])
    .then(([storyResponse, chapterResponse]) => Promise.all([storyResponse.json(), chapterResponse.json()]))
    .then(([storyData, chapterData]) => {
      const loadedChapters = Array.isArray(storyData.chapters) ? storyData.chapters : []
      setStory(storyData.story)
      setChapterStoryTitle(storyData.story?.title || '')
      setChapters(loadedChapters)
      setChapterImages(Array.isArray(chapterData.images) ? chapterData.images : [])
      const index = loadedChapters.findIndex(
        (chapter) => String(chapter.chapterNumber) === String(chapter_number)
      )
      const safeIndex = index >= 0 ? index : 0
      setCurrentIndex(safeIndex)
    }).catch(() => {
      setChapterStoryTitle('')
      setStory(null)
      setChapters([])
      setChapterImages([])
      setCurrentIndex(0)
    }).finally(() => setLoading(false))
  }, [chapter_number, setChapterStoryTitle, title_id])

  if (loading) return <div className="story-page"><Spinner label="Loading chapter..." /></div>
  if (!story) return <div className="story-page">Story not found.</div>

  const currentChapter = chapters[currentIndex] || null
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  return (
    <div className="story-page chapter-page">
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

      <nav className="chapter-bottom-navigation" aria-label="Chapter navigation">
        {previousChapter ? (
          <Link
            to={`/story/${title_id}/${previousChapter.chapterNumber}`}
            className="chapter-nav-button"
            aria-label={`Go to previous chapter, ${previousChapter.title || previousChapter.chapterNumber}`}
          >
            ←
          </Link>
        ) : (
          <span className="chapter-nav-button disabled" aria-disabled="true" aria-label="No previous chapter">
            ←
          </span>
        )}

        {nextChapter ? (
          <Link
            to={`/story/${title_id}/${nextChapter.chapterNumber}`}
            className="chapter-nav-button"
            aria-label={`Go to next chapter, ${nextChapter.title || nextChapter.chapterNumber}`}
          >
            →
          </Link>
        ) : (
          <span className="chapter-nav-button disabled" aria-disabled="true" aria-label="No next chapter">
            →
          </span>
        )}
      </nav>
    </div>
  )
}
