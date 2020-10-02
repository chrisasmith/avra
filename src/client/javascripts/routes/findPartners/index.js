import FindPartners from './components/FindPartners'
import OverviewTab from './components/Tabs/Overview'
import IndustriesTab from './components/Tabs/Industries'
import BrandTab from './components/Tabs/Brands'
import TrendsTab from './components/Tabs/Trends'

module.exports = [{
  path: '/find_partners',
  component: FindPartners,
  name: 'ROOT',
  indexRoute: { component: OverviewTab },
}, {
  path: '/find_partners/industries',
  component: FindPartners,
  name: 'INDUSTRIES',
  indexRoute: { component: IndustriesTab },
}, {
  path: '/find_partners/industries/:industry_id',
  component: FindPartners,
  indexRoute: { component: IndustriesTab },
}, {
  path: '/find_partners/industries/:industry_id/:subsection_id',
  component: FindPartners,
  name: 'INDUSTRY_SUBSECTION',
  indexRoute: { component: IndustriesTab },
}, {
  path: '/find_partners/brand',
  component: FindPartners,
  name: 'BRANDS',
  indexRoute: { component: BrandTab },
}, {
  path: '/find_partners/trends',
  component: FindPartners,
  name: 'TRENDS',
  indexRoute: { component: TrendsTab },
}]
