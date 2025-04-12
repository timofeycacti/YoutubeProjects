let tickk = 0;

function onPlayerChangeBlock(id, x, y, z, from, to, nu, nu2, nu3) {
    if (to === "White Wool" || to=="Black Wool") {
        let curdata = api.getMoonstoneChestItemSlot("-1", 0)["attributes"]["customAttributes"]["blocks"];
        console.log(curdata);
        curdata.push([x, y, z]);
        api.setMoonstoneChestItemSlot("-1", 0, "Dirt", 1, { "customAttributes": { "blocks": curdata } });
    }
}

function tick() {
    if (tickk > 500) {
        let curdata = api.getMoonstoneChestItemSlot("-1", 0)["attributes"]["customAttributes"]["blocks"];
        tickk = 0;

        for (let i of curdata) {
            if (api.getBlock(i[0], i[1], i[2]) === "White Wool") {
                api.setBlock(i[0], i[1], i[2], "Black Wool");
            } else {
                api.setBlock(i[0], i[1], i[2], "White Wool");
            }
        }
    } else {
        tickk += 1;
    }
}
