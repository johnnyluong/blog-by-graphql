//with nextjs you don't need to use DOM routing like it is typically done in react
//you simply make a folder that aligns with the url hierarchy
//in this case url.com/post/ <- that post path is this folder
//this file [slug].tsx it the template for all of the post pages - the brackets make the file dynamic

import React from 'react'
import { useRouter } from 'next/router' //used to maintain connection to graphcms when we deploy the site and make changes to the data
import { getPosts, getPostDetails } from '../../services'

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components'

const PostDetails = ({ post }: { post: any }) => {
    const router = useRouter();

    if (router.isFallback) {
        //handles if data is still being loaded
        return <Loader />
    }


    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} />
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky top-8'>
                        <PostWidget slug={post.slug} categories={post.categories.map((category: any) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetails


//we pass in a slug for a sepcific post and it makes a graphql query to find that specific post and returns the data on that post
export async function getStaticProps({ params }: { params: any }) {
    //async function defined in services
    const data = await getPostDetails(params.slug);

    return {
        props: { post: data }
    }
}

//required for next.js server side generation (SSG)
//this page is dynamic, so this function tells next.js what possible pages this dynamic page acn render
export async function getStaticPaths() {
    //we need all of the posts we have in graphCMS
    const posts = await getPosts();

    return {
        //using the array of posts we obtained, we extract all of the slugs which are all the possible params for getStaticProps above
        paths: posts.map(({ node: { slug } }: { node: { slug: any } }) => ({ params: { slug } })),
        fallback: true,
    }

}