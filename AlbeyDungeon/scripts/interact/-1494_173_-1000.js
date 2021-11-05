/**
 * INTERACT type script for BLOCK (-1494, 173, -1000)
 *
 * Impossible Difficulty Button Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1494, 173, -1000
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const DifficultyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DifficultyHandler.js`);
    const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
    const dungeon = sm.getDungeon(player);
    const party = dungeon.getParty();
    if (dungeon.getTempVariable(var_names.impossible)) {
        // IMPOSSIBLE FLAG ALREADY SET
        player.sendMessage(`${ChatColor.GRAY}The button is stuck in place...`);
        return;
    }
    if (DifficultyHandler.get_difficulty(party.size() - 1) !== DifficultyHandler.difficulty_names.EXTREME) {
        // NEEDS 5+ PLAYERS TO ACTIVATE BUTTON
        player.sendMessage(`${ChatColor.GRAY}There are insufficient players in the party.`);
        return;
    }

    // SET DUNGEON FLAG AND ALERT AREA
    dungeon.setTempVariable(var_names.impossible, true);
    dungeon.messageArea(`${ChatColor.GRAY}The ground shakes and a threatening roar is heard in the distance...`);

    // FANCY LIGHTNING SOUND EFFECTS
    const Sound = Java.type("org.bukkit.Sound");
    const Location = Java.type("org.bukkit.Location");
    player.getWorld().playSound(new Location(player.getWorld(), -1494, 173, -1000), Sound.ENTITY_LIGHTNING_BOLT_THUNDER, 10, 1);
}
main();