const Product = require('../model/ProductModel')
const MissingProduct = require('../model/MissingProductModel')
const { validField } = require('./validation')

module.exports = (app, http) => {

    //BUG
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
        newProduct.save()
        return res.status(201).send(newProduct)
    }

    const readProducts = async (req, res) => {
        await Product.find({})
            .then(products => res.status(200).send(products))
            .catch(error => res.status(500).send(error))
    }

    const deleteProduct = async (req, res) => {
        const productid = req.params.id
        await Product.findOneAndDelete({ _id: productid })
            .then(product => {
                MissingProduct.findOneAndDelete({ _id: productid })
                    .then(res.status(200).send(product))
                    .catch(error => res.status(500).send(error))
            })
            .catch(error => res.status(500).send(error))
    }

    //BUG
    const createMissingProduct = async (req, res) => {
        const productMissing = { ...req.body }
        const product = await Product.findOne({ name: productMissing.name })
        if(!product) return res.status(400).send({ error: 'Produto não cadastrado!' })
        const newMissingProduct = new MissingProduct(productMissing)
        newMissingProduct.save()
        return res.status(201).send(newMissingProduct) 
    }

    const readMissingProducts = async (req, res) => {
        await MissingProduct.find({})
            .then(products => res.status(200).send(products))
            .catch(error => res.status(500).send(error))
    }

    const deleteMissingProduct = async (req, res) => {
        const missingProductid = req.params.id
        await MissingProduct.findOneAndDelete({ _id: missingProductid })
            .then(product => res.status(200).send(product))
            .catch(error => res.status(500).send(error))
    }

    return { 
        createProduct, //BUG
        readProducts, 
        deleteProduct, 
        createMissingProduct, //BUG
        readMissingProducts, 
        deleteMissingProduct
    }
}