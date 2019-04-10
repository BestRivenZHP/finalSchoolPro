import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NewContact from '@/components/NewContact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/bb',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/newcontact',
      name: 'NewContact',
      component: NewContact
    }
  ]
})
