// import type { Setter } from "./types";

// type EffectCallback = () => void | (() => void);

// type StateSetter<S> = (prevState: S) => S;

// type StateHook<S> = [S, (newState: S | Setter<S>) => void];

// export function useState<S>(initialState: S): StateHook<S> {
//   let currentState = initialState;
//   const setState = (newState: S | Setter<S>) => {
//     if (typeof newState === "function") {
//       currentState = (newState as StateSetter<S>)(currentState);
//     } else {
//       currentState = newState;
//     }
//   };
//   return [currentState, setState];
// }

// export function useEffect(effect: EffectCallback, dependencies?: any[]): void {
//   if (!dependencies) {
//     effect();
//     return;
//   }
//   let prevDependencies = dependencies;
//   const cleanup = () => {
//     if (prevDependencies) {
//       prevDependencies = undefined;
//       effect();
//     }
//   };
//   const shouldRunEffect = prevDependencies.some((dependency, i) => dependency !== dependencies[i]);
//   if (shouldRunEffect) {
//     effect();
//     prevDependencies = dependencies;
//   }
//   return cleanup;
// }
