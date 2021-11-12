/**
 * WALK type script for BLOCK (-2006, 57, -1002)
 *
 * Tower Climb - Barrel 3.3
 *
 * @author      Expugn
 * @version     0.1
 * @type        WALK
 * @block       -2006, 57, -1002
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const TowerClimb = load(`${sm.getScriptDirectory("TowerDungeon")}/TowerClimb.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const dungeon = sm.getDungeon(player);
    // answer, floor, guess, location
    const result = TowerClimb.check(dungeon.getTempVariable(var_names.tower_climb_answer), 3, 3, player.getLocation());
    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(result[1]));
}
main();