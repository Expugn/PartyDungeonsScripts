/**
 * DUNGEON type script for DUNGEON RecklessCrafting
 *
 * onEntityDeath is a script that containing instructions
 * on additional things to do when the dungeon resets
 * (disposing of custom entities, changing terrain, etc).
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     RecklessCrafting
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    const Location = Java.type("org.bukkit.Location");
    const arena_schematic = `${sm.getDungeonDirectory("RecklessCrafting")}/RecklessCraftingArena.schem`;
    const world = dungeon.getDungeon().getDungeonFile().getWorld();
    const locations = [
        new Location(world, -2017, 49, -528), // PLAYER 1
        new Location(world, -2017, 49, -495), // PLAYER 2
        new Location(world, -2017, 49, -561), // PLAYER 3
        new Location(world, -2017, 49, -462), // PLAYER 4
    ];

    // RESET ARENA
    const ClipboardFormats = Java.type("com.sk89q.worldedit.extent.clipboard.io.ClipboardFormats");
    const BlockVector3 = Java.type("com.sk89q.worldedit.math.BlockVector3");
    const BukkitWorld = Java.type("com.sk89q.worldedit.bukkit.BukkitWorld");
    for (const location of locations) {
        ClipboardFormats.findByFile(new java.io.File(arena_schematic))
            .load(new java.io.File(arena_schematic))
            .paste(new BukkitWorld(world), BlockVector3["at(int, int, int)"](location.getX(), location.getY(), location.getZ()), true, true, null)
            .close();
    }

    // CLEAR ITEMS
    load(`${sm.getScriptDirectory("RecklessCrafting")}/ScheduleHandler.js`)(() => {
        const BoundingBox = Java.type("org.bukkit.util.BoundingBox");
        const blockA = new Location(world, -1968, 114, -562).getBlock();
        const blockB = new Location(world, -2017, 48, -430).getBlock();
        const arena_area = new BoundingBox(blockA.getX(), blockA.getY(), blockA.getZ(),
                                           blockB.getX(), blockB.getY(), blockB.getZ());
        const entities = world.getNearbyEntities(arena_area);

        for (const entity of entities) {
            if (entity.getType().toString() === "DROPPED_ITEM") {
                entity.remove();
            }
        }
    });
}
main();