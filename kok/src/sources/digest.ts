import { DigestConfig, IDigest, ISource } from "../types";
import { Source } from "./source";

export class Digest implements IDigest {
    public readonly sources: ISource[];

    constructor(protected config: DigestConfig) {
        this.sources = this.config.sources.map(s => Source.build(s));
    }

    get title() {
        return this.config.title;
    }

    get since() {
        return this.config.since();
    }

    get path() {
        return this.config.path;
    }
}
