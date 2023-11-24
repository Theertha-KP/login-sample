var express = require('express');
var router = express.Router();
var data=require('../data.json')

/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.status){
    res.set('Cache-Control', 'no-store')
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect("/login")
  }
  
  
});
router.get('/login', function(req,res){
  if(req.session.status){
    res.redirect('/')
  }
 
  var err=req.session.error
  console.log(err);
  req.session.error=false;
  res.set('Cache-Control', 'no-store')
  res.render('login',{error:err})


  
});
router.post('/login',function(req,res){
  if(data.name===req.body.name){
    if(data.password===req.body.password){
      req.session.user=data.name
      req.session.status=true
      res.redirect('/')
    }
    else{
      req.session.error=true
      res.redirect("/login")
    }
  }  else{
    req.session.error=true
    res.redirect("/login")
  }

})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/login')
})
module.exports = router;
