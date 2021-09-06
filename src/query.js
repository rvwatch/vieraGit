import axios from 'axios';
 
const accessToken = process.env.accessToken;


const buildQuery = (options) => {
  console.log('the options', options)
  const query = `
{
  organization(login: "ramda") {
    repositories(first:${options.first}){
      totalCount
      nodes{
        name
        pullRequests(first:${options.first},after:${options.after}, states:[OPEN,CLOSED,MERGED]){
          pageInfo{
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges{
            node{
              title
              createdAt
              state
              mergedAt
              author{
                login
              }
              mergeCommit{
                id
              }
            }
          }
        }
      }
    }   
  }
}
`;
return {query}
}
 
export async function getIssues (options) {

  
  try {
    const response = await axios('https://api.github.com/graphql', {
      method: 'POST',
      data: JSON.stringify(buildQuery(options)),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = response.data.data.organization.repositories.nodes;
    
    
    console.log('The data', data[0].pullRequests.pageInfo)

    // if there's an end cursor time to recurse on that
    // passing the end cursor INTO a new query


    return data;
  } catch (error) {
    console.error(error.message)
  }
}

