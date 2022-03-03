import { Link } from 'react-router-dom'
import { FcBusinesswoman } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'

export const CustomerPreview = ({ customer, removeCustomer }) => {
    
    const onRemoveCustomer = (ev) => {
        ev.preventDefault()
        removeCustomer(customer._id)
    }

    const { fullname, gender,phone } = customer
    const customerIcon = (gender === 'Female') ? <FcBusinesswoman /> : <FcBusinessman />

    return (
        <Link to={`/customer/${customer._id}`}>
            <article className='customer-preview flex column wrap align-center' >
                <button className='delete-btn' onClick={onRemoveCustomer}>X</button>
                {customerIcon}
                <h3>{fullname}</h3>
                <p>{phone}</p>
            </article>
        </Link>

    )
}

