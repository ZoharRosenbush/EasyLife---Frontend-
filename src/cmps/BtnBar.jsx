
export const BtnBar = ({ texts, cbFuncs, types }) => {
    const getType = (idx) => {
        return types ? types[idx] : ''
    }
    return (
        <section className='actions flex'>
            {texts.map((text, idx) => {
                if (!cbFuncs[idx]) return <button type={getType(idx)} key={idx} className='primary-btn' >{text}</button>
                return <button type={getType(idx)} key={idx} className='primary-btn' onClick={cbFuncs[idx]} >{text}</button>
            })}
        </section>
    )
}