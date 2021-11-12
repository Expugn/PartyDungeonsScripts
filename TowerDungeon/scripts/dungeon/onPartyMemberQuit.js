/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onPartyMemberQuit is a script that contains instructions on how
 * to handle a player when they leave or disconnect from a party while it is active.
 * The player at this state is labeled as "Quitter" or "Offline" in the dungeon.
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
	// dungeon.getParty().size() > 1 check helps stop dungeon reset from firing twice
	if (dungeon.isActive() && dungeon.getParty().size() > 1) {
		const ChatColor = Java.type("org.bukkit.ChatColor");
		dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}has quit or disconnected. The dungeon will be reset.`);
		dungeon.stop();
	}
}
main();