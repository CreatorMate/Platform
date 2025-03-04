export enum Sender {
    USER = "you", CREATORMATE = "creatormate",
}

export type ChatMessage = {
    sender: Sender
    message: string,
    type: string,
}