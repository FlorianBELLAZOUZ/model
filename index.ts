import {
  init,
  styleModule,
  eventListenersModule,
  h,
  VNode,
} from "snabbdom"

const patch = init([styleModule, eventListenersModule])

const defaultUpdate = (action, state) => state
const defaultView = (state) => state
const defaultEffect = (action, state) => {}

let state: any = {}
let oldVnode: VNode | undefined
export const model =
  (
    update = defaultUpdate,
    view = defaultView,
    effect = defaultEffect
  ) =>
  (action) => {
    state = update(action, state)
    effect(action, state)
    let newVnode = view(state)
    if (!oldVnode) {
      oldVnode = patch(document.body, newVnode)
    } else {
      oldVnode = patch(oldVnode, newVnode)
    }
  }

type Html = VNode | string

export { h }
export type { Html }
