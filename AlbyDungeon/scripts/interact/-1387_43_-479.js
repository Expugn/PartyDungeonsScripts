/**
 * INTERACT type script for BLOCK (-1387, 43, -479)
 *
 * Room Two Chest Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1387, 43, -479
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {Player}          player     SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const DropRateHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DropRateHandler.js`);
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
    const EnemyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/EnemyHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DoorHandler.js`);

    const dungeon = sm.getDungeon(player);
    const drop_rate = DropRateHandler.get_drop_rate(dungeon.getTempVariable(var_names.drop_rate));
    const enemies = EnemyHandler.init(player.getWorld(), drop_rate);
    const doors = DoorHandler.init(player.getWorld());

    if (dungeon.getTempVariable(var_names.room_two)) {
        // ROOM TWO ALREADY TRIGGERED
        player.sendMessage(`${ChatColor.GRAY}The chest is empty!`);
        return;
    }
    dungeon.setTempVariable(var_names.room_two, true);

    ScheduleHandler(() => {
        doors.room_two_west.run_west(false);
        doors.room_two_north.run_north(false);
        const difficulty = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`).difficulty_names;
        switch (dungeon.getTempVariable(var_names.difficulty)) {
            case difficulty.NORMAL:
                enemies.room_two.normal();
                break;
            case difficulty.HARD:
                enemies.room_two.hard();
                break;
            case difficulty.EXTREME:
                enemies.room_two.extreme();
                break;
            default:
                enemies.room_two.easy();
                break;
        }
        dungeon.messageParty(`${ChatColor.RED}Monsters ${ChatColor.GRAY}have spawned in ${ChatColor.GOLD}Room One${ChatColor.GRAY}!`);

        // DOOR OPEN HANDLED BY onEntityDeath
    });
}
main();