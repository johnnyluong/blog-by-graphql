import { NextPage } from 'next';
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components/';
import FeaturedPosts from '../sections/FeaturedPosts';
import { getPosts } from '../services';





const Home = ({posts}: {posts: any}) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>fullstack.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post: any) => <PostCard post={post.node} key={post.title} />)}
        </div>


        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget categories={null} slug={null}/>
            <Categories />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home


//fetch data outside of the component (from Next.js)
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts } //fetch data
  }
}