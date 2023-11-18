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
    episodeId: string;
    author: string;
    content: string;
    postedAt: string;
    platform: string;
}

// Utility functions for random data generation
const generateRandomId = () => Math.random().toString(36);
const randomFromArray = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = () => new Date(+new Date() - Math.floor(Math.random() * 10000000000)).toISOString();

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
    episodeId: episode.id,
    author: `User_${generateRandomId()}`,
    content: randomFromArray(sampleContent),
    postedAt: randomDate(),
    platform: randomFromArray(platforms)
})));
