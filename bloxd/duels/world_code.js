let duelX = 20 //change this
let duelY = -3 //change this
let duelZ = 0 //change this
let curq = [] //do not change THIS variable


function playerCommand(id,cmd){
if (cmd == "duel"){
if (curq.includes(id)){
api.sendMessage(id,"You are already in the queue!", {color:"orange"})
}
else if(curq.length==2){
api.sendMessage(id,"Queue is full!")
}
else{
curq.push(id)
api.sendMessage(id,"You've been added to the queue")
}
if (curq.length>=2){
api.broadcastMessage("Queue is full! Starting battle!",{color:"yellow"})
api.setPosition(curq[0],duelX,duelY,duelZ)
api.setPosition(curq[1],duelX,duelY,duelZ)

}

}}

function onPlayerKilledOtherPlayer(attacker,target){
if (curq.includes(target)){
curq.pop(target)
api.broadcastMessage(`${api.getEntityName(attacker)} won the duel against ${api.getEntityName(target)}`)
curq=[]
}
}

