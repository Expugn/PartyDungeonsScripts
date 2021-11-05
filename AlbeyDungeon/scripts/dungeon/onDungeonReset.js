/**
 * DUNGEON type script for DUNGEON AlbeyDungeon
 *
 * onEntityDeath is a script that containing instructions
 * on additional things to do when the dungeon resets
 * (disposing of custom entities, changing terrain, etc).
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     AlbeyDungeon
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
	const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);

    const dungeon_file = dungeon.getDungeon().getDungeonFile();
    const world = dungeon_file.getWorld();
    const doors = DoorHandler.init(world);

    const ChatColor = Java.type("org.bukkit.ChatColor");
    dungeon.messageArea(`${ChatColor.GRAY}The dungeon will now be reset...`);

	ScheduleHandler(() => {
        // FLOOR ONE
		doors.key_one_east.run_east(false);
		doors.room_one_east.run_east(true);
		doors.room_one_south.run_south(true);
		doors.room_one_west.run_west(true);
		doors.room_two_west.run_west(true);
		doors.key_two_south.run_south(false);
		doors.key_three_west.run_west(false);

        // FLOOR TWO
        doors.emerald_one_south.run_south(false);
        doors.room_three_west.run_west(true);
        doors.key_four_east.run_east(false);
        doors.key_five_south.run_south(false);

        // FLOOR THREE
        doors.emerald_two_east.run_east(false);
        doors.emerald_three_east.run_east(false);
        doors.emerald_four_east.run_east(false);
        doors.boss_door_north.run_north(false);
        doors.boss_door_south.run_south(false);
        doors.boss_tower_nw.run(false);
        doors.boss_tower_ne.run(false);
        doors.boss_tower_se.run(false);
        doors.boss_tower_sw.run(false);
        doors.boss_tower_lock_nw.run(false);
        doors.boss_tower_lock_ne.run(false);
        doors.boss_tower_lock_se.run(false);
        doors.boss_tower_lock_sw.run(false);
        doors.chest_gate_extreme_west.run_west(false);
        doors.chest_gate_impossible_west.run_west(false);

		// DISPOSE OF SPECIAL DUNGEON ENTITIES
        const BoundingBox = Java.type("org.bukkit.util.BoundingBox");
        const blockA = dungeon_file.getBlockA();
        const blockB = dungeon_file.getBlockB();
        const dungeon_area = new BoundingBox(blockA.getX(), blockA.getY(), blockA.getZ(),
                                             blockB.getX(), blockB.getY(), blockB.getZ());
        const entities = world.getNearbyEntities(dungeon_area);
        const enemy_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/EnemyHandler.js`).enemy_names;

        // Object.keys() DOESN'T WORK WITH NASHORN, CREATE ENEMY NAME INDEX
        let names = [];
        for (const name in enemy_names) {
            names.push(enemy_names[name]);
        }

        // FIND ENTITIES TO REMOVE
        for (const entity of entities) {
            if (names.indexOf(entity.getName()) < 0) {
                // ENTITY IS NOT NAMED IN EntityHandler, LEAVE THEM BE
                continue;
            }
            entity.remove();
        }
	});
}
main();