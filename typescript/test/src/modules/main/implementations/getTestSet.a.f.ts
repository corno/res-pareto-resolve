import * as pv from 'pareto-core-dev'
import * as ps from 'pareto-core-state'
import * as pa from 'pareto-core-async'
import * as pt from 'pareto-core-types'
import * as pm from 'pareto-core-map'
import * as pd from 'pareto-core-data'

import * as g_test from "lib-pareto-test"
import * as g_pub from "../../../../../pub"

// import * as pubTypes from "../../../../pub/dist/submodules/public"
// import * as pubPrivate from "../../../../pub/dist/submodules/private"

import { A } from "../api.generated"

export const $$: A.getTestSet = ($) => {

    type SortTest = pt.Dictionary<pt.Dictionary<null>>


    function testSort(name: string, $: SortTest) {
        pv.logDebugMessage(name)
        g_pub.$r.sortTopologically()($, {
            'map': ($) => $
        }).__forEach(($) => {
            pv.logDebugMessage($.key)
        })
    }

    testSort("Reversed order", pd.d({
        "A": pd.d({
            "B": null
        }),
        "B": pd.d({}),
    }))


    type ResolveTest = pt.Dictionary<pt.Array<string>>


    function testResolve(name: string, $: ResolveTest) {
        pv.logDebugMessage(name)
        g_pub.$r.safeResolveDictionary({
            'onError': ($) => {
                pv.logDebugMessage($)
            },
        })($, {
            'map': ($, $l) => {
                $.__forEach(($) => {
                    const y = $l['non circular siblings'].__unsafeGetEntry($)
                })
            }
        })
    }


    testResolve("non existing entry", pd.d({
        "A": pd.a(["C"]),
        "B": pd.a([]),
    }))
    testResolve("valid", pd.d({
        "A": pd.a(["B"]),
        "B": pd.a([]),
    }))
    testResolve("circular reference", pd.d({
        "A": pd.a(["B"]),
        "B": pd.a(["A"]),
    }))
    testResolve("self reference", pd.d({
        "A": pd.a(["A"]),
    }))


    // pub.$a.createTestProgram(null, {
    //     getTestSet: () => {
    //         pl.panic("@@@")
    //     },
    //     log: () => {

    //     },
    //     logError: () => {

    //     },
    //     onTestErrors: () => {

    //     },
    // })

    // pub.$b.createTestProgram(
    //     {
    //         getTestSet: ($) => {
    //             return pa.asyncValue({
    //                 elements: pr.wrapRawDictionary({})
    //             })
    //         },
    //         log: ($) => {
    //             pl.logDebugMessage($)
    //         }
    //     }
    // )(
    //     pr.wrapRawArray(["foo"])
    // )

    const builder = ps.createUnsafeDictionaryBuilder<g_test.T.TestElement>()
    function createTest(name: string, actual: string, expected: string) {
        builder.add(name, {
            type: ['test', {
                type: ['short string', {
                    actual: actual,
                    expected: expected
                }]
            }]
        })
    }

    //test that a failing test indeed fails!!! now it will make the program exit with an error code
    pv.logDebugMessage("FIXME: TEST THE LIB")
    createTest(
        "TODO: ACTUALLY TEST THE LIB",
        "TODO: ACTUALLY TEST THE LIB",
        "TODO: ACTUALLY TEST THE LIB",
    )

    return pa.asyncValue(null).map(() => pa.asyncValue({
        elements: builder.getDictionary()
    }))
}