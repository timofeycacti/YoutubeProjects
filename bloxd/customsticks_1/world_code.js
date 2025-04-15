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
} else if (stickid=="5"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Dodger Stick",customDescription: "Become Tensai.\n The most OP stick yet. Use RMB to dash at a cost of 25 hp.\nEven though it damages you, it is very cool price for ability like dash)",customAttributes:{abilityid:5}})
} else if (stickid=="6"){
api.giveItem(id, "Stick", 1, {customDisplayName: "Lucky",customDescription: "Lucky lucky lucky me! \nHas chance 1/25 to instakill your enemy.\nRMB does damage or heals\n but can also damage you.\nCan save in extreme situations",customAttributes:{abilityid:6}})
} 

}


}

function onPlayerDamagingOtherPlayer(attacker,target,dmg){
item1=api.getHeldItem(attacker)
//console.log(item1)
if (item1.attributes["customAttributes"]["abilityid"]==1){
api.setVelocity(target,0,5,0)

}else if (item1.attributes["customAttributes"]["abilityid"]==2){
api.setHealth(target,0)
api.setHealth(attacker,0)
}else if (item1.attributes["customAttributes"]["abilityid"]==3){

api.applyEffect(target,"Slowness",1000,{inbuiltLevel:5})
} else if (item1.attributes["customAttributes"]["abilityid"]==4){
let tpos=api.getPosition(target)
api.despawnMob(api.getMobIds()[0])
if (Math.random()>0.8){
api.attemptSpawnMob("Pig",tpos[0],tpos[1],tpos[2])
}
else{
api.attemptSpawnMob("Draugr Zombie",tpos[0],tpos[1],tpos[2])
}
}else if (item1.attributes["customAttributes"]["abilityid"]==5){
api.applyEffect(attacker,"Speed",1000,{inbuiltLevel:50})
}else if (item1.attributes["customAttributes"]["abilityid"]==6){
if (Math.random()>0.95){
api.killLifeform(target)
}}
}


function onPlayerJoin(id){
api.sendMessage(id,"Hello! I am happy to see somebody here. If you want to message me - my Discord is timofeycacti!", {color:"lightgreen"})


}

function onPlayerDamagingMob(id,mid){
api.despawnMob(mid)

}
function onPlayerAltAction(id){
ability=api.getHeldItem(id)["attributes"]["customAttributes"]["abilityid"]
if (ability==5){
api.applyEffect(id,"Speed",1000,{inbuiltLevel:10})
api.applyHealthChange(id,-15)
api.applyEffect(id,"Damage Reduction",1000,{inbuiltLevel:250})
} else if (ability==6){
if (Math.random()>0.45){
api.applyHealthChange(id,-25)
}
else {
api.applyHealthChange(id,25)
}

}
}

