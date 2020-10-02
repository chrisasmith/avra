import { toast } from 'react-toastify'

export function createRequestTypes(base: string) {
  return ['REQUEST', 'SUCCESS', 'FAILURE', 'SELF'].reduce((acc, type) => {
    acc[type] = type === 'SELF' ? base : `${base}_${type}`
    return acc
  }, {})
}

export function action(type: string, payload: any = {}) {
  return { type, ...payload }
}

export function createRequests(base: any) {
  return {
    request: (o: any) => action(base.REQUEST, o),
    success: (o: any) => action(base.SUCCESS, o),
    failure: (o: any) => action(base.FAILURE, o),
  }
}

export function doApiCall(options: any) {
  const defaults = {
    api: () => { },
    action: {},
    apiParams: {},
    guardFunc: () => true,
    postFunc: (dispatch, getState, response) => response,
  }
  const opts = { ...defaults, ...options }
  opts.action = Array.isArray(options.action) ? options.action : [options.action]

  return (dispatch, getState) => {
    // bail if we don't pass any rules sent in
    if (!opts.guardFunc(getState())) {
      return Promise.resolve()
    }

    const params = { ...opts.apiParams || {} }

    // mark the call as starting
    opts.action.map(act => dispatch(act.request({ request: params })))

    // call the api with the args
    return opts.api(params)
      .then(
        response => opts.postFunc(dispatch, getState, response)
      ).then((response) => {
        opts.action.map(act => dispatch(act.success({ request: params, response })))

        return response
      }, (error) => {
        opts.action.map(act => dispatch(act.failure({ request: params, response: error, error: `${error}` })))
        return Promise.reject(error)
      }).catch((error) => {
        if (error === 401) {
          toast.error('Access Denied')
          // todo : handle bad auth
        }

        throw error
      })
  }
}
