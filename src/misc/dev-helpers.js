import base64js from 'base64-js'

export async function platformTestReqFile() {
  try {
    const fd = new FormData()
    fd.append('observation_photo[observation_id]', 1234)
    const photoBuffer = base64js.toByteArray(
      // thanks https://png-pixel.com/
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhA' +
        'J/wlseKgAAAABJRU5ErkJggg==',
    )
    const theFile = new File([photoBuffer], 'wow-flower', { type: 'image/png' })
    fd.append('file', theFile)
    const ab = await new Request('https://localhost', {
      method: 'POST',
      mode: 'cors',
      body: fd._blob ? fd._blob() : fd,
    }).arrayBuffer()
    return `success, length=${ab.byteLength}`
  } catch (err) {
    return {
      error: {
        message: err.message,
        name: err.name,
        obj: err,
      },
    }
  }
}

export const dontComplainAboutOneExport = true
