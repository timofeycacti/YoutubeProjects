function onPlayerAltAction(id,x,y,z,block){
item= api.getHeldItem(id)!=null? api.getHeldItem(id).name : ""
if (item!="Arrow of Aura XP" || block != "Jungle Grass Block"){
return
}
//[x,y,z]=api.getPosition(id)
y-=2
api.setBlockRect([x-1,y,z-1],[x+1,y,z+1],"Jungle Grass Block")
api.setBlockRect([x-2,y+1,z-2],[x+2,y+1,z+2],"Stone")
api.setBlockRect([x-2,y+2,z-2],[x+2,y+2,z+2],"Grass Block")
let flower=["Red Tulip","Dandelion","Forget-me-not","Allium","Air"][parseInt(Math.random()*5)]

generateNoiseSquare(x-2,y+2,z-2,5,5)
api.setPosition(id,x,y+10,z)

}


function generateNoiseSquare(x0, y, z0, width, depth) {
    let scale = 1; 
    for (let dx = 0; dx < width; dx++) {
        for (let dz = 0; dz < depth; dz++) {
            let worldX = x0 + dx;
            let worldZ = z0 + dz;

            let noiseVal = fakeNoise(worldX * scale, worldZ * scale); 
            let height = Math.floor(noiseVal * 5); 

            for (let dy = 0; dy <= height; dy++) {
                let blockType = dy === height ? "Grass Block" : "Dirt";
                api.setBlock([worldX, y + dy, worldZ], blockType);
            }
        }
    }
}



function fakeNoise(x, y) {
    return Math.sin(x * 0.3 + y * 0.7) * Math.cos(x * 0.5 - y * 0.2);
}
