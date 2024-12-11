import { atom, selector } from 'recoil'

export const counterAtom = atom({
    key: "count",
    default: 0
});

export const isCounterEvenSel = selector({
    key: "isCounterEven",
    get: function ({ get }) {
        const count = get(counterAtom);
        return (count % 2 == 0);
    }
});