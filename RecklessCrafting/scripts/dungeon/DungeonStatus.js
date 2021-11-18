/**
 * DUNGEON type script for DUNGEON RecklessCrafting
 *
 * DungeonStatus is a script that containing instructions
 * on how to handle a user when they run `/partydungeons status`.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     RecklessCrafting
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
	dungeon.showDefaultStatus(player);
}
main();