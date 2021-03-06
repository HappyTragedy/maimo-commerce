import React from 'react'
import { Container } from './Styled'
import { Grid, Col } from '../Grid/index'

const SingleProduct = ({ prodId, product, addToCart }) => {

    return (
        <Container>
            <Grid>
                <Col desktop={6} tablet={6} mobile={12}>
                    <img src={product.image} alt={product.name} />
                </Col>
                <Col desktop={6} tablet={6} mobile={12}>
                    <div>
                        <h1>{product.name} {prodId}</h1>
                        <p>{product.description}</p>
                        <button onClick={() => addToCart({ ...product, quantity: 1 })}>Add to cart</button>
                    </div>
                </Col>
            </Grid>
        </Container>
    )
}

export default SingleProduct
