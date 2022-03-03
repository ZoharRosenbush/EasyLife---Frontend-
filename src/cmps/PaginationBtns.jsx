
export const PaginationBtns = ({ pageAmount, currPage, setPage }) => {

    const pages = new Array(pageAmount).fill(null)

    const getClassName = (idx) => {
        const className = currPage === idx ? 'pagination-btn active' : 'pagination-btn'
        return className
    }

    const createBtns = () => {
        return pages.map((page, idx) => {
            const pageNum = idx + 1
            return <button className={getClassName(idx)} key={idx} onClick={() => { setPage(idx) }}>{pageNum}</button>
        })
    }

    return (
        <section className='pagination'>
            {createBtns()}
        </section>
    )
}