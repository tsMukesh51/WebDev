import { atom } from 'recoil'

export const counterAtom = atom({
    key: "count",
    default: 0
});