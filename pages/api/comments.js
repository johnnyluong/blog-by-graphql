import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {

   

    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
            authorization: `Bearer ${graphcmsToken}`,
        },
    });

    const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

    try {
        const result = await graphQLClient.request(query, req.body);
        return res.status(200).send(result);

    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }



}







//typescript file
//Any file inside the folders pafes/api is mapped to /api/* and
//will be treated as an API endpoint instead of a page


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { GraphQLClient, gql } from 'graphql-request'

// const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;


// type Data = {
//   name: string
// }

// export default function comments(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {

//   const { name, email, slug, comment } = req.body;

//   const graphQLClient = new GraphQLClient(graphqlAPI, {
//     //auth headers
//     headers: {
//       authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
//     }
//   })

//   //mutation query to make changes to data
//   //connecting name email and comment to specific post
//   const query = gql`
//     mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
//       createComment(data: {name: $name, email: $email,comment: $comment, post: {connect: {slug: $slug}}}) {id}
//     }
//   `
//   const result = await graphQLClient.request(query, req.body)

//   return res.status(200).send(result);

// }
