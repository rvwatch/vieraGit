import { getPullRequestsForRepo, getReposPage, getUserData } from './getData';
import { myCache, loadCache, saveCache, hasCachedData } from "./cacheFunctions";

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

export const getAllPRs = async repoName => {
  let after = null;
  let data = [];
  while (true) {
    const { prs, after: _after } = await getPullRequestsForRepo({
      after,
      name: repoName
    });
    data = [...data, ...prs];

    if (_after && !hasCachedData(prs)) {
      after = _after;
    } else {
      break;
    }
  }

  return data;
}






