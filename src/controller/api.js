const Base = require('./base.js');
module.exports = class extends Base {
    async registerAction(){
      let get = this.get()
      const user = this.model('user')
      let num = await user.where({name:get.name}).count()
      console.log(this.body)
      if(num){
        this.body = {
          success: false,
          message: '该用户已存在'
        }
      }else{
        await user.add({name:get.name,password:get.password})
        this.body = {
          success:true,
          message:'注册成功'
        }
      }
    }
    async loginAction() {
        let post = this.ctx.post()
        const user = this.model('user')
        let res = (await user.where({name:post.name}).field('id,password').select())[0]
        if(res.id){//用户存在
          if(post.password==res.password){//用户密码正确
            this.body = {
              success:true,
              message:'登陆成功'
            }
          }else{
            this.body={
              success:false,
              message:'密码错误'
            }
          }
        }else{
          this.body={
            success:false,
            message:'用户不存在'
          }
        }
    }
  };