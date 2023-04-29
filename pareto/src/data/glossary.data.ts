import * as pd from 'pareto-core-data'

import {
    string,
    dictionary, member, group,
    array,
    typeReference,
    boolean,
    ref,
    sInterfaceMethod,
    sfunction,
    data,
    procedure,
    sInterfaceReference,
    parametrizedType,
    typeParameter,
    sInterface,
    scallbackfunction,
    type,
    null_,

} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"
import { scallback } from 'lib-pareto-typescript-project/dist/submodules/glossary/shorthands'
import { computed } from 'lib-pareto-typescript-project/dist/submodules/glossary/shorthands'
const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({}),
    'root': {
        'namespaces': d({}),
        'types': d({
            "Dictionary": parametrizedType({ "Type": null }, dictionary(ref(typeParameter("Type")))),
            "Array": parametrizedType({ "Type": null }, array(ref(typeReference("KeyValuePair", { "Type": typeParameter("Type")})))),
            "NullDictionary": type(dictionary(null_())),
            "KeyValuePair": parametrizedType({ "Type": null }, group({
                "key": member(string()),
                "value": member(ref(typeParameter("Type"))),
            })),
            "AnySibling": parametrizedType({ "Type": null }, computed(ref(typeParameter("Type")))),
            "Error": type(string()),
        }),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({}),

    },
    'synchronous': {
        'interfaces': d({
            "OnError": sInterface(sInterfaceMethod(typeReference("Error"))),
        }),
        'algorithms': d({
            "SortTopologically": scallbackfunction(
                typeReference("Array", { "Type": typeParameter("Type") }),
                data(typeReference("Dictionary", { "Type": typeParameter("Type") })),
                {
                    "map": scallback(typeReference("NullDictionary"), typeParameter("Type"))
                },
                { "Type": null }
            ),
            "UnsafeResolveDictionary": scallbackfunction(
                typeReference("Dictionary", { "Type": typeParameter("Out") }),
                data(typeReference("Dictionary", { "Type": typeParameter("In") })),
                {
                    "map": scallback(typeParameter("Out"), typeReference("KeyValuePair", {"Type": typeParameter("In")}), {
                        "non circular siblings": typeParameter("Out"),
                        "all siblings": typeReference("AnySibling", { "Type": typeParameter("Out")}),
                    })
                },
                { "In": null, "Out": null }
            ),
            "SafeResolveDictionary": scallbackfunction(
                typeReference("Dictionary", { "Type": typeParameter("Out") }),
                data(typeReference("Dictionary", { "Type": typeParameter("In") })),
                {
                    "map": scallback(typeParameter("Out"), typeParameter("In"), {
                        "non circular siblings": typeParameter("Out"),
                        "all siblings": typeReference("AnySibling", { "Type": typeParameter("Out")}),
                    })
                },
                { "In": null, "Out": null }
            ),
        }),
    },
}