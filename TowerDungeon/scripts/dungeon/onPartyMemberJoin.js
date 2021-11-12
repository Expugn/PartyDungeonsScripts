/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onPartyMemberJoin is a script that containing instructions
 * on how to start the dungeon once a party member joins.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     TowerDungeon
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const VariableHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`);
    const var_names = VariableHandler.names;
	if (!dungeon.getTempVariable(var_names.init)) {
        // INITIALIZE TEMP VARIABLES IF IT HASN'T BEEN DONE YET
        VariableHandler.init(dungeon);
    }

	if (dungeon.getParty().size() < 4) {
		dungeon.messageArea(`${ChatColor.YELLOW}Waiting for more players for TowerDungeon! (${dungeon.getParty().size()}/4)`);
		return;
	}

	// ENOUGH PLAYERS
	const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
	dungeon.messageArea(`${ChatColor.YELLOW}Starting TowerDungeon!`);
	dungeon.start(false); // dont teleport players
	ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
}
main();