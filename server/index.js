import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

const proSchema = new mongoose.Schema({
    name: String,
    info:String,
    src:String,
    price:Number
  });
const Product = mongoose.model('product21', proSchema);

app.get('/', async(req, res) => {
 try {
    const data= await Product.find({})
    res.status(200).send({message:'sucsess',data})
 } catch (error) {
    res.status(200).send({message:'NOT sucsess',error})
 }
})
app.post('/', async(req, res) => {
 try {
    const data= new Product(req.body)
    await data.save()
    res.status(200).send({message:'sucsess',data})
 } catch (error) {
    res.status(200).send({message:'NOT sucsess',error})
 }
})
app.get('/:id', async(req, res) => {
 try {
    const {id}=req.params
    const data= await Product.findById(id)
    res.status(200).send({message:'sucsess',data})
 } catch (error) {
    res.status(200).send({message:'NOT sucsess',error})
 }
})
app.delete('/:id', async(req, res) => {
 try {
    const {id}=req.params
    const data= await Product.findByIdAndDelete(id)
    res.status(200).send({message:'sucsess',data})
 } catch (error) {
    res.status(200).send({message:'NOT sucsess',error})
 }
})


mongoose.connect('mongodb+srv://feridd:feridd@cluster0.o4zo8na.mongodb.net/')
.then(()=>console.log('DB connnet'))
.catch(()=>console.log("NOT db connnet"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})