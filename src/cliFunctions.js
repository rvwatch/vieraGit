import { getPullRequestsForRepoPage, getReposPage } from './getData';
import fs from 'fs';

let myCache = {
  lastQueryTime: null,
  prs: {},
  prCount: 0,
  repoNames: []
};

function loadCache() {
  return new Promise((resolve) => {
    fs.readFile('cache.json', (err, data) => {
      if (err) {
        console.log('Cache not found, re-running query.')
        resolve();
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
        if (err) {
          reject(err);
        } else {
          console.log('Cache Created!');
          console.log('Total Available Prs =', myCache.prCount);
          resolve();
        }
      }
    );
  });
}

export const gatherAllPullRequests = async () => {
  await loadCache();

  myCache.repoNames = await getAllRepos();
  const newData = await Promise.all(myCache.repoNames.map(async repoName => {
    const prs = await getAllPRs(repoName);

    return { repoName, prs };
  }));

  newData.forEach(({ repoName, prs }) => {
    prs.forEach(pr => {
      pr.repoName = repoName;
      myCache.prs[pr.id] = pr;
    });
  });

  const data = {};
  Object.keys(myCache.prs).forEach(id => {
    const pr = myCache.prs[id];
    const { repoName } = pr;
    if (!data[repoName]) data[repoName] = {};
    data[repoName][pr.id] = pr;
  });

  myCache.lastQueryTime = new Date(Date.now() - 30000).toISOString();
  myCache.prCount = Object.keys(myCache.prs).length
  await saveCache();

  return data;
}

export const getAllRepos = async () => {
  let after = null;
  let repos = [];
  while (true) {
    const { page, after: _after } = await getReposPage({ after });
    repos = [...repos, ...page]
    if (_after) {
      after = _after;
    } else {
      break;
    }
  }
  return repos;
}

function hasCachedData(prs) {
  const last = new Date(myCache.lastQueryTime);
  const oldestNode = new Date(prs[prs.length - 1].updatedAt);
  return last > oldestNode;
}

export const getAllPRs = async repoName => {
  let after = null;
  let data = [];
  while (true) {
    const { prs, after: _after } = await getPullRequestsForRepoPage({
      after,
      name: repoName
    });
    // console.log('requested PRS', prName)
    data = [...data, ...prs];

    if (_after && !hasCachedData(prs)) {
      after = _after;
      //console.log('Heres after', after)
    } else {
      break;
    }
  }
  // console.log('Data in line 132', data)
  return data;
}




