import * as pd from 'pareto-core-data'

import { algorithm, dependent, procedure, sSideEffect, sfunction } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "unsafeResolveDictionary": algorithm(sfunction("this", {}, "UnsafeResolveDictionary")),
        "safeResolveDictionary": algorithm(sfunction("this", {}, "SafeResolveDictionary"), {}, dependent(null, {
        }, {
            "onError": sSideEffect("this", {}, "OnError")
        })),
    }),
}