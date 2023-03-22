import {h} from 'vue'
import {useTrackTask} from "./index";

export function withLog(Comp: any) {
  return Comp
  // return {
  //   setup() {
  //     useTrackTask()
  //     return () => {
  //       return h(Comp)
  //     }
  //   }
  // }
}
