export const pricetoDecimal = (num) => {
    return <p className='inline-block'><span>&#163;</span>{parseFloat(num).toFixed(2)}</p>
}