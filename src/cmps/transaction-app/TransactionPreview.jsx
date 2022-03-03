import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service.js'

export const TransactionsPreview = ({ transaction, removeTransaction }) => {

    const onRemoveTransaction = (ev) => {
        ev.preventDefault()
        removeTransaction(transaction._id)
    }

    const { total_price, currency, customer_details, date } = transaction
    const formattedDate = utilService.getFormattedDate(date)

    return (
        <Link to={`/transaction/${transaction._id}`}>
            <article className='transaction-preview flex align-center' >
                <div className='first-column align-center flex'>
                    <div className='small-circle'></div>
                    <button className='delete-btn' onClick={onRemoveTransaction}>X</button>
                </div>
                <div className='second-column'>
                    <p className='date'>{formattedDate}</p>
                </div>
                <div className='third-column'>
                    <p>{customer_details.fullname}</p>
                </div>
                <div className='fourth-column'>
                    <p>{total_price} {currency}</p>
                </div>
            </article>
        </Link>

    )
}
