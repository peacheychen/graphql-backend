import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// import { podcasts, episodes, comments, Podcast, Episode, Comment } from './mockdata';


// Add a function to generate a random hash
const generateRandomHash = () => {
    // Implement your logic to generate a random hash (e.g., using a library)
    // For simplicity, here's a basic example using Math.random()
    const hashLength = 32; // Adjust the length based on your requirements
    const characters = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < hashLength; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };


export interface Podcast {
    id: string;
    title: string;
    description: string;
}

export interface Episode {
    id: string;
    podcastId: string;
    title: string;
    description: string;
}

export interface Comment {
    id: string;
    episode_title: string;
    profile_id: string;
    content: string;
    comment_hash: string;
    platform: string;
}

// Utility functions for random data generation
const generateRandomId = () => Math.random().toString(36);
const randomFromArray = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Sample data for randomization
const sampleTitles = ['Tech Today', 'Nature Talks', 'History Unveiled'];
const sampleDescriptions = ['A deep dive into technology', 'Exploring the secrets of nature', 'History from a new perspective'];
const sampleContent = ['Great episode!', 'Very informative', 'Loved the discussion'];
const platforms = ['Spotify', 'Google', 'Apple'];

// Generating mock data
export const podcasts: Podcast[] = Array.from({ length: 3 }, () => ({
    id: generateRandomId(),
    title: randomFromArray(sampleTitles),
    description: randomFromArray(sampleDescriptions)
}));

export const episodes: Episode[] = podcasts.map(podcast => ({
    id: generateRandomId(),
    podcastId: podcast.id,
    title: `Episode on ${podcast.title}`,
    description: `An interesting episode on ${podcast.title}`
}));

export const comments: Comment[] = episodes.flatMap(episode => Array.from({ length: 3 }, () => ({
    id: generateRandomId(),
    episode_title: episode.id,
    profile_id: `User_${generateRandomId()}`,
    content: randomFromArray(sampleContent),
    comment_hash: generateRandomHash(),
    platform: randomFromArray(platforms)
})));





// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
    type Podcast {
        id: ID
        title: String
        description: String
        episodes: [Episode]
    }

    type Episode {
        id: ID
        title: String
        description: String
        comments: [Comment]
    }

    type Comment {
        id: ID
        profile_id: String
        content: String
        comment_hash: String
        platform: String
        episode_title: String
    }

    type Query {
        getPodcasts: [Podcast]
        getEpisodes(podcastId: ID): [Episode]
        getComments(episode_title: ID, platform: String): [Comment]
        
    }

    type Mutation {
        addComment(episode_title: ID!, profile_id: String!, content: String!, platform: String!, comment_hash: String!): Comment
    }
`;




  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getPodcasts: (): Podcast[] => podcasts,
        getEpisodes: (_: any, { podcastId }: { podcastId: string }): Episode[] => episodes.filter(e => e.podcastId === podcastId),
        // getComments: (_: any, { episode_title, platform }: { episode_title: string; platform?: string }): Comment[] => {
        //     let filteredComments = comments.filter(c => c.episode_title === episode_title);
        //     if (platform) {
        //         filteredComments = filteredComments.filter(c => c.platform === platform);
        //     }
        //     return filteredComments;
        // },
        getComments: (): Comment[] => comments,
          
    },

    // Mutation: {
    //     addComment: (_: any, { episode_title, profile_id, content, platform }: { episode_title: string; profile_id: string; content: string; platform: string; comment_hash: string }): Comment => {
    //       const newComment: Comment = { id: String(comments.length + 1), episode_title, profile_id, content, comment_hash: new Date().toISOString(), platform };
    //       comments.push(newComment);
    //       return newComment;
    //     },
    // },
    Mutation: {
        addComment: (_: any, { episode_title, profile_id, content, comment_hash, platform }: { episode_title: string; profile_id: string; content: string; comment_hash : string; platform : string }): Comment => {
          const newComment: Comment = { 
            id: String(comments.length + 1),
            episode_title,
            profile_id,
            content,
            comment_hash,  // Use your random hash generator
            platform
          };
          comments.push(newComment);
          return newComment;
        },
      },
      
      

    Podcast: {
        episodes: (podcast: Podcast): Episode[] => episodes.filter(e => e.podcastId === podcast.id)
    },
    
        
    Episode: {
        comments: (episode: Episode): Comment[] => comments.filter(c => c.episode_title === episode.id)
        }
    };


const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);