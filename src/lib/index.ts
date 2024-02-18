interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
}

interface Spell {
    id: number;
    channeling: boolean;
    cooldown: number;
    archetype: number;
    range: number;
    image: string;
    name: string;
    description: SpellDescription;
    cost: SpellCost
}

interface SpellDescription {
    format: string;
    translation: Translation;
}

interface Translation {
    "pt-BR": string;
}

interface SpellCost {
    mana: Array<number> | null
}

interface Archetype {
    id: number,
    name: string,
}

export type { Item, Spell, Archetype };