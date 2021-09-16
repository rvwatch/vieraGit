export const ReposQuery =`
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

export const PullRequestForRepoQuery = `
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
                updatedAt
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

export const UserQuery = `
  {
    viewer {
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          owner {
            login
          }
          name
          pullRequests(first: 100, states: [OPEN, CLOSED, MERGED], orderBy: {field: UPDATED_AT, direction: DESC}) {
            edges {
              node {
                author {
                  login
                }
                title
                createdAt
                mergedAt
                state
              }
            }
          }
        }
      }
    }
  }
`;