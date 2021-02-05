
import {request} from './request'
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
export function getRecommend(){
    return request({
        url:'/recommend',
    })
}
export class goods{
    constructor(itemInfo,columns,services){
        this.columns = columns
        this.title = itemInfo.title
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.desc = itemInfo.desc
        this.discount = itemInfo.discountDesc
        this.services = services
        this.realPrice = itemInfo.realPrice
        this.cids = itemInfo.cids
        this.realPrice = itemInfo.lowNowPrice
    }
}
export class goodsShop{
    constructor(shopInfo){
        this.cSells = shopInfo.cSells
        this.cGoods = shopInfo.cGoods
        this.score = shopInfo.score
        this.name = shopInfo.name
        this.cFans = shopInfo.cFans
        this.logo = shopInfo.shopLogo
    }
}
export class itemParams{
    constructor(info,rule){
        this.set =  info.set;
        this.size = rule.tables
    }
}