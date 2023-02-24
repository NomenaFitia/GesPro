import Vue from 'vue'
import Router from 'vue-router'
import ProduitCrud from '@/components/ProduitCrud'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProduitCrud',
      component: ProduitCrud
    }
  ]
})
