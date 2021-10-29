/**
 * INTERACT type script for BLOCK (-1449, 43, -501)
 * 
 * Room One Chest Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1449, 43, -501
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
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
    
    if (dungeon.getTempVariable(var_names.room_one)) {
        // ROOM ONE ALREADY TRIGGERED
        player.sendMessage(`${ChatColor.GRAY}The chest is empty!`);
        return;
    }
    dungeon.setTempVariable(var_names.room_one, true);

    ScheduleHandler(() => {
        doors.room_one_south.run_south(false);
        doors.room_one_west.run_west(false);
        doors.room_one_north.run_north(false);
        const difficulty = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`).difficulty_names;
        switch (dungeon.getTempVariable(var_names.difficulty)) {
            case difficulty.NORMAL:
                enemies.room_one.normal();
                break;
            case difficulty.HARD:
                enemies.room_one.hard();
                break;
            case difficulty.EXTREME:
                enemies.room_one.extreme();
                break;
            default:
                enemies.room_one.easy();
                break;
        }
        dungeon.messageParty(`${ChatColor.RED}Monsters ${ChatColor.GRAY}have spawned in ${ChatColor.GOLD}Room One${ChatColor.GRAY}!`);

        // DOOR OPEN HANDLED BY onEntityDeath
    });
}
main();