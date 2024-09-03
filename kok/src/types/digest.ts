import type { Feed } from "./feed";

export type DigestCache = {
    count: number;
    lastSeen: Record<string, string>;
};

export type DigestConfig = {
    title: string;
    path: string;
    sources: string[];
    since: () => Date;
};

export interface IDigest {
    path: string;
    getTitle(cache: DigestCache): string;
    fetchFeeds(cache: DigestCache): AsyncGenerator<Feed>;
}
