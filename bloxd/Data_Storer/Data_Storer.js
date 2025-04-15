function storeData(data){
api.setMoonstoneChestItemSlot("-1",0,"Block of Iron",1,{customDisplayName:"Data",customDescription:"This item stores the data!\n Take this out, only if you want to reset the data/make a backup!", customAttributes:{data}})
}
function readData(){
return api.getMoonstoneChestItemSlot("-1",0)["attributes"]["customAttributes"]["data"]
}

//use "storeData(*your data*)" to store something and "readData()" to read something!
