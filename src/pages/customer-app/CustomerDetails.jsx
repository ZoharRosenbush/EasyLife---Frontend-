import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { customerService } from '../../services/customer.service.js'
import { eventBusService } from '../../services/eventBusService.js'

import Spinner624 from '../../assets/svgs/Spinner624.svg'
import CustomerLocation from '../../cmps/customer-app/CustomerLocation.jsx'
import { AddEdit } from '../../cmps/AddEdit.jsx'
import { BtnBar } from '../../cmps/BtnBar.jsx'

export const CustomerDetails = () => {

    const [customer, setCustomer] = useState(null)
    const [isEditMode, setEdit] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        loadCustomer()
    },[])

    const loadCustomer = async () => {
        try {
            const customer = await customerService.getById(id)

            customer.phone = +customer.phone.split('-').join('')
            setCustomer(customer)
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to load customer. Please check you internet connection', type: 'danger' })
        }

    }

    const saveCustomer = async (customerToSave) => {
        try {
            await customerService.save(customerToSave)
            setCustomer(customerToSave)
        } catch (err) {
            eventBusService.emit('user-msg', { txt: 'Failed to save customer. Please check you internet connection', type: 'danger' })
        }
    }

    const onGoBack = () => {
        navigate('/customer')
    }
    const onToggleEdit = () => {
        setEdit(!isEditMode)
    }

    if (!customer) return <img src={Spinner624} alt='Loading...' />
    const { _id, fullname, email, gender, country, city, street, phone, cerdit_card_type, cerdit_card_number } = customer

    const customerAddress = `${street}, ${city}, ${country}`
    return (
        <article className='customer-details'>
            <h1>Customer Details</h1>
            <section className='content-container flex'>
                {!isEditMode &&
                    <section className='details flex column'>
                        <h3>Full name: {fullname}</h3>
                        <h3>Gender: {gender}</h3>
                        <h3> Email: {email}</h3>
                        <h3>Address: {street}, {city}, {country}</h3>
                        <h3>Phone: {phone}</h3>
                        <h3>Credit card details: {cerdit_card_type} || {cerdit_card_number}</h3>
                        <h3>Customer identifier: {_id}</h3>
                        <BtnBar texts={['Back', 'Edit']} cbFuncs={[onGoBack, onToggleEdit]} types={[]} />
                    </section>
                }
                {isEditMode && <AddEdit onToggleEdit={onToggleEdit} customer={customer} saveCustomer={saveCustomer} />}
                <CustomerLocation address={customerAddress} />
            </section>

        </article>

    )




}
