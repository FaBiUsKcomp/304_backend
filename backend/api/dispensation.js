const Product = require('../model/ProductModel')
const MissingProduct = require('../model/MissingProductModel')
const { validField } = require('./validation')

module.exports = (app, http) => {

    const createProduct = async (req, res) => {
        const product = { ...req.body }
        try {
            validField(product.name, 'Nome não informado!')
        }
        catch(e) {
            return res.status(400).send({ error: e })
        }
        
        const isMatch = await Product.findOne({ name: product.name })
        if(isMatch) return res.status(400).send({ error: 'Produto já cadastrado!' })

        const newProduct = new Product(product)
        return res.status(201).send(newProduct.save())
    }

    const readProducts = async (req, res) => {
        await Product.find({})
            .then(products => res.status(200).send(products))
            .catch(error => res.status(500).send(error))
    }

    const createMissingProduct = async (req, res) => {
        const productMissing = { ...req.body }
        const product = await Product.findOne({ name: productMissing.name })
        if(!product) return res.status(400).send({ error: 'Produto não cadastrado!' })
        const newMissingProduct = new MissingProduct(productMissing)
        return res.status(201).send(newMissingProduct.save()) 
    }

    const readMissingProducts = async (req, res) => {
        await MissingProduct.find({})
            .then(products => res.status(200).send(products))
            .catch(error => res.status(500).send(error))
    }

    return { createProduct, readProducts, createMissingProduct, readMissingProducts }
}