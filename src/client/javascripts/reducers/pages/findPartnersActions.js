import { api } from '../../services'
import { createRequests, doApiCall, createRequestTypes } from '../actionHelper'

export const GET_FIND_PARTNERS_PAGE = createRequestTypes('GET_FIND_PARTNERS_PAGE')
export const getFindPartnersPage = createRequests(GET_FIND_PARTNERS_PAGE)

export const FIND_PARTNERS_PAGE_DATA_SUCCESS = 'FIND_PARTNERS_PAGE_DATA_SUCCESS'
export function findPartnersPageDataSuccess(data) {
  return { type: FIND_PARTNERS_PAGE_DATA_SUCCESS, data }
}

export function getFindPartnersData() {
  return doApiCall({
    api: api.getFindPartnersData,
    action: getFindPartnersPage,
  })
}
