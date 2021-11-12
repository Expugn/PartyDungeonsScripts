/**
 * WALK type script for BLOCK (-1998, 50, -998)
 *
 * Tower Climb - Barrel 1.3
 *
 * @author      Expugn
 * @version     0.1
 * @type        WALK
 * @block       -1998, 50, -998
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {
    const TowerClimb = load(`${sm.getScriptDirectory("TowerDungeon")}/TowerClimb.js`);
    const var_names = load(`${sm.getScriptDirectory("TowerDungeon")}/VariableHandler.js`).names;
    const dungeon = sm.getDungeon(player);
    // answer, floor, guess, location
    const result = TowerClimb.check(dungeon.getTempVariable(var_names.tower_climb_answer), 1, 3, player.getLocation());
    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(result[1]));
}
main();