
## Introduction

This is a [Graphql](https://graphql.org/) project for google Chrome plugin [`PodSPhere`](https://github.com/timothyshen/PodSPhere).

## Project Structure
```
.
├──  README.md
├── dist
├── node_modules
├── package-lock.json
├── package.json
├── src
├── tsconfig.json
└── vercel.json
```
## Getting Started
To set up and run the GraphQL server, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/peacheychen/graphql-backend
```
2. Navigate to the project directory:

```bash
cd graphql-backend
```

3. Install dependencies:

```bash
npm install
```

4. run the server:

```bash
npm run dev
```
Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

You can start editing the page by modifying `src/index.ts`. 


## Learn More

### Usage
The server provides a GraphQL API to query and mutate podcasts, episodes, and comments. Use a tool like Apollo Explorer or GraphQL Playground to interact with the API.

### Schema
The GraphQL schema defines the types and operations supported by the server. Here are the key types:

Podcast
Episode
Comment

###  Queries and Mutations
Queries
- getPodcasts: Retrieve a list of podcasts.
- getEpisodes(podcastId: ID): Retrieve episodes for a specific podcast.
- getComments(episode_title: ID, platform: String): Retrieve comments for an episode, optionally filtered by platform.

Mutations
- addComment(episode_title: ID!, profile_id: String!, content: String!, platform: String!, comment_hash: String!): Add a new comment to an episode.

Resolvers
- Resolvers define how to fetch the types defined in the schema. They retrieve data from the mock dataset based on the queries.

Contributing
- Feel free to contribute to this project by reporting issues, suggesting improvements, or submitting pull requests.

## Deploy on Vercel

The easiest way to deploy the app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
