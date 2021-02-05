export default {
 addCart(context,payload){
    return new Promise((resolve,reject) =>{
        console.log(payload);
        let oldInfo = context.state.cartList.find(item => item.iid === payload.iid)
        if(oldInfo){
           
            context.commit('addCounter',oldInfo)
            resolve("数量加一")
   
        }else{
            payload.count = 1
            payload.checked =true
            context.commit('addToCart',payload)
            resolve("添加新的")
        }
    
     })  
    }
}


