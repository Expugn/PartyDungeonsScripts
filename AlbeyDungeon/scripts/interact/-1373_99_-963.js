/**
 * INTERACT type script for BLOCK (-1373, 99, -963)
 *
 * Boss Room Chest Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1373, 99, -963
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);

    const dungeon = sm.getDungeon(player);
    const doors = DoorHandler.init(player.getWorld());

    if (dungeon.getTempVariable(var_names.room_boss)) {
        // ROOM ALREADY TRIGGERED
        player.sendMessage(`${ChatColor.GRAY}The chest is empty!`);
        return;
    }
    dungeon.setTempVariable(var_names.room_boss, true);

    ScheduleHandler(() => {
        doors.boss_door_north.run_north(false);
        doors.boss_tower_nw.run(true);
        doors.boss_tower_ne.run(true);
        doors.boss_tower_se.run(true);
        doors.boss_tower_sw.run(true);
        doors.boss_tower_lock_nw.run(true);
        doors.boss_tower_lock_ne.run(true);
        doors.boss_tower_lock_se.run(true);
        doors.boss_tower_lock_sw.run(true);
        dungeon.messageParty(`${ChatColor.GRAY}Kill ${ChatColor.RED}50 ${ChatColor.GRAY}Zombies to continue!`);

        // DOOR OPEN HANDLED BY onEntityDeath
    });
}
main();