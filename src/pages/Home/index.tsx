import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { PersonInfo } from './ProfileInfo'
import { PostCard } from './PostCard'
import {
  HomeContainer,
  HomeContent,
  ListSection,
  SearchSection,
} from './styles'

export interface IPost {
  title: string
  body: string
  created_at: string
  number: string
}

export function Home() {
  const [posts, setPosts] = useState<IPost[]>([] as IPost[])
  const [postsCounter, setPostsCounter] = useState(0)

  const fetchPosts = useCallback(async (query: string | null) => {
    console.log('query', query)
    const response = await api.get(
      `search/issues?q=repo:germanoricardi/desafios-rocketseat-coffee-delivery/issues?q=is%3Aopen+${query}`,
    )

    setPosts(response.data.items)
    setPostsCounter(response.data.total_count)
  }, [])

  useEffect(() => {
    fetchPosts('')
  }, [fetchPosts])

  return (
    <HomeContainer>
      <PersonInfo></PersonInfo>
      <HomeContent>
        <SearchSection>
          <div>
            <span>Publicações</span>
            <small>
              {postsCounter} publicaç{`${postsCounter > 1 ? 'ões' : 'ão'}`}
            </small>
          </div>
          <input
            type="text"
            onKeyDown={(e) =>
              e.key === 'Enter' && fetchPosts(e.currentTarget.value)
            }
            onBlur={(e) => fetchPosts(e.currentTarget.value)}
            placeholder="Busque o conteúdo e tecle [Enter]"
          />
        </SearchSection>
        <ListSection>
          {posts &&
            posts.map((post) => (
              <PostCard
                key={`${post.title}-${post.number}`}
                post={post}
              ></PostCard>
            ))}
        </ListSection>
      </HomeContent>
    </HomeContainer>
  )
}
