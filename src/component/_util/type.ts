export const tuple = <T extends string[]>(...args: T) => args

export const typleNum = <T extends number[]>(...args: T) => args

export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer E)[] ? E : never

export type LiteralUnion<T extends U, U> = T | (U & {})

export type DirectionType = 'ltr' | 'rtl' | undefined
