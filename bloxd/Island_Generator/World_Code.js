function onPlayerAltAction(id,x,y,z,block){
item= api.getHeldItem(id)!=null? api.getHeldItem(id).name : ""
if (item!="Arrow of Aura XP"){
return
}
[x,y,z]=api.getPosition(id)
y-=3
api.setBlockRect([x-1,y,z-1],[x+1,y,z+1],"Dirt")
api.setBlockRect([x-2,y+1,z-2],[x+2,y+1,z+2],"Stone")
api.setBlockRect([x-2,y+2,z-2],[x+2,y+2,z+2],"Grass Block")
let point = [parseInt(Math.random()*5)-2,parseInt(Math.random()*5)-2]
pX=parseInt(point[0]+x)
pY=parseInt(y+3)
pZ=parseInt(point[1]+z)

api.setBlockRect([pX,pY,pZ],[pX,pY-1,pZ],"Stone")
api.setBlock([pX,pY+1,pZ],"Grass Block")
let flower=["Red Tulip","Dandelion","Forget-me-not","Allium","Air"][parseInt(Math.random()*5)]
api.setBlock([pX,pY+2,pZ],flower)
let cordsMatrix=[[-1,-1],[-1,0],[-1,1],[0,1],[0,-1],[1,1],[1,0],[1,-1]] 
/* array with all coordinates to check */

for (let i = 0; i<cordsMatrix.length; i++){

curr = cordsMatrix[i]  /* to make the name shorter */

cords_to_get=[pX+curr[0],pY-1,pZ+curr[1]]
cords_to_set=[pX+curr[0],pY,pZ+curr[1]]


if (api.getBlock(cords_to_get)=="Grass Block"){
api.setBlock(cords_to_set,"Grass Block")

}
}

}
