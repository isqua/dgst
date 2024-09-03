import { Feed } from "./feed";

export type FetchOptions = {
    lastSeen?: string;
    since?: Date;
};

export interface ISource {
    fetch(options: FetchOptions): Promise<Feed>;
}
