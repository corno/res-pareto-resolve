import { API } from "./api.generated"
import { $$ as isafeResolveDictionary } from "./implementations/safeResolveDictionary.native"
import { $$ as isortTopologically } from "./implementations/sortTopologically.native"
import { $$ as iunsafeResolveDictionary } from "./implementations/unsafeResolveDictionary.native"

export const $api: API = {
    'safeResolveDictionary': isafeResolveDictionary,
    'sortTopologically': isortTopologically,
    'unsafeResolveDictionary': iunsafeResolveDictionary,
}