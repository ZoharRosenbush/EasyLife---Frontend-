import { useState, useEffect } from 'react'

import { formService } from '../services/form.service.js'
import { useFormRegister } from '../hooks/useFormRegister.js'
import { eventBusService } from '../services/eventBusService.js'

import { CountryDataList } from './customer-app/CountryDataList.jsx'
import { CustomerSelect } from './transaction-app/CustomerSelect.jsx'
import { DateCmp } from './transaction-app/DateCmp.jsx'
import { BtnBar } from './BtnBar.jsx'



export const AddEdit = ({ onToggleEdit, onToggleAdding, transaction, saveTransaction, customer, saveCustomer }) => {

    const formInitialState = formService.getInitialState(saveTransaction, saveCustomer, transaction, customer)

    const [register, fields] = useFormRegister({ ...formInitialState })
    const [selectedCustomer, setCustomer] = useState(formInitialState.customer_details)
    const [selectedDate, setDate] = useState(formInitialState.date)

    const onSaveEntity = (ev) => {
        ev.preventDefault()
        if (saveTransaction) {
            if (!selectedCustomer._id) return eventBusService.emit('user-msg', { txt: 'All fields are required', type: 'danger' })
            const transaction = { ...fields, customer_details: selectedCustomer, date: selectedDate }
            saveTransaction(transaction)
        } else if (saveCustomer) {
            const customer = { ...fields }
            saveCustomer(customer)
        }
        if (onToggleEdit) onToggleEdit()
        if (onToggleAdding) onToggleAdding()
    }

   
    const getCustomerForm = () => {
        const formAlign = !customer ? 'align-center' : ''
        return <form onSubmit={onSaveEntity} className={`customer-form flex column ${formAlign}`} >
            {formService.customerFields.map((field) => {
                if (field.dataKey === 'country') {
                    return <label key={field.dataKey}>{field.label}
                        <input list={field.dataKey} {...register(field.dataKey, field.type)} required /></label>
                }
                return <label key={field.dataKey}>
                    {field.label}
                    <input required {...register(field.dataKey, field.type)} />
                </label>
            })}
            <CountryDataList />
            <BtnBar types={['submit', 'button']} texts={['Save', 'Cancel']} cbFuncs={[null, onCancel]} />
        </form>
    }

    const getTransactionForm = () => {
        const formAlign = !transaction ? 'align-center' : ''
        return <form onSubmit={onSaveEntity} className={`transaction-form flex column ${formAlign}`}>
            {formService.transactionFields.map((field) => {
                if (field.dataKey === 'date') {
                    return <label key={field.dataKey}>
                        {field.label}
                        <DateCmp date={formInitialState.date} setDate={setDate}/>
                    </label>
                }
                else if (field.dataKey === 'customer_details') {
                    return <label key={field.dataKey}>
                        Customer
                        <CustomerSelect setCustomer={setCustomer} selectedCustomer={selectedCustomer} />
                    </label>
                } return <label key={field.dataKey}>
                    {field.label}
                    <input required {...register(field.dataKey, field.type)} />
                </label>
            })}
            <BtnBar types={['submit', 'button']} texts={['Save', 'Cancel']} cbFuncs={[null, onCancel]} />
        </form>
    }

    const onCancel = () => {
        if (onToggleAdding) onToggleAdding()
        if (onToggleEdit) onToggleEdit()
    }

    return (
        <section className='add-edit flex column align-center'>
            {saveTransaction && getTransactionForm()}
            {saveCustomer && getCustomerForm()}
        </section>
    )
}


