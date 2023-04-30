import * as pi from 'pareto-core-internals'
import * as pt from 'pareto-core-types'

import * as g_this from "../glossary"

import { A } from "../api.generated"

class ResolveError extends Error { }

export const $$: A.safeResolveDictionary = ($se) => {
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
        const statusDictionary: {
            [key: string]:
            | ['processing', null]
            | ['failed', null]
            | ['success', TOut]
        } = {}

        function processEntry($: TIn, keyOfEntryBeingProcessed: string) {
            statusDictionary[keyOfEntryBeingProcessed] = ['processing', null]
            const entry = $c.map({
                'key': keyOfEntryBeingProcessed,
                'value': $,
            }, {
                'all siblings': {
                    __unsafeGetEntry(key) {
                        return () => {
                            return pi.panic("IMPLEMENT RESOLVE CIRCULAR LOOKUP")
                        }
                    },
                    __getEntry(key, exists, nonExists) {
                        return pi.panic("IMPLEMENT RESOLVE CIRCULAR LOOKUP")
                    },

                },
                'non circular siblings': {
                    __unsafeGetEntry(key) {
                        const status = statusDictionary[key]
                        if (status === undefined) {
                            return source.__getEntry(
                                key,
                                ($) => processEntry($, key),
                                () => {
                                    $se.onError(`no such entry'${key}'`)
                                    throw new ResolveError("")
                                }
                            )
                        } else {
                            return pi.cc(status, (s) => {
                                switch (s[0]) {
                                    case 'failed':
                                        return pi.ss(s, (s) => {
                                            //nothing to report
                                            throw new ResolveError("")
                                        })
                                    case 'processing':
                                        if (key === keyOfEntryBeingProcessed) {
                                            $se.onError(`'${key}' is referencing itself`)
                                        } else {
                                            $se.onError(`entries '${key}' and '${keyOfEntryBeingProcessed}' are referencing each other`)
                                        }
                                        statusDictionary[keyOfEntryBeingProcessed] = ['failed', null]
                                        throw new ResolveError("")
                                    case 'success':
                                        return s[1]
                                    default: return pi.au(s[0])
                                }
                            })
                        }
                    },
                    __getEntry(key, exists, nonExists) {
                        return pi.panic("IMPLEMENT RESOLVE NON CIRCULAR  LOOKUP")
                    },
                },
            })
            finished[keyOfEntryBeingProcessed] = entry
            statusDictionary[keyOfEntryBeingProcessed] = ['success', entry]
            return entry
        }

        $.__forEach(() => false, ($, key) => {
            try {
                if (statusDictionary[key] === undefined) {
                    processEntry($, key)
                }
            } catch (e) {
                //error should have been reported
            }
        })
        return pi.wrapRawDictionary(finished)
    }
}