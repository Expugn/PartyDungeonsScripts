/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onEntityDeath is a script that containing instructions
 * on additional things to do when the dungeon resets
 * (disposing of custom entities, changing terrain, etc).
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     TowerDungeon
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    const dungeon_file = dungeon.getDungeon().getDungeonFile();
    const world = dungeon_file.getWorld();

    const ChatColor = Java.type("org.bukkit.ChatColor");
    dungeon.messageArea(`${ChatColor.GRAY}Resetting TowerDungeon...`);

    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => {
        const BoundingBox = Java.type("org.bukkit.util.BoundingBox");
        const blockA = dungeon_file.getBlockA();
        const blockB = dungeon_file.getBlockB();
        const dungeon_area = new BoundingBox(blockA.getX(), blockA.getY(), blockA.getZ(),
                                             blockB.getX(), blockB.getY(), blockB.getZ());
        const entities = world.getNearbyEntities(dungeon_area);

		for (const entity of entities) {
            if (entity.getName() === "Sturdy Giant") {
                entity.remove();
				break; // only 1 Sturdy Giant can exist anyways
            }
        }
	});
}
main();