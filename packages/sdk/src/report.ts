import 'url-search-params-polyfill'

export const EVENT_TYPE = {
  pv: 1,
  click: 2,
  duration: 3,
  exposure: 4,
  logic: 5
}

export function initTrackLog({getCommonLogParams, reportGetApi, reportPostApi}) {
  // 像素打点
  function sendPxPoint(params) {
    const img = new Image()

    img.style.display = 'none'

    const removeImage = function () {
      if (img.parentNode) {
        img.parentNode.removeChild(img)
      }
    }

    img.onload = removeImage
    img.onerror = removeImage

    const data = new URLSearchParams(params)
    img.src = `${reportGetApi}?${data}`

    document.body.appendChild(img)
  }

  function sendBeacon(params) {
    const data = new URLSearchParams(params)
    const headers = {
      type: 'application/x-www-form-urlencoded'
    }
    // @ts-ignore
    const blob = new Blob([data], headers)
    // fix 排查参数为空的情况
    if (!blob.size) {
      sendPxPoint(params)
    } else {
      navigator.sendBeacon(reportPostApi, blob)
    }
  }

  function sendLog(params) {
    try {
      if (typeof navigator.sendBeacon === 'function') {
        sendBeacon(params)
      } else {
        sendPxPoint(params)
      }
    } catch (e) {
      console.log(e)
    }
  }


  return function trackLog(page, eventType, eventValue, extend = {}, extra = {}) {
    const commonParams = getCommonLogParams()
    if (!commonParams) return

    extra = {
      ...commonParams.extra,
      ...extra
    }

    const data = {
      ...commonParams,
      page,
      eventType,
      eventValue,
      ...extend,
      extra: Object.keys(extra).length > 0 ? JSON.stringify(extra) : '' // 空的extra不上报
    }

    sendLog(data)
  }
}
