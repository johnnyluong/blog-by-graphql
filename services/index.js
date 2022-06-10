//Contains all of the endpoints for all of the widgets in our app


import { request, gql } from 'graphql-request';

//reference to our graphcms endpoint defined in our .env
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            id
                            name
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
      
    
    `

    const results = await request(graphqlAPI, query);

    return results.postsConnection.edges;
}

//Get details of a post (specified by slug, which is required to be string in type)
export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug}){
                title
                excerpt
                featuredImage {
                    url
                }
                author{
                    name
                    bio
                    photo {
                        url
                    }
                }
                createdAt
                slug
                content {
                    raw
                }
                categories {
                    name
                    slug
                }
            }
        }
    
    `
    const results = await request(graphqlAPI, query, { slug });

    return results.post;
}

//get the 3 most recent posts for recent posts widget
export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const results = await request(graphqlAPI, query);

    return results.posts;
}

//get a list of posts based on current post and related categories for similar posts widget when viewing an individual post
//posts(...) in the query is the returned object which is why we return results.post
export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    //the third parameter in this line are the parameters of this function, which are needed to make the query
    const results = await request(graphqlAPI, query, { categories, slug });

    return results.posts;
}

//get the categories for categories widget
export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `
    const results = await request(graphqlAPI, query);

    return results.categories;
}