import * as pi from 'pareto-core-internals'

import * as g_this from "../glossary"

import { A } from "../api.generated"

export const $$: A.sortTopologically = () => {
    return <T>($: g_this.T.Dictionary<T>, cb: {
        map: ($: T) => g_this.T.NullDictionary;
    }) => {
        const statusDict: {
            [key: string]:
            | ['finished', null]
            | ['processing', null]
        } = {}
        const out: g_this.T.KeyValuePair<T>[] = []
        const source = $
        $.__forEach(() => false, ($, key) => {
            function process(key: string) {
                const $ = source.__unsafeGetEntry(key)
                const status = statusDict[key]
                if (statusDict[key] !== undefined) {
                    switch (status[0]) {
                        case 'finished':
                            pi.ss(status, ($) => {
                                //nothing to do
                            })
                            break
                        case 'processing':
                            pi.ss(status, ($) => {
                                pi.panic("CIRCULAR DEPENDENCY")
                            })
                            break
                        default: pi.au(status[0])
                    }
                } else {
                    statusDict[key] = ['processing', null]
                    const deps = cb.map($)
                    deps.__forEach(() => false, ($, key) => {
                        process(key)
                    })
                    out.push({
                        'key': key,
                        'value': $
                    })
                    statusDict[key] = ['finished', null]
                }
            }
            process(key)
        })
        return pi.wrapRawArray(out)
    }
}