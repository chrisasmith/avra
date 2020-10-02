import { api } from '../../services'
import { createRequests, doApiCall, createRequestTypes } from '../actionHelper'

// test data
export const DEFAULT_FILTER = {
  property: { name: 'Premier League', id: 32, isGroup: false, type: 'league', sport: 'Football / Soccer' },
  benchmark: { name: 'All Sports Fans', id: 0, isGroup: false },
  country: { name: 'All Countries', id: 1, isGroup: true },
  ages: {
    men: [0, 1, 2],
    women: [0, 1, 2],
  },
  income: [0, 1, 2],
  kids: [0, 1],
  interest: [0, 1, 2, 3, 4, 5],
}

export const DEFAULT_OPTIONS = {
  filter: [{ id: 0, name: 'hey there' }],
  benchmark: [
    { name: 'All Sports Fans', id: 0, isGroup: false },
  ],
  country: [
    { name: 'All Countries', id: 1, isGroup: true },
    { name: 'Finland', id: 3, isGroup: false },
    { name: 'Canada', id: 4, isGroup: false },
    {
      name: 'United States',
      id: 5,
      isGroup: false,
      children: [
        { name: 'All USA', id: 4, isGroup: true },
        { name: 'Atlanta', id: 5, isGroup: false },
        { name: 'Chicago', id: 6, isGroup: false },
        { name: 'Seattle', id: 7, isGroup: false },
      ],
    },
  ],
  property: [
    { name: 'American Football', id: 31, isGroup: false, type: 'sport' },
    { name: 'Athletics / Track and Field', id: 1, isGroup: false, type: 'sport' },
    { name: 'Badminton', id: 2, isGroup: false, type: 'sport' },
    { name: 'Baseball', id: 4, isGroup: false, type: 'sport' },
    {
      name: 'Basketball',
      id: 3,
      isGroup: false,
      children: [
        { name: 'All Basketball', id: 3, isGroup: true, type: 'sport', sport: 'Basketball' },
        { name: 'IBL', id: 4, isGroup: false, type: 'league', sport: 'Basketball' },
        {
          name: 'NBA',
          id: 5,
          isGroup: false,
          children: [
            { name: 'All NBA', id: 5, isGroup: true, type: 'league', sport: 'Basketball' },
            { name: 'Atlanta Hawks', id: 6, isGroup: false, type: 'team', sport: 'Basketball' },
            { name: 'Boston Celtics', id: 7, isGroup: false, type: 'team', sport: 'Basketball' },
            { name: 'Brooklyn Nets', id: 8, isGroup: false, type: 'team', sport: 'Basketball' },
          ],
        },
      ],
    },
    { name: 'Boxing', id: 5, isGroup: false, type: 'sport' },
    { name: 'Cricket', id: 6, isGroup: false, type: 'sport' },
    { name: 'Cycling', id: 7, isGroup: false, type: 'sport' },
    { name: 'Darts', id: 8, isGroup: false, type: 'sport' },
    { name: 'Endurance Running', id: 9, isGroup: false, type: 'sport' },
    { name: 'Extreme Sports / Action sports', id: 10, isGroup: false, type: 'sport' },
    { name: 'Fencing', id: 11, isGroup: false, type: 'sport' },
    { name: 'Field Hockey', id: 12, isGroup: false, type: 'sport' },
    {
      name: 'Football / Soccer',
      id: 13,
      isGroup: false,
      type: 'sport',
      children: [
        { name: 'All Football / Soccer', id: 3, isGroup: true, type: 'sport', sport: 'Football / Soccer' },
        { name: 'Premier League', id: 32, isGroup: false, type: 'league', sport: 'Football / Soccer' },
      ],
    },
    { name: 'Golf', id: 14, isGroup: false, type: 'sport' },
    { name: 'Handball', id: 15, isGroup: false, type: 'sport' },
    { name: 'Ice Hockey', id: 16, isGroup: false, type: 'sport' },
    { name: 'Mixed Martial Arts (MMA)', id: 17, isGroup: false, type: 'sport' },
    { name: 'Motorsport', id: 18, isGroup: false, type: 'sport' },
    { name: 'Netball', id: 19, isGroup: false, type: 'sport' },
    { name: 'Rugby League', id: 20, isGroup: false, type: 'sport' },
    { name: 'Rugby Union / Rugby', id: 21, isGroup: false, type: 'sport' },
    { name: 'Sailing', id: 22, isGroup: false, type: 'sport' },
    { name: 'Snooker', id: 23, isGroup: false, type: 'sport' },
    { name: 'Surfing', id: 24, isGroup: false, type: 'sport' },
    { name: 'Swimming', id: 25, isGroup: false, type: 'sport' },
    { name: 'Tennis', id: 27, isGroup: false, type: 'sport' },
    { name: 'Triathlon', id: 28, isGroup: false, type: 'sport' },
    { name: 'Volleyball', id: 29, isGroup: false, type: 'sport' },
    { name: 'Winter Sports', id: 30, isGroup: false, type: 'sport' },
  ],
}

export const UPDATE_FILTER = 'UPDATE_FILTER'
export function updateFilter(filter) {
  return { type: UPDATE_FILTER, filter }
}

export const SAVE_FILTER = createRequestTypes('SAVE_FILTER')
export const saveFilterAction = createRequests(SAVE_FILTER)

export function saveFilter(filterName, filter) {
  return doApiCall({
    api: api.saveFilter,
    apiParams: { filterName, filter },
    action: saveFilterAction,
  })
}
