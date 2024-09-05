export type CirclularStack<T> = {
    items: T[];
    maxSize: number;
};

export const createCircularStack = <T>(maxSize: number): CirclularStack<T> => ({
    items: [],
    maxSize
});

export const unmarshalCircularStack = <T>(history: string, maxSize: number): CirclularStack<T> => ({
    items: JSON.parse(history),
    maxSize: maxSize
});

export const push = <T>(stack: CirclularStack<T>, item: T): CirclularStack<T> => {
    const newItems = stack.items.length >= stack.maxSize
        ? [...stack.items.slice(1), item]
        : [...stack.items, item];
    return { ...stack, items: newItems };
};

export const get = <T>(stack: CirclularStack<T>, index: number): T | undefined => {
    const reverseIndex = stack.items.length - 1 - index;
    return stack.items[reverseIndex];
};

