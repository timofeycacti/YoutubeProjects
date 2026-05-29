let molds = [];
let startPos = []; 

api.broadcastMessage([{ str: "Server Restarted", style: { color: "crimson", "fontSize": "25px" } }]);

const DIRS = [
    [ 1,  0,  0],
    [-1,  0,  0],
    [ 0,  0,  1],
    [ 0,  0, -1],
    [ 0,  1,  0],
    [ 0, -1,  0]
];

function defaultRandomTick() {
    let shuffledBlocks = shuffle([...this.blocks]);
    let blocksToUpdate = shuffledBlocks.slice(0, 5);
    let newBlocks = [];

    for (let blockPos of blocksToUpdate) {
        let currentWorldBlock = api.getBlock(blockPos);

        if (!currentWorldBlock.includes(this.block)) {
            this.blocks = this.blocks.filter(b => !(b[0] === blockPos[0] && b[1] === blockPos[1] && b[2] === blockPos[2]));
            continue;
        }

        let surroundedCount = 0;

        for (let dir of DIRS) {
            let neighborBlock = [
                blockPos[0] + dir[0],
                blockPos[1] + dir[1],
                blockPos[2] + dir[2]
            ];
            
            let neighborType = api.getBlock(neighborBlock);
            
            let isBlocked = neighborType.includes(this.block) || 
                            neighborType.includes(this.secondaryBlock) || 
                            (neighborType !== "Air" && !this.food.some(f => neighborType.includes(f)));

            if (isBlocked) {
                surroundedCount++;
            }
        }

        if (surroundedCount === DIRS.length) {
            let finalBlock = Math.random() < this.secondaryChance ? this.secondaryBlock : "Gray Wool";
            api.setBlock(blockPos, finalBlock);
            
            this.blocks = this.blocks.filter(b => !(b[0] === blockPos[0] && b[1] === blockPos[1] && b[2] === blockPos[2]));
            continue; 
        }

        for (let dir of DIRS) {
            if (this.energy < 1) break;

            let curblock = [
                blockPos[0] + dir[0],
                blockPos[1] + dir[1],
                blockPos[2] + dir[2]
            ];
            
            let cblock = api.getBlock(curblock);
            let isFood = this.food.some(f => cblock.includes(f));

            if (!cblock.includes(this.block) && !cblock.includes(this.secondaryBlock) && (cblock === "Air" || isFood)) {
                if (isFood) {
                    this.energy += this.foodEnergyBonus;
                }
                
                api.setBlock(curblock, this.block);
                newBlocks.push(curblock);
                this.energy -= 1;
            } 
        }
    }
    
    if (newBlocks.length > 0) {
        this.blocks = this.blocks.concat(newBlocks);
    }
}

// Уникальная механика для плесени Rocket со спавном зомби
function zombiert() {
    let shuffledBlocks = shuffle([...this.blocks]);
    let blocksToUpdate = shuffledBlocks.slice(0, 5);
    let newBlocks = [];

    for (let blockPos of blocksToUpdate) {
        let currentWorldBlock = api.getBlock(blockPos);

        if (!currentWorldBlock.includes(this.block)) {
            this.blocks = this.blocks.filter(b => !(b[0] === blockPos[0] && b[1] === blockPos[1] && b[2] === blockPos[2]));
            continue;
        }

        let surroundedCount = 0;

        for (let dir of DIRS) {
            let neighborBlock = [
                blockPos[0] + dir[0],
                blockPos[1] + dir[1],
                blockPos[2] + dir[2]
            ];
            
            let neighborType = api.getBlock(neighborBlock);
            
            let isBlocked = neighborType.includes(this.block) || 
                            neighborType.includes(this.secondaryBlock) || 
                            (neighborType !== "Air" && !this.food.some(f => neighborType.includes(f)));

            if (isBlocked) {
                surroundedCount++;
            }
        }

        if (surroundedCount === DIRS.length) {
            let finalBlock = Math.random() < this.secondaryChance ? this.secondaryBlock : "Gray Wool";
            api.setBlock(blockPos, finalBlock);
            
            this.blocks = this.blocks.filter(b => !(b[0] === blockPos[0] && b[1] === blockPos[1] && b[2] === blockPos[2]));
            continue; 
        }

        for (let dir of DIRS) {
            if (this.energy < 1) break;

            let curblock = [
                blockPos[0] + dir[0],
                blockPos[1] + dir[1],
                blockPos[2] + dir[2]
            ];
            
            let cblock = api.getBlock(curblock);
            let isFood = this.food.some(f => cblock.includes(f));

            if (!cblock.includes(this.block) && !cblock.includes(this.secondaryBlock) && (cblock === "Air" || isFood)) {
                if (isFood) {
                    this.energy += this.foodEnergyBonus;
                }
                if (Math.random() > 0.95) {
                    api.attemptSpawnMob("Draugr Zombie", curblock[0], curblock[1], curblock[2], {name:`${this.ownerName}'s zombie`});
                }
                
                api.setBlock(curblock, this.block);
                newBlocks.push(curblock);
                this.energy -= 1;
            } 
        }
    }
    
    if (newBlocks.length > 0) {
        this.blocks = this.blocks.concat(newBlocks);
    }
}

