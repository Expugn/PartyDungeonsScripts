/**
 * INTERACT type script for BLOCK (-1422, 132, -938)
 *
 * Room Three Chest Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1422, 132, -938
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
    const DropRateHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DropRateHandler.js`);
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const EnemyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/EnemyHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);

    const dungeon = sm.getDungeon(player);
    const drop_rate = DropRateHandler.get_drop_rate(dungeon.getTempVariable(var_names.drop_rate));
    const enemies = EnemyHandler.init(player.getWorld(), drop_rate);
    const doors = DoorHandler.init(player.getWorld());

    if (dungeon.getTempVariable(var_names.room_three)) {
        // ROOM ALREADY TRIGGERED
        player.sendMessage(`${ChatColor.GRAY}The chest is empty!`);
        return;
    }
    dungeon.setTempVariable(var_names.room_three, true);

    ScheduleHandler(() => {
        doors.room_three_west.run_west(false);
        const difficulty = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DifficultyHandler.js`).difficulty_names;
        switch (dungeon.getTempVariable(var_names.difficulty)) {
            case difficulty.EXTREME:
            case difficulty.IMPOSSIBLE:
                enemies.room_three.extreme();
                break;
            default:
                enemies.room_three.hard();
                break;
        }
        dungeon.messageParty(`${ChatColor.RED}Monsters ${ChatColor.GRAY}have spawned in a room!`);

        // DOOR OPEN HANDLED BY onEntityDeath
    });
}
main();