export default [
  {
    path: '/',
    name: 'main-page',
    component: require('components/Main')
  },
  {
    path: '/set-api-key',
    name: 'do-set-api-key',
    component: require('components/SetApiKey')
  },
  {
    path: '/ansible',
    name: 'ansible',
    component: require('components/Ansible')
  },
  {
    path: '*',
    redirect: '/'
  }
]