class MoldConfig {
    constructor(block, secondaryBlock, secondaryChance, food, startEnergy, foodEnergyBonus, customTickFunc = defaultRandomTick) {
        this.block = block;
        this.secondaryBlock = secondaryBlock;
        this.secondaryChance = secondaryChance;
        this.food = food;
        this.startEnergy = startEnergy;
        this.foodEnergyBonus = foodEnergyBonus;
        this.tickLogic = customTickFunc || defaultRandomTick; 
    }
}

class Mold {
    constructor(ownerName, x, y, z, config) {
        this.ownerName = ownerName;
        this.blocks = [[x, y, z]];
        this.block = config.block;
        this.secondaryBlock = config.secondaryBlock;
        this.secondaryChance = config.secondaryChance;
        this.food = config.food;
        this.energy = config.startEnergy;
        this.foodEnergyBonus = config.foodEnergyBonus;
        this.tickLogic = config.tickLogic;
    }

    randomTick() {
        if (this.energy < 1) return;
        this.tickLogic.call(this);
    }
}

const moldsConfig = [
    new MoldConfig("Fat Cactus", "Wood Spikes", 0.6, ["Grass", "Maple Log"], 10, 15),
    new MoldConfig("Sponge", "Clay", 0.2, ["Water", "Lava"], 5, 2),
    new MoldConfig("Mega Compressed Messy Stone", "Gray Portal", 0.05, ["Stone", "Bedrock"], 500, 25),
    new MoldConfig("White Wool", "White Portal", 0.15, ["Magma", "Maple Leaves"], 100, 0),
    new MoldConfig("Magma", "Lava", 0.1, ["Fat Cactus", "Mega Compressed Messy Stone", "Sponge", "Compressed Messy Stone"], 25, 2),
    new MoldConfig("Compressed Messy Stone", "Diamond Ore", 0.02, ["Stone"], 50, 0.5),
    new MoldConfig("Rocket", "Green Stone", 0.4, ["Maple Leaves"], 50, 0.5, zombiert),
    // ^^^ Example of a mold with custom function.
    // \/ Example of a mold with just basic paramatres
    new MoldConfig("Red Wool", "Red Portal", 0.02, ["Pear Leaves"], 15, 8), //Useless mold, for testing only
];

let millis = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function onPlayerJoin(id) {
    api.applyEffect(id,"Double Jump",null,{inbuiltLevel:4})
    api.applyEffect(id,"Haste",null,{inbuiltLevel:5})
    api.giveItem(id,"Wood Hang Glider")
    for (let config of moldsConfig) {
        let foodList = config.food.join(", ");
        api.giveItem(id, config.block, 1, {
            customDisplayName: config.block + " mold",
            customDescription: "Eats: " + foodList
        });
    }
    api.setClientOption(id, "RightInfoText", [
        {str: "Mold Simulator\n", style: {color: "cyan", "fontSize": "25px"}},
        {str: "Grow your mold and conquer others!\nYou have been given 10 starter mold! try planting it!\n\nRemember: your mold can die if you don't feed it.", "style": {color: "lightyellow"}},
        {"str": "\nTo understand what your mold likes,\nopen your inventory and look at item descriptions.", "style": {color: "lightgray"}},
        {str: "\n\nDiscord Code: XNJaxqRxPW", style: {color: "yellow"}}
    ]);
}

function onPlayerChangeBlock(id, x, y, z, from, to) {
    for (let config of moldsConfig) {
        if (to.includes(config.block)) {
            api.sendMessage(id,[{str:"You summoned a new mold!","style":{color:"limegreen"}}])
            molds.push(new Mold(api.getEntityName(id), x, y, z, config));
            break;
        }
    }
}

function tick() {
    millis++;

    // if (millis % 250 === 0 && startPos.length > 0) {
    //     let blocksPerTick = 10; 

    //     for (let pos of startPos) {
    //         for (let i = 0; i < blocksPerTick; i++) {
    //             let offsetX = Math.floor(Math.random() * 201) - 100;
    //             let offsetZ = Math.floor(Math.random() * 201) - 100;

    //             let targetBlock = [
    //                 pos[0] + offsetX,
    //                 50, // Фиксированная высота 50
    //                 pos[1] + offsetZ
    //             ];

    //             if (api.getBlock(targetBlock) === "Air") {
    //                 api.setBlock(targetBlock, "Dirt");
    //             }
    //         }
    //     }
    //}

    if (millis % 10 !== 0) return;
    
    molds = molds.filter(mold => {
        if (mold.energy < 1 || mold.blocks.length === 0) {
            api.broadcastMessage([
                {str: "Mold "},
                {str: `[${mold.block} Mold]`, style: {color: "yellow"}},
                " owned by ",
                {str: mold.ownerName, style: {color: "mediumpurple"}},
                " died at ",
                {str: `${mold.blocks.length} blocks`, style: {color: "lightseagreen"}},
                "!"
            ]);
            return false;
        }
        return true;
    });

    let shuffledMolds = shuffle([...molds]);
    let moldsToUpdate = shuffledMolds.slice(0, 1);

    for (let mold of moldsToUpdate) {
        mold.randomTick();
    }
}

function playerCommand(id, cmd) {
    if (cmd == "molds") {
        api.sendMessage(id, moldsConfig);
    }
}
