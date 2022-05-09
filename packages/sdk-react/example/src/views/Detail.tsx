import {useParams} from 'react-router-dom';
import {useMemo} from "react";
import {getCurrentTrackTask, useTrackTask} from "../../../src/index";

export default function Detail() {
  const params = useParams()

  const extend = useMemo(() => {
    return {}
  }, [])

  const extra = useMemo(() => {
    return {
      id: params.id
    }
  }, [params.id])

  useTrackTask(extend, extra)

  const onClick = () => {
    const trackTask = getCurrentTrackTask()
    trackTask.trackClick('btn-some')
  }

  return (<div>
    detail {params.id}

    <button onClick={onClick}>click me</button>
  </div>)
}
