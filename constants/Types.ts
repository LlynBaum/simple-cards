export type Deck = {
    id: string;
    name: string;
    cards: Card[];
}

export type Card = {
    id: string;
    front: string;
    back: string;
    deckId: number;
}