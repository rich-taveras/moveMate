const router= require('express').Router();

//http://localhost:3001/test/
router.get('/',(req, res)=>{
  res.render('test')  
})
//http://localhost:3001/test/page1
router.get('/page1',(req,res)=>{
res.render("page1")
})

module.exports=router