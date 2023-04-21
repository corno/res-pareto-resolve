import * as pt from 'pareto-core-types'

import * as g_this from "./glossary"

export namespace D {
    
    
    
}

export namespace A {
    
    export type safeResolveDictionary = ($se: {
        readonly 'onError': g_this.SYNC.I.OnError
    }) => g_this.SYNC.A.F.SafeResolveDictionary
    
    export type sortTopologically = () => g_this.SYNC.A.F.SortTopologically
    
    export type unsafeResolveDictionary = () => g_this.SYNC.A.F.UnsafeResolveDictionary
}

export type API = {
    readonly 'safeResolveDictionary': A.safeResolveDictionary
    readonly 'sortTopologically': A.sortTopologically
    readonly 'unsafeResolveDictionary': A.unsafeResolveDictionary
}