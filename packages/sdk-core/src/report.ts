import 'url-search-params-polyfill'

export enum EVENT_TYPE {
  pv = 1,
  click = 2,
  duration = 3,
  exposure = 4,
  logic = 5,
}

export type EventValue = string | number

// 像素打点
export function sendPxPoint(url: string, params: any) {
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
  img.src = `${url}?${data}`

  document.body.appendChild(img)
}

// 信标埋点
export function sendBeacon(url: string, params: any, customHeaders = {}) {
  const data = new URLSearchParams(params)
  const headers = {
    type: 'application/x-www-form-urlencoded',
    ...customHeaders,
  }
  // @ts-ignore
  const blob = new Blob([data], headers)
  navigator.sendBeacon(url, blob)
}

export function initTrackLog({ sendLog }: { sendLog: Function }) {
  return function trackLog(
    page: string,
    eventType: EVENT_TYPE,
    eventValue: EventValue,
    extend = {},
    extra = {},
  ) {
    const data = {
      page,
      eventType,
      eventValue,
      ...extend,
      extra,
    }

    sendLog(data)
  }
}
