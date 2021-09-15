import axios from 'axios';
import { buildReposQuery, buildPullQuery, buildUserQuery } from './buildQuery';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export const getPullRequestsForRepoPage = async (options) => {
  try {
    const response = await axios('https://api.github.com/graphql', {
      method: 'POST',
      data: JSON.stringify(buildPullQuery(options)),
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const { pullRequests } = response.data.data.organization.repository;
    const after = pullRequests.pageInfo.hasNextPage && pullRequests.pageInfo.endCursor;
    const prs = pullRequests.edges.map(edge => edge.node);

    return { prs, after };
  } catch (err) {
    console.log(err);
  }
}

export const getReposPage = async (options) => {
  try {
    const response = await axios('https://api.github.com/graphql', {
      method: 'POST',
      data: JSON.stringify(buildReposQuery(options)),
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const { repositories } = response.data.data.organization;
    const after = repositories.pageInfo.hasNextPage && repositories.pageInfo.endCursor;
    const page = repositories.nodes.map(repo => repo.name);

    return { page, after };
  } catch (err) {
    console.log(err);
  }
}

export const getUserData = async (options) => {
  try {
    const response = await axios('https://api.github.com/graphql', {
      method: 'POST',
      data: JSON.stringify(buildUserQuery(options)),
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const { pullRequests } = response.data.data.viewer.repositories.nodes;
    const after = pullRequests.pageInfo.hasNextPage && pullRequests.pageInfo.endCursor;
    const prs = pullRequests.edges.map(edge => edge.node);

    return { prs, after };
  } catch (err) {
    console.log(err);
  }
}