/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onPlayerRespawn is a script that contains instructions on how
 * to handle a player when they respawn in game after they die.
 * The player at this state is labeled as "Dead" in the dungeon.
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
	const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
	ProgressHandler.return_player(player);
	dungeon.modifyPlayerState(player, sm.enumPlayerState("Alive"));
}
main();