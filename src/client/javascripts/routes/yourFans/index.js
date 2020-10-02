import YourFans from './components/YourFans'
import InterestProfileTab from './components/Tabs/InterestProfile'
import OverviewTab from './components/Tabs/Overview'
import MediaProfileTab from './components/Tabs/MediaProfile'

module.exports = [{
  path: '/your_fans',
  component: YourFans,
  name: 'ROOT',
  indexRoute: { component: OverviewTab },
}, {
  path: '/your_fans/interest_profile',
  component: YourFans,
  name: 'INTEREST_PROFILE',
  indexRoute: { component: InterestProfileTab },
}, {
  path: '/your_fans/media_profile',
  component: YourFans,
  name: 'MEDIA_PROFILE',
  indexRoute: { component: MediaProfileTab },
}]
