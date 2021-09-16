import axios from 'axios';
import { buildReposQuery, buildUserQuery, PullRequestForRepoQuery } from './buildQuery';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const queryGraph = (query, variables) => {
  return axios('https://api.github.com/graphql', {
    method: 'POST',
    data: JSON.stringify({ query, variables }),
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });
}


// \function queryGraph(query, variables) {
//   // await foo();
//   // await baz();

//   // await Promise.all([a(), b()]);


//   return axios('https://api.github.com/graphql', {
//     method: 'POST',
//     data: JSON.stringify({ query, variables }),
//     headers: {
//       'Authorization': `Bearer ${ACCESS_TOKEN}`,
//     },
//   });
// }

// new Promise((resolve, reject) => {
//   throw new Error(message);
// });

export const getPullRequestsForRepo = async variables => {
  const response = await queryGraph(PullRequestForRepoQuery, variables);

  const { pullRequests } = response.data.data.organization.repository;
  const after = pullRequests.pageInfo.hasNextPage && pullRequests.pageInfo.endCursor;
  const prs = pullRequests.edges.map(edge => edge.node);

  return { prs, after };
};

export const getRepos = async variables => {
  const response = await queryGraph(ReposQuery, variables);

  const { repositories } = response.data.data.organization;
  const after = repositories.pageInfo.hasNextPage && repositories.pageInfo.endCursor;
  const page = repositories.nodes.map(repo => repo.name);

  return { page, after };
}

export const getUserData = async variables => {
    const response = await queryGraph(UserQuery, variables);

    const { pullRequests } = response.data.data.viewer.repositories.nodes;
    const after = pullRequests.pageInfo.hasNextPage && pullRequests.pageInfo.endCursor;
    const prs = pullRequests.edges.map(edge => edge.node);

    return { prs, after };
  } 


// export const getPullRequestsForRepoPage = async (options) => {
//   try {
//     const response = await axios('https://api.github.com/graphql', {
//       method: 'POST',
//       data: JSON.stringify(buildPullQuery(options)),
//       headers: {
//         'Authorization': `Bearer ${ACCESS_TOKEN}`,
//       },
//     });

//     const { pullRequests } = response.data.data.organization.repository;
//     const after = pullRequests.pageInfo.hasNextPage && pullRequests.pageInfo.endCursor;
//     const prs = pullRequests.edges.map(edge => edge.node);

//     return { prs, after };
//   } catch (err) {
//     console.error(err);
//   }
// }