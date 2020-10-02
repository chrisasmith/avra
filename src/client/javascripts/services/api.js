import 'whatwg-fetch'

export async function getHomeData() {
  return (await fetch('https://fake/getHomeData.json')).json()
}

export async function getFindPartnersData() {
  return (await fetch('https://fake/findPartners.json')).json()
}

export async function getOtherata() {
  return (await fetch('https://fake/other.json')).json()
}

export async function saveFilter(params) {
  const { filterName, filter } = params
  return (await fetch('https://fake/saveFilter.json', {
    method: 'POST',
    body: JSON.stringify({ filterName, filter }),
  })).json()
}
