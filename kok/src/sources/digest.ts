import type {
    DigestCache,
    DigestConfig,
    Feed,
    IDigest,
    ISource,
} from "../types";
import { Source } from "./source.js";

export class Digest implements IDigest {
    public readonly sources: ISource[];

    constructor(protected config: DigestConfig) {
        this.sources = this.config.sources.map((s) => Source.build(s));
    }

    get title() {
        return this.config.title;
    }

    get path() {
        return this.config.path;
    }

    async *fetchFeeds(cache: DigestCache): AsyncGenerator<Feed> {
        const since = this.config.since();

        for (const src of this.config.sources) {
            const source = Source.build(src);
            const lastSeen = cache[src] ?? undefined;
            const feed = await source.fetch({ lastSeen, since });

            yield feed;
        }
    }
}
