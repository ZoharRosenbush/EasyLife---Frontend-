import { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

import { transactionService } from '../../services/transaction.service.js'
import { utilService } from '../../services/util.service.js'
import { eventBusService } from '../../services/eventBusService.js'

import details from '../../assets/svgs/details.svg'
import Spinner624 from '../../assets/svgs/Spinner624.svg'
import { AddEdit } from '../../cmps/AddEdit.jsx'
import { BtnBar } from '../../cmps/BtnBar.jsx'

export const TransactionDetails = () => {

    const [transaction, setTransaction] = useState(null)
    const [isEditMode, setEdit] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        loadTransaction()
    },[])

    const loadTransaction = async () => {
        
        try {
            const transaction = await transactionService.getById(id)
            setTransaction(transaction)
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load transaction. Please check you internet connection', type: 'danger' })
        }

    }

    const saveTransaction = async (transactionToSave) => {

        try {
            await transactionService.save(transactionToSave)
            setTransaction(transactionToSave)
            eventBusService.emit('user-msg', { txt: 'Transaction saved successfully', type: 'succsess' })
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to save transaction. Please check you internet connection', type: 'danger' })
        }

    }

    const onGoBack = () => {
        navigate('/transaction')
    }
    const onToggleEdit = () => {
        setEdit(!isEditMode)
    }

    if (!transaction) return <img src={Spinner624} alt='Loading...' />
    const { total_price, currency, product, customer_details, date } = transaction
    const formattedDate = utilService.getFormattedDate(date)
    return (
        <article className='transaction-details'>
            <h1>Transaction Details</h1>
            <section className="content-container flex">
                {!isEditMode &&
                    <section className='details flex column'>
                        <h3>Date: {formattedDate}</h3>
                        <h3>Purchased product: {product}</h3>
                        <h3>Total price: {total_price} {currency}</h3>
                        <h3>Customer: {customer_details.fullname}</h3>
                        <h3>Customer identifier: {customer_details._id}</h3>
                        <BtnBar texts={['Back', 'Edit']} cbFuncs={[onGoBack, onToggleEdit]} types={[]} />
                    </section>
                }
                {isEditMode && <AddEdit onToggleEdit={onToggleEdit} transaction={transaction} saveTransaction={saveTransaction} />}
                <img className='details-svg' src={details} alt='img' />
            </section>

        </article>

    )




}