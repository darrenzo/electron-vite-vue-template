import type { InjectionKey } from "vue";

export interface IDependencies {
    demo: string;
    anyObject: {
        val: number;
    };
}
// provide inject keys
export const injectedDependenciesKey = Symbol() as InjectionKey<IDependencies>;
