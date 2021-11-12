/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onPlayerReset is a script that containing instructions
 * on how to deal with dead players trying to rejoin
 * the dungeon session they were a part of.
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