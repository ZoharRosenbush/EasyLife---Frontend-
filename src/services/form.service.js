import { transactionService } from './transaction.service.js';
import { customerService } from './customer.service.js';

export const formService = {
    customerFields: [
        { dataKey: 'fullname', label: 'Full name', type: 'text' },
        { dataKey: 'street', label: 'Street', type: 'text' },
        { dataKey: 'city', label: 'City', type: 'text' },
        { dataKey: 'country', label: 'Country', type: 'text' },
        { dataKey: 'email', label: 'Email', type: 'email' },
        { dataKey: 'gender', label: 'gender', type: 'text' },
        { dataKey: 'phone', label: 'Phone', type: 'number' },
        { dataKey: 'cerdit_card_type', label: 'Credit type', type: 'text' },
        { dataKey: 'cerdit_card_number', label: 'Credit number', type: 'number' },
    ],
    transactionFields: [
        { dataKey: 'date', label: 'Date', type: '' },
        { dataKey: 'customer_details', label: 'Customer', type: 'text' },
        { dataKey: 'product', label: 'Purchased product', type: 'text' },
        { dataKey: 'total_price', label: 'Total price', type: 'number' },
        { dataKey: 'currency', label: 'Currency', type: 'text' },
    ],
    getInitialState: (saveTransaction, saveCustomer, transaction, customer) => {
        let initialState;
        if (saveTransaction) {
            initialState = (!transaction) ? transactionService.getEmptyTransaction() : transaction
        } else if (saveCustomer) {
            initialState = (!customer) ? customerService.getEmptycustomer() : customer
        }
        return initialState
    },
}  