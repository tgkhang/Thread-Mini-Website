'use strict'

const controller= {};
const models= require('../database/models')

controller.show= async  (req,res)=>{
    // const blogs= await models.Thread.findAll({
    //     attributes: ['id','text','imagePath','userId','createdAt'],
    //     order:[['createdAt','DESC']],
    //     limit:10,
    // });
    // res.locals.blogs=blogs;


    // let brands=await models.Brand.findAll({
    //     include: [{
    //         model: models.Product
    //     }]
    // })
    // res.locals.brands=brands;
    
    
    // let options= {
    //     attributes: ['id','name','imagePath','stars','price','oldPrice'],
    //     where: { }
    // };
    // if(category>0){
    //     options.where.categoryId= category;
    // }
    // if(brand>0){
    //     options.where.brandId= brand;
    // }
    // if(tag>0){
    //     options.include=[{
    //         model: models.Tag,
    //         where: {id:tag}
    //     }]
    // }


    // let products= await models.Product.findAll(options);
    // res.locals.products= products;
    res.render('login')
}

controller.showPage =(req,res, next)=>{
    const pages = ['changePassword','emailVerify','forgotPassword','signup','inputCode','successPage'];
    //
    if(pages.includes(req.params.page))
    return res.render(req.params.page);
    next();
}
module.exports=controller;