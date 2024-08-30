const express = require('express')
const path = require('path')
const multer  = require('multer')
const {mergePdfs}  = require('./merge')
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"template/index.html"))
})
app.post('/merge', upload.array('pdfs', 4), async (req, res, next) => {
    console.log(req.files)

    let d = await mergePdfs(path.join(__dirname,req.files[0].path), path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    // res.send({data: req.files})
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})