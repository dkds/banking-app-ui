import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'customers-list' } ,
    },
    {
      path: '/customers',
      name: 'customers-list',
      component: () => import('../views/CustomersListView.vue')
    },
    {
      path: '/customers/add',
      name: 'customer-add',
      component: () => import('../views/CustomersEntryView.vue')
    },
    {
      path: '/customers/edit/:id',
      name: 'customer-edit',
      component: () => import('../views/CustomersEntryView.vue'),
    },
    {
      path: '/customers/:customerId/accounts',
      name: 'customer-accounts-list',
      component: () => import('../views/AccountsListView.vue')
    },
    {
      path: '/customers/:customerId/accounts/add',
      name: 'customer-account-add',
      component: () => import('../views/AccountsEntryView.vue')
    },
    {
      path: '/customers/:customerId/accounts/edit/:id',
      name: 'customer-account-edit',
      component: () => import('../views/AccountsEntryView.vue')
    },
    {
      path: '/accounts',
      name: 'accounts-list',
      component: () => import('../views/AccountsListView.vue')
    },
    {
      path: '/accounts/add/:customerId?',
      name: 'account-add',
      component: () => import('../views/AccountsEntryView.vue')
    },
    {
      path: '/accounts/edit/:id',
      name: 'account-edit',
      component: () => import('../views/AccountsEntryView.vue'),
    },
    {
      path: '/accounts/:accountNumber/transactions',
      name: 'account-transactions-list',
      component: () => import('../views/TransactionsListView.vue')
    },
    {
      path: '/transactions',
      name: 'transactions-list',
      component: () => import('../views/TransactionsListView.vue')
    },
    {
      path: '/transactions/add/:accountNumber?',
      name: 'transaction-add',
      component: () => import('../views/TransactionsEntryView.vue')
    }
  ]
})

export default router
