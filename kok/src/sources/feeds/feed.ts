import Parser from "rss-parser";

import type { FeedItem, FetchOptions, ISource } from "../../types";

const isFeedItem = (item: Parser.Item): item is FeedItem => {
    return Boolean(item.title) && Boolean(item.link);
};

export class FeedSource implements ISource {
    constructor(
        public readonly url: string,
        protected parser: Parser = new Parser({
            requestOptions: {
                timeout: 5000,
            },
        }),
    ) {}

    async fetch({ lastSeen, since }: FetchOptions) {
        const feed = await this.parser.parseURL(this.url);
        const title = feed.title ?? this.url;
        const lastPubDate = this.calculateLastSeen(
            { lastSeen, since },
            feed.items,
        );

        const items = feed.items.filter<FeedItem>((item): item is FeedItem => {
            if (!isFeedItem(item) || !item.pubDate) {
                return false;
            }

            if (!lastPubDate) {
                return true;
            }

            const pubDate = new Date(item.pubDate);

            return pubDate > lastPubDate;
        });

        return {
            ...feed,
            source: this.url,
            title,
            items,
        };
    }

    protected calculateLastSeen(
        { lastSeen, since }: FetchOptions,
        items: Parser.Item[],
    ) {
        if (lastSeen) {
            const lastSeenItem = items.find((item) => item.link === lastSeen);
            const lastPubDate =
                lastSeenItem && lastSeenItem.pubDate
                    ? new Date(lastSeenItem.pubDate)
                    : undefined;

            if (lastPubDate && !isNaN(lastPubDate.valueOf())) {
                return lastPubDate;
            }
        }

        return since;
    }
}
