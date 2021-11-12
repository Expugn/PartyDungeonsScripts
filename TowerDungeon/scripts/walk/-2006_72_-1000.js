/**
 * WALK type script for BLOCK (-2006, 72, -1000)
 *
 * Tower Climb - Barrel 9.2
 *
 * @author      Expugn
 * @version     0.1
 * @type        WALK
 * @block       -2006, 72, -1000
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const TowerClimb = load(`${sm.getScriptDirectory("TowerDungeon")}/TowerClimb.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const dungeon = sm.getDungeon(player);
    // answer, floor, guess, location
    const result = TowerClimb.check(dungeon.getTempVariable(var_names.tower_climb_answer), 9, 2, player.getLocation());
    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(result[1]));
    if (!result[0]) {
        return;
    }

    // TOWER CLIMB IS COMPLETE
    if (dungeon.getTempVariable(var_names.tower_climb_clear)) {
        return;
    }
    const ChatColor = Java.type("org.bukkit.ChatColor");
    dungeon.setTempVariable(var_names.tower_climb_clear, true);
    const grade = TowerClimb.grade(dungeon.getTempVariable(var_names.tower_climb_start));
    dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GREEN}made it to the highest platform!\n${ChatColor.ITALIC}${ChatColor.GRAY}${TowerClimb.comment(grade)}`);
    dungeon.setTempVariable(var_names.score, dungeon.getTempVariable(var_names.score) + grade);

    const ProgressHandler = load(`${sm.getScriptDirectory("TowerDungeon")}/ProgressHandler.js`);
    ProgressHandler.advance(player.getWorld(), dungeon.getParty(), dungeon.getTempVariable(var_names.progress));
}
main();