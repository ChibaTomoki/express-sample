type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

export type SnakeToCamel<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K] extends object
    ? SnakeToCamel<T[K]>
    : T[K];
};
