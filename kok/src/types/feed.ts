export type FeedItem = {
    link: string;
    title: string;
    pubDate: string;
    creator?: string;
};

export type Feed = {
    title: string;
    source: string;
    items: FeedItem[];
};
