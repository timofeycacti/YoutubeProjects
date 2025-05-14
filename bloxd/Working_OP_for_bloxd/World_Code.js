
function storeData(data){
api.setMoonstoneChestItemSlot("-1",0,"Block of Iron",1,{customDisplayName:"Data",customDescription:"This item stores the data!\n Take this out, only if you want to reset the data/make a backup!", customAttributes:{data}})
}
function readData(){
return api.getMoonstoneChestItemSlot("-1",0)["attributes"]["customAttributes"]["data"]
}

storeData(["-1"])

function playerCommand(id,cmd){
if (!readData().includes(id)){
return
}
if (cmd.startsWith("api")){
eval(cmd.slice(3))
} else if (cmd.startsWith("admin")){
storeData(readData().slice().push(api.getPlayerIdByName(cmd.slice(5))))
}
}
