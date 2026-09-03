import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner'

const fallbackFeaturedStories = [
  { id: 1, title: 'The Last Empress', authorId: 'Aster', coverUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80', featured: '1' },
  { id: 2, title: 'Moonlit Promise', authorId: 'Nami', coverUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', featured: '1' },
  { id: 3, title: 'Royal Hearts', authorId: 'Iris', coverUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80', featured: '1' },
  { id: 7, title: 'Starlit Vows', authorId: 'Eden', coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', featured: '1' },
  { id: 8, title: 'The Hidden Garden', authorId: 'Noa', coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', featured: '1' }
]

const fallbackRegularStories = [
  { id: 4, title: 'Rose of the Mire', authorId: 'Lina', coverUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', featured: '0' },
  { id: 5, title: 'Velvet Tide', authorId: 'Sora', coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', featured: '0' },
  { id: 6, title: 'Winter Bloom', authorId: 'Mira', coverUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', featured: '0' }
]

export default function Home(){
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch('/api/stories')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setStories(data)
      })
      .catch(() => setStories([]))
      .finally(() => setLoading(false))
  }, [])

  const featuredStories = stories.filter((story) => String(story.featured ?? '').trim() === '1')
  const regularStories = stories.filter((story) => String(story.featured ?? '').trim() !== '1')

  const displayFeaturedStories = featuredStories.length ? featuredStories : fallbackFeaturedStories
  const displayRegularStories = regularStories.length ? regularStories : fallbackRegularStories
  const featuredSlides = displayFeaturedStories.slice(0, 5)
  const activeFeaturedStory = featuredSlides[activeFeaturedIndex] || featuredSlides[0]

  const showPreviousFeatured = () => {
    setActiveFeaturedIndex((currentIndex) => (currentIndex - 1 + featuredSlides.length) % featuredSlides.length)
  }

  const showNextFeatured = () => {
    setActiveFeaturedIndex((currentIndex) => (currentIndex + 1) % featuredSlides.length)
  }

  useEffect(() => {
    if (featuredSlides.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setActiveFeaturedIndex((currentIndex) => (currentIndex + 1) % featuredSlides.length)
    }, 2000)

    return () => window.clearInterval(intervalId)
  }, [featuredSlides.length])

  if (loading) return <div className="home-page"><Spinner label="Loading..." /></div>

  return (
    <div className="home-page">
      <section className="hero-grid" aria-label="Featured stories">
        <article className="hero-card featured-slide">
          <Link to={activeFeaturedStory.id ? `/story/${activeFeaturedStory.id}` : '/'}>
            <img src={activeFeaturedStory.coverUrl || fallbackFeaturedStories[0].coverUrl} alt={activeFeaturedStory.title || 'Story cover'} className="hero-cover" />
            <div className="hero-story-copy">
              <span className="promo-tag hot">FEATURED</span>
              <h3>{activeFeaturedStory.title}</h3>
              <p>{activeFeaturedStory.authorId}</p>
            </div>
          </Link>
          <button type="button" className="featured-arrow featured-arrow-left" onClick={showPreviousFeatured} aria-label="Previous featured story">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          <button type="button" className="featured-arrow featured-arrow-right" onClick={showNextFeatured} aria-label="Next featured story">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>
          <div className="featured-dots" aria-label="Choose featured story">
            {featuredSlides.map((story, index) => (
              <button
                type="button"
                key={story.id ?? index}
                className={`featured-dot${index === activeFeaturedIndex ? ' active' : ''}`}
                onClick={() => setActiveFeaturedIndex(index)}
                aria-label={`Show featured story ${index + 1}: ${story.title}`}
                aria-current={index === activeFeaturedIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </article>
      </section>

      <section className="release-section">
        <div className="section-head">
          <h2>New Releases</h2>
        </div>

        <div className="release-row">
          {displayRegularStories.map((story, index) => (
            <Link to={story.id ? `/story/${story.id}` : '/'} key={story.id ?? index} className="release-card">
              <img src={story.coverUrl || `https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80`} alt={story.title || 'Story cover'} />
              <div className="release-card-copy">
                <strong>{story.title}</strong>
                <span>{story.authorId}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
