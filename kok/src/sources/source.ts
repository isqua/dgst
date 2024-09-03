import type { ISource } from "../types/source";

import { FeedSource } from "./feeds/feed.js";

export class Source {
    static build(src: string): ISource {
        return new FeedSource(src);
    }
}
