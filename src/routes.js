
import { TransactionPage } from './pages/transaction-app/TransactionPage.jsx';
import { TransactionDetails } from './pages/transaction-app/TransactionDetails.jsx'

import { CustomerDetails } from './pages/customer-app/CustomerDetails.jsx'
import { CustomerPage } from './pages/customer-app/CustomerPage.jsx'

const routes = [
  {
    path: '/transaction/:id',
    component: <TransactionDetails/>,
  },
  {
    path: '/transaction',
    component: <TransactionPage/>,
  },
  {
    path: '/customer/:id',
    component: <CustomerDetails/>,
  },
  {
    path: '/customer',
    component: <CustomerPage/>,
  },
  {
    path: '/',
    component: <TransactionPage/>,
  },

];

export default routes;
