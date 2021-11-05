/**
 * INTERACT type script for BLOCK (-1423, 100, -991)
 *
 * Emerald Room Three - South East
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1423, 100, -991
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

    if (dungeon.getTempVariable(var_names.emerald_three_clear)) {
        // DOOR IS ALREADY OPEN
        player.sendMessage(`${ChatColor.GRAY}The door is already open.`);
        return;
    }

    if (dungeon.getTempVariable(var_names.emerald_three_two)) {
        // BLOCK ALREADY INTERACTED WITH
        player.sendMessage(`${ChatColor.GRAY}This block has already been interacted with.`);
        return;
    }
    dungeon.setTempVariable(var_names.emerald_three_two, true);

    if (dungeon.getTempVariable(var_names.emerald_three_value) === 2) {
        // THIS BLOCK OPENS THE DOOR
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}activated the correct block and the door opened.`);
        dungeon.setTempVariable(var_names.emerald_three_clear, true);
        ScheduleHandler(() => {
            doors.emerald_three_east.run_east(true);
        });
        return;
    }

    // THIS CHEST DOES NOT HAVE THE KEY
    dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}activated the wrong block. ${ChatColor.RED}Monsters ${ChatColor.GRAY}have spawned.`);
    ScheduleHandler(() => {
        enemies.emerald_three.spawn();
    });
    return;
}
main();