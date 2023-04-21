import * as pt from 'pareto-core-types'


export namespace N {}

export namespace T {
    
    export namespace AnySibling {
        
        export type C<TType> = TType
    }
    
    export type AnySibling<TType> = () => TType
    
    export namespace Array {
        
        export type A<TType> = T.KeyValuePair<TType>
    }
    
    export type Array<TType> = pt.Array<T.KeyValuePair<TType>>
    
    export namespace Dictionary {
        
        export type D<TType> = TType
    }
    
    export type Dictionary<TType> = pt.Dictionary<TType>
    
    export type Error = string
    
    export namespace KeyValuePair {
        
        export type key<TType> = string
        
        export type value<TType> = TType
    }
    
    export type KeyValuePair<TType> = {
        readonly 'key': string
        readonly 'value': TType
    }
    
    export namespace NullDictionary {
        
        export type D = null
    }
    
    export type NullDictionary = pt.Dictionary<null>
}