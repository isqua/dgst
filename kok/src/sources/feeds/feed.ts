import Parser from "rss-parser";

import type { FeedItem, ISource } from "../../types";

const isFeedItem = (item: Parser.Item): item is FeedItem => {
    return Boolean(item.title) && Boolean(item.link);
};

export class FeedSource implements ISource {
    constructor(
        public readonly url: string,
        protected parser: Parser = new Parser(),
    ) {}

    async fetch() {
        const feed = await this.parser.parseURL(this.url);

        const title = feed.title ?? this.url;

        const items = feed.items.filter<FeedItem>(isFeedItem);

        return {
            ...feed,
            title,
            items,
        };
    }
}
