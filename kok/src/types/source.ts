import { Feed } from "./feed";

export interface ISource {
    fetch(): Promise<Feed>;
}
