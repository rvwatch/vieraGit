import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';
 
const accessToken = "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";


const buildReposQuery = (options) => {
  console.log('the options', options)
  const query = `
  query Organization($after: String) {
    organization(login: "ramda") {
      repositories(first:100, after:$after){
        pageInfo{
          endCursor
          hasNextPage
        }
        totalCount
        nodes{
          name
        }
      }
    }
  }
`;
console.log('Current Query!', query);
return { query, variables: options }
}

const buildPullQuery = (options) => {
  //console.log('the options', options)
  const query = `
  query Organization($after: String, $name: String!) {
    organization(login: "ramda") {
      repository(name: $name){
          name
          pullRequests(
            first:100,
            after:$after, 
            states:[OPEN,CLOSED,MERGED], 
            orderBy:{ field: UPDATED_AT, direction:DESC }
          ){
            edges{
              cursor
              node{
                id
                title
                createdAt
                closedAt
                state
                mergedAt
                author{
                  login
                }
              }
            }
            pageInfo{
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
        }
      }
    }
  }
`;
//console.log('Current Query!', query);
return { query, variables: options }
}

let myCache = {
  // repos: {},
  lastQueryTime: null,
  prs: {} // id -> PR obj
};

function loadCache() {
    return new Promise((resolve, reject) => {
      fs.readFile('cache.json', (err, data) => {
        if (err){
          reject(err); 
          return;
        }
        myCache = JSON.parse(data.toString());
        resolve();
      });
    });
}

function saveCache() {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      'cache.json',
      JSON.stringify(myCache, null, 2),
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export const getAllPullRequests = async () => {
  await loadCache();
  console.log('CACHE:', myCache);
  const repos = await getAllRepos(); 
  console.log('ALL REPOS:', repos);

  // data = [{
  //   repoName: '',
  //   prs: []
  // }];
  const data = await Promise.all(repos.map(async repoName =>  {
    const prs = await getAllPRs(repoName);
    
    return { repoName, prs };
  }));

  data.forEach(({ repoName, prs }) => {
    prs.forEach(pr => {
      pr.repoName = repoName;
      myCache.prs[pr.id] = pr;
    });
  });

  // console.log('cache:', myCache);
  await saveCache();

  return data;
}

export const getAllRepos = async () => {
  let after = null; 
  let repos = [];
  while(true){
    const { page, after: _after } = await getReposPage({after});
    repos = [...repos, ...page]
    if(_after){
      after = _after;
    } else {
      break; 
    }
  }
  // return repos; 
  // TODO: un-hardcode
  return [
    // 'ramda',
    'ramdangular',
    'ramda.github.io'
  ];
}

export const getReposPage = async (options) => {
  try {
    const response = await axios('https://api.github.com/graphql', {
      method: 'POST',
      data: JSON.stringify(buildReposQuery(options)),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const { repositories } = response.data.data.organization;
    const after = repositories.pageInfo.hasNextPage && repositories.pageInfo.endCursor;
      
    const page = repositories.nodes.map(repo => repo.name);

    return {page, after};

    } catch (err) {
      console.log(err);
    }
  }
  
export const getAllPRs = async repoName => {
  let after = null; 
  let data = [];
  while(true){
    const { prs, after: _after } = await getPullRequestForRepo({
      after,
      name: repoName
    });
    // console.log('requested PRS', prName)
    data = [...data, ...prs];
    if(_after){
      after = _after;
      //console.log('Heres after', after)
    } else {
      break; 
    }
  }
  // console.log('Data in line 132', data)
  return data; 
}


  export const getPullRequestForRepo = async (options) => {
    
    try {
      const response = await axios('https://api.github.com/graphql', {
        method: 'POST',
        data: JSON.stringify(buildPullQuery(options)),
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      // console.log('THE PR RESPONSE!', response.data.data.organization.repository)
      const { pullRequests } = response.data.data.organization.repository;
      const after = pullRequests.pageInfo.hasNextPage && pullRequests.pageInfo.endCursor;
        
      const prs = pullRequests.edges.map(edge => edge.node);
      // console.log('WHAT IS PRS? new ARRAY', prs)
      return {prs, after};
  
      } catch (err) {
        console.log(err);
      }
    }