import { CustomerPreview } from './CustomerPreview.jsx'

export const CustomerList = ({ customers, removeCustomer }) => {

    return (
        <section className='customer-list simple-cards-grid'>
            {customers.map(customer =>
                <CustomerPreview removeCustomer={removeCustomer} customer={customer} key={customer._id} />
            )}
        </section>
    )


}
