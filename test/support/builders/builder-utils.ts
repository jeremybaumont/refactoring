import cloneDeep from 'lodash.clonedeep';

export type Builder<T> = { build: () => T }

export type BuilderOrRaw<T> = T | Builder<T>

const isBuilder = <T>(builderOrRaw: BuilderOrRaw<T>): builderOrRaw is Builder<T> =>
    typeof (builderOrRaw ?? {}).build === 'function';

export const buildValue = <T>(builderOrRaw: BuilderOrRaw<T>): T =>
    isBuilder(builderOrRaw) ? builderOrRaw.build() : cloneDeep(builderOrRaw);

