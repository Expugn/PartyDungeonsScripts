/**
 * INTERACT type script for BLOCK (-1999, 34, -1000)
 *
 * Record Hunt - Jukebox
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1999, 34, -1000
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const RecordHunt = load(`${sm.getScriptDirectory("TowerDungeon")}/RecordHunt.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const dungeon = sm.getDungeon(player);
    const item = player.getInventory().getItemInMainHand();

    if (dungeon.getTempVariable(var_names.record_hunt_clear)) {
        return;
    }

    if (!RecordHunt.check(item)) {
        // PLAYER HAS THE INCORRECT RECORD
        player.sendMessage(`${ChatColor.RED}Sorry, this is not the correct music disc!`);
        return;
    }
    const grade = RecordHunt.grade(dungeon.getTempVariable(var_names.record_hunt_start));
    dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GREEN}played the correct music disc!\n${ChatColor.ITALIC}${ChatColor.GRAY}${RecordHunt.comment(grade)}`);
    dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);
    dungeon.setTempVariable(var_names.record_hunt_clear, true);

    const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
    ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
}
main();