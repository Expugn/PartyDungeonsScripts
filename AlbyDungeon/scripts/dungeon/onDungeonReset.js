/**
 * DUNGEON type script for DUNGEON AlbyDungeon
 * 
 * onDungeonReset is a script containing instructions
 * on additional things to do when the dungeon resets 
 * (disposing of custom entities, changing terrain, etc).
 *
 * @author      CONSOLE
 * @version     0.1
 * @type        DUNGEON
 * @dungeon     AlbyDungeon
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    // print("onDungeonReset called");
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DoorHandler.js`);

    const dungeon_file = dungeon.getDungeon().getDungeonFile();
    const world = dungeon_file.getWorld();
    const doors = DoorHandler.init(world);

    ScheduleHandler(() => {
        // RESET DOORS
        doors.room_one_south.run_south(true);
        doors.room_one_west.run_west(true);
        doors.room_one_north.run_north(true);
        doors.key_one_south.run_south(false);
        doors.room_two_west.run_west(true);
        doors.room_two_north.run_north(true);
        doors.key_two_west.run_west(false);
        doors.room_three_east.run_east(true);
        doors.room_three_south.run_south(true);
        doors.room_three_west.run_west(true);
        doors.key_three_west.run_west(false);
        doors.room_four_north.run_north(true);
        doors.boss_door_east.run_east(false);
        doors.boss_door_west.run_west(false);

        // DISPOSE OF SPECIAL DUNGEON ENTITIES
        const BoundingBox = Java.type("org.bukkit.util.BoundingBox");
        const blockA = dungeon_file.getBlockA();
        const blockB = dungeon_file.getBlockB();
        const dungeon_area = new BoundingBox(blockA.getX(), blockA.getY(), blockA.getZ(), 
                                             blockB.getX(), blockB.getY(), blockB.getZ());
        const entities = world.getNearbyEntities(dungeon_area);
        const enemy_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/EnemyHandler.js`).enemy_names;

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