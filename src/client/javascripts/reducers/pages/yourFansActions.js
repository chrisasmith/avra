import { api } from '../../services'
import { createRequests, doApiCall, createRequestTypes } from '../actionHelper'

export const GET_HOME_PAGE = createRequestTypes('GET_HOME_PAGE')
export const getHomePage = createRequests(GET_HOME_PAGE)

export const HOME_PAGE_DATA_SUCCESS = 'HOME_PAGE_DATA_SUCCESS'
export function homePageDataSuccess(data) {
  return { type: HOME_PAGE_DATA_SUCCESS, data }
}

export function getHomeData() {
  return doApiCall({
    api: api.getHomeData,
    action: getHomePage,
  })
}
