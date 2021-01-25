class ResponseServerError extends Error {
  constructor (message, type, code) {
    super(message)
    this.type = type
    this.code = code
    this.message = message
    this.name = 'ResponseServerError'
  }
}

export default function ({ $axios, error, redirect, app }) {
  $axios.onError((e) => {
    let message = null
    let code = null
    try {
      code = parseInt(e.response && e.response.status)
      message = e.response && e.response.data
        ? e.response.data.errors.message
        : e.response.message
    } catch (err) {
      error({ statusCode: 500, message: 'Внутренняя ошибка сервера' })
    }
    if (code >= 500) {
      error({ statusCode: code, message })
    } else {
      throw new ResponseServerError(message, 'warning', code)
    }
  })
}
