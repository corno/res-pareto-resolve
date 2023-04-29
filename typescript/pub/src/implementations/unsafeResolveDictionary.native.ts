import * as pi from 'pareto-core-internals'
import * as pt from 'pareto-core-types'

import * as g_this from "../glossary"

import { A } from "../api.generated"

export const $$: A.unsafeResolveDictionary = () => {
    return <TIn, TOut>(
        $: g_this.T.Dictionary<TIn>,
        $c: {
            'map': ($: g_this.T.KeyValuePair<TIn>, $l: {
                'all siblings': pt.Lookup<g_this.T.AnySibling<TOut>>
                'non circular siblings': pt.Lookup<TOut>
            }) => TOut,
        }
    ) => {
        const source = $
        const finished: { [key: string]: TOut } = {}
        const processing: { [key: string]: null } = {}

        function processEntry($: TIn, keyOfEntryBeingProcessed: string) {
            processing[keyOfEntryBeingProcessed] = null
            const entry = $c.map({
                'key': keyOfEntryBeingProcessed,
                'value': $,
            }, {
                'all siblings': {
                    __unsafeGetEntry(key) {
                        return () => {
                            return pi.panic("IMPLEMENT RESOLVE CIRCULAR  LOOKUP")
                        }
                    },
                    __getEntry(key, exists, nonExists) {
                        return pi.panic("IMPLEMENT RESOLVE CIRCULAR  LOOKUP")
                    },

                },
                'non circular siblings': {
                    __unsafeGetEntry(key) {
                        const entry = finished[key]
                        if (entry !== undefined) {
                            return entry
                        }
                        if (processing[key] !== undefined) {
                            if (key === keyOfEntryBeingProcessed) {
                                pi.panic(`'${key}' is referencing itself`)
                            } else {
                                pi.panic(`entries '${key}' and '${keyOfEntryBeingProcessed}' are referencing each other`)
                            }
                        }
                        return source.__getEntry(
                            key,
                            ($) => processEntry($, key),
                            () => pi.panic(`no such entry: '${key}'`)
                        )
                    },
                    __getEntry(key, exists, nonExists) {
                        const entry = finished[key]
                        return (entry === undefined)
                            ? nonExists()
                            : exists(entry)
                    },
                },
            })
            processing[keyOfEntryBeingProcessed] === undefined
            finished[keyOfEntryBeingProcessed] = entry
            return entry
        }

        $.__forEach(() => false, ($, key) => {
            const currentKey = key
            processEntry($, key)
        })
        return pi.wrapRawDictionary(finished)
    }
}