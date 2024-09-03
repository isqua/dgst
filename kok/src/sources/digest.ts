import type { DigestConfig, IDigest, ISource } from "../types";
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
}
