/**
 * INTERACT type script for BLOCK (-1495, 73, -501)
 *
 * Extreme difficulty button interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1495, 73, -501
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const DifficultyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`);
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const dungeon = sm.getDungeon(player);
    const party = dungeon.getParty();
    if (dungeon.getTempVariable(var_names.extreme)) {
        // EXTREME FLAG ALREADY SET
        player.sendMessage(`${ChatColor.GRAY}The button is stuck in place...`);
        return;
    }
    if (DifficultyHandler.get_difficulty(party.size()) !== DifficultyHandler.difficulty_names.HARD) {
        // DIFFICULTY IS NOT AT LEAST HARD
        player.sendMessage(`${ChatColor.GRAY}There are insufficient players in the party.`);
        return;
    }

    // SET DUNGEON FLAG AND ALERT AREA
    dungeon.setTempVariable(var_names.extreme, true);
    dungeon.messageArea(`${ChatColor.GRAY}The darkness has been released.`);

    // FANCY LIGHTNING SOUND EFFECTS
    const Sound = Java.type("org.bukkit.Sound");
    const Location = Java.type("org.bukkit.Location");
    player.getWorld().playSound(new Location(player.getWorld(), -1495, 73, -501), Sound.ENTITY_LIGHTNING_BOLT_THUNDER, 10, 1);
}
main();