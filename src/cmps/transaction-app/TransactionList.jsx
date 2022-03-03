
import { TransactionsPreview } from './TransactionPreview.jsx'

export const TransactionList = ({transactions,removeTransaction}) => {

    return (
        <section className="transaction-list">
            {transactions.map(transaction =>
                <TransactionsPreview removeTransaction={removeTransaction} transaction={transaction} key={transaction._id} />
            )}
        </section>
    )
    

}