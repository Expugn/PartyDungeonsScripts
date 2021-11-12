/**
 * DUNGEON type script for DUNGEON TowerDungeon
 *
 * onEntityDeath is a script that containing instructions
 * on how to deal with entities who die in the dungeon
 * area while it is active.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     TowerDungeon
 *
 * @param {LivingEntity}    entity     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
	if (dungeon.isCleared()) {
        // DUNGEON IS CLEARED, WE DON'T NEED TO WORRY ABOUT EntityDeath ANYMORE
        return;
    }

	if (entity.getName() === "Sturdy Giant") {
		// HANDLE GiantCombat CLEAR HERE
		const ChatColor = Java.type("org.bukkit.ChatColor");
		const GiantCombat = load(`${sm.getScriptDirectory("TowerDungeon")}/GiantCombat.js`);
		const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
		const grade = GiantCombat.grade(dungeon.getTempVariable(var_names.giant_combat_start));
		dungeon.messageParty(`${ChatColor.GOLD}${entity.getKiller().getName()} ${ChatColor.GREEN}dealt the final blow to the ${ChatColor.RED}Giant${ChatColor.GREEN}!\n${ChatColor.ITALIC}${ChatColor.GRAY}${GiantCombat.comment(grade)}`);
		dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);

		const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
   		ProgressHandler.advance(entity.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
	}
}
main();