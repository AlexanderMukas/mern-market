import React from 'react'

const ProductEditScreen = ({match}) => {
    const productId = match.params.id;
    return (
        <div>
            ProductEditScreen '{productId}'
        </div>
    )
}

export default ProductEditScreen
