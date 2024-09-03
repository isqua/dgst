import type { Feed } from "./feed";

export type DigestCache = Record<string, string>;

export type DigestConfig = {
    title: string;
    path: string;
    sources: string[];
    since: () => Date;
};

export interface IDigest {
    title: string;
    path: string;
    fetchFeeds(cache: DigestCache): AsyncGenerator<Feed>;
}
