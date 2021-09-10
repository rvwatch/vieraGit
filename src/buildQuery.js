export const buildReposQuery = (options) => {
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
    return { query, variables: options }
}

export const buildPullQuery = (options) => {
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
    return { query, variables: options }
}