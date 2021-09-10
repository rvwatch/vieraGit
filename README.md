# vieraGit - custom github cli

## Description

vieraGit is a custom CLI that leverages GraphQL and the Github API to gather pull request data from Github Orgs/Repositories. It currently pulls in data from the "Ramda" org on github.

## Tech used

NodeJS
GraphQL
Axios

### MVP

Retrieve EVERY pull request for the Ramda organization
Use the Github web API — I’m trying out the GraphQL version
Store the results in memory
Make a NodeJS console app

## Getting Started

Clone the repository - `git clone https://github.com/rvwatch/vieraGit.git`

CD into the repository and run:

### `npm install`

### `npm link`

### Env var setup

You'll need to have a PAT (Personal Access Token) setup and in place in order to Auth to the Github graphql api.
<https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token>

After that's created you can export your token directly into your shell as:

### `ACCESS_TOKEN`

Examples:

- for linux: `export ACCESS_TOKEN="your PAT"`
- for windows: `$env:ACCESS_TOKEN = "your PAT"`

After that's in place you should be able to hop into your shell and run:

```
vieraGit
```

in your terminal and you should receive a response of:

```
Cache Created!
Total Available Prs = 1986
```

This represent the total number of currently accesible PRs in the Ramba org and all it's repositories.

### Biggest Challenges

Getting up to speed with GraphQL. I've been wanting to dig into some GraphQL concepts to get a better sense of what it's about and why I'm seeing it everywhere. It is obviously quite powerful, however, there was a bit of a learning curve I needed to get past in order to be effective. Probably not the best time to jump into new tech. That being said, I'm glad I did as it's clear now why GraphQL can be so powerful.

Pagination in GraphQL and Github. This was significantly more challenging than I expected. I'm fairly certain I managed to settle on a decent attempt at pagination but will be very curious to see this in action in a hardened code base. I ran into a ton of spaghetti code and had multiple days of deleting and re-writing code in order to get something that worked.

Caching or rather make the application "smart" enough to use the cache rather than running a long running API request. I still wanted to have a check in place that would figure out if there was a newly updated PR and add that to the cache. I settled on essentially taking the first 100 prs and comparing the oldest of the lot to a new Date() I added to my cache. I compare the two dates and if the oldest PR is new than the last query time, I step into the next bach of PRs. If not, I simply add the 1 query to my cache and move on to the next repo.

### What I didn't get to

Tests... Tests... Tests...
As a result of trying out GraphQL for the first time and really struggling with an effective pagination / caching setup, I decided to forego testing in the short term. In other words I assumed TDD wouldn't be as effective while trying to learn a completely new tech. I'm on the fence about that. This probably would have gone smoother if I had really force myself to graple with the shape of my data first.

Flags. I originally had a plan of being able to pass in flags like '--repoName ramda' that would allow me to target a specific repo in an org. I'd also like to get these in place for filtering data by dates for example.
