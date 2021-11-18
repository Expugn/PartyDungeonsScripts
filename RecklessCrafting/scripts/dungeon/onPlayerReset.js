/**
 * DUNGEON type script for DUNGEON RecklessCrafting
 *
 * onPlayerReset is a script that contains instructions on how
 * to revert a player back to their original state if the dungeon
 * has modified their health or potion effects.
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
	player.getInventory().clear();
	sm.clearPotionEffect(player);
}
main();