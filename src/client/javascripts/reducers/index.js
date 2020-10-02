import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import yourFans from './pages/yourFansReducer'
import findPartners from './pages/findPartnersReducer'
import filters from './filters/filterReducer'
import { loadingReducer, errorReducer } from './loadingReducer'

const pages = combineReducers({
  yourFans,
  findPartners,
})

export default combineReducers({
  pages,
  filters,
  loading: loadingReducer,
  error: errorReducer,
  routing: routerReducer,
})
