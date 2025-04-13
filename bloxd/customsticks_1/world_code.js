function playerCommand(id, cmd) {
if (cmd.startsWith("get")) {
let stickid = cmd.split(" ")[1]
console.log(stickid)
api.removeItemName(id,"Stick",999)
if (stickid=="0"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Classic Stick",customDescription: "Classic as always",customAttributes:{abilityid:0}})
} else if (stickid=="1"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Levitation Stick",customDescription: "Let your enemy fly",customAttributes:{abilityid:1}})
} else if (stickid=="2"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Samurai",customDescription: "Use with caution...",customAttributes:{abilityid:2}})
} else if (stickid=="3"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Prison Stick",customDescription: "Make your enemy stand still!",customAttributes:{abilityid:3}})
} else if (stickid=="4"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Piggy Stick!",customDescription: "Spawn piggies and not only them!",customAttributes:{abilityid:4}})
}
}


}

function onPlayerDamagingOtherPlayer(attacker,target,dmg){
item1=api.getHeldItem(attacker)
//console.log(item1)
if (item1.attributes["customAttributes"]["abilityid"]==1){
api.setVelocity(target,0,25,0)

}else if (item1.attributes["customAttributes"]["abilityid"]==2){
api.setHealth(target,0)
api.setHealth(attacker,0)
}else if (item1.attributes["customAttributes"]["abilityid"]==3){

api.applyEffect(target,"Slowness",5000,{inbuiltLevel:100})
} else if (item1.attributes["customAttributes"]["abilityid"]==4){
if (api.getMobIds()!=[]){
api.despawnMob(api.getMobIds()[0])
}
let tpos=api.getPosition(target)
if (Math.random()<0.800){
api.attemptSpawnMob("Pig",tpos[0],tpos[1],tpos[2])
}
else{
api.attemptSpawnMob("Draugr Zombie",tpos[0],tpos[1],tpos[2])
}

}
}


function onPlayerJoin(id){
api.sendMessage(id,"Hello! I am happy to see somebody here. If you want to message me - my Discord is timofeycacti!", {color:"lightgreen"})


}


function onPlayerFinishChargingItem(id,used,name){

console.log(`${api.getEntityName(id)} used ${name}`)

}
