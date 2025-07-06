height=5

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

for (let counter = 0; counter<2; counter++){
let point = [parseInt(Math.random()*5)-2,parseInt(Math.random()*5)-2]
pX=parseInt(point[0]+x)
pY=parseInt(y+3+height)
pZ=parseInt(point[1]+z)

api.setBlockRect([pX,pY,pZ],[pX,pY-1,pZ],"Stone")

api.setBlock([pX,pY+1,pZ],"Grass Block")
layers=0
roots=[[pX,pY,pZ]]
rstate=[false]
while (!rstate.every(v => v === true && layers < height)){
for (let rootn = 0; rootn < roots.length; rootn++) {
    let root = roots[rootn];
    
    if (api.getBlock([root[0],root[1]-1,root[2]])){
        api.setBlock([root[0]+1,root[1]-1,root[2]],"Grass Block")
        api.setBlock([root[0],root[1]-1,root[2]+1],"Grass Block")
        api.setBlock([root[0],root[1]-1,root[2]-1],"Grass Block")
        api.setBlock([root[0]-1,root[1]-1,root[2]],"Grass Block")
        roots.push([root[0]+1,root[1]-1,root[2]])
        roots.push([root[0],root[1]-1,root[2]+1])
        roots.push([root[0],root[1]-1,root[2]])
        roots.push([root[0]-1,root[1]-1,root[2]])
        rstate.push(false, false, false, false)
		layers+=1

    } else {
        rstate[rootn]=true
    }}
}
}
}
