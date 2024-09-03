import { Feed } from "./feed";

export type FetchOptions = {
    since?: Date;
}

export interface ISource {
    fetch(options: FetchOptions): Promise<Feed>;
}
