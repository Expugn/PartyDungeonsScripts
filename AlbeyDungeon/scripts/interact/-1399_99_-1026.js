/**
 * INTERACT type script for BLOCK (-1399, 99, -1026)
 *
 * Four Chests Three - North West
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1399, 99, -1026
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

    const dungeon = sm.getDungeon(player);
    const drop_rate = DropRateHandler.get_drop_rate(dungeon.getTempVariable(var_names.drop_rate));
    const enemies = EnemyHandler.init(player.getWorld(), drop_rate);

    if (dungeon.getTempVariable(var_names.four_chests_three_two)) {
        // CHEST ALREADY TRIGGERED
        player.sendMessage(`${ChatColor.GRAY}The chest is empty!`);
        return;
    }
    dungeon.setTempVariable(var_names.four_chests_three_two, true);

    if (dungeon.getTempVariable(var_names.four_chests_three_value) === 2) {
        // THIS CHEST HAS THE KEY
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}obtained a ${ChatColor.GOLD}Boss Key ${ChatColor.GRAY}from a chest.`);
        dungeon.setTempVariable(var_names.keys, dungeon.getTempVariable(var_names.keys) + 1);
        return;
    }

    // THIS CHEST DOES NOT HAVE THE KEY
    dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}opened a trap chest! ${ChatColor.RED}Monsters ${ChatColor.GRAY}have spawned.`);
    ScheduleHandler(() => {
        enemies.trap_chest_three.spawn();
    });
    return;
}
main();