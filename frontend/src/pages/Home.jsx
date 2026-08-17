import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner'

const fallbackFeaturedStories = [
  { id: 1, title: 'The Last Empress', authorId: 'Aster', coverUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80', featured: '1' },
  { id: 2, title: 'Moonlit Promise', authorId: 'Nami', coverUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', featured: '1' },
  { id: 3, title: 'Royal Hearts', authorId: 'Iris', coverUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80', featured: '1' }
]

const fallbackRegularStories = [
  { id: 4, title: 'Rose of the Mire', authorId: 'Lina', coverUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', featured: '0' },
  { id: 5, title: 'Velvet Tide', authorId: 'Sora', coverUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', featured: '0' },
  { id: 6, title: 'Winter Bloom', authorId: 'Mira', coverUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', featured: '0' }
]

export default function Home(){
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) return <div className="home-page"><Spinner label="Loading..." /></div>

  const featuredStories = stories.filter((story) => String(story.featured ?? '').trim() === '1')
  const regularStories = stories.filter((story) => String(story.featured ?? '').trim() !== '1')

  const displayFeaturedStories = featuredStories.length ? featuredStories : fallbackFeaturedStories
  const displayRegularStories = regularStories.length ? regularStories : fallbackRegularStories

  return (
    <div className="home-page">
      <section className="hero-grid">
        {displayFeaturedStories.slice(0, 3).map((story, index) => {
          const heroClass = index === 0 ? 'hero-card-dark' : index === 1 ? 'hero-card-peach' : 'hero-card-green'

          return (
            <article key={story.id ?? index} className={`hero-card hero-card-dark`}>
              <Link to={story.id ? `/story/${story.id}` : '/'} key={story.id ?? index}>
              
              <img src={story.coverUrl || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'} alt={story.title || 'Story cover'} className="hero-cover" />
              <div className="hero-story-copy">
                <span className="promo-tag hot">FEATURED</span>
                <h3>{story.title}</h3>
                <p>{story.authorId}</p>
              </div>
              </Link>
            </article>
          )
        })}
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
