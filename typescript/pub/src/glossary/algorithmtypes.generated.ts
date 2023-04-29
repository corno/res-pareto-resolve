import * as pt from 'pareto-core-types'

import { T } from "./datatypes.generated"


export namespace ASYNC {
    
    export namespace I {}
    
    export namespace A {}
}

export namespace SYNC {
    
    export namespace I {
        
        export type OnError = ($: T.Error, ) => void
    }
    
    export namespace A {
        
        
        export namespace F {
            export type SafeResolveDictionary = <TIn, TOut>($: T.Dictionary<TIn>, $c: {
                'map': ($: TIn, $l: {
                    'all siblings': pt.Lookup<T.AnySibling<TOut>>
                    'non circular siblings': pt.Lookup<TOut>
                }) => TOut,
            }) => T.Dictionary<TOut>
        }
        
        
        export namespace F {
            export type SortTopologically = <TType>($: T.Dictionary<TType>, $c: {
                'map': ($: TType) => T.NullDictionary,
            }) => T.Array<TType>
        }
        
        
        export namespace F {
            export type UnsafeResolveDictionary = <TIn, TOut>($: T.Dictionary<TIn>, $c: {
                'map': ($: T.KeyValuePair<TIn>, $l: {
                    'all siblings': pt.Lookup<T.AnySibling<TOut>>
                    'non circular siblings': pt.Lookup<TOut>
                }) => TOut,
            }) => T.Dictionary<TOut>
        }
    }
}