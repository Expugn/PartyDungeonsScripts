/**
 * INTERACT type script for BLOCK (-1991, 162, -1000)
 * @todo ADD A DESCRIPTION OF WHAT THE SCRIPT DOES HERE!
 *
 * @author      Expugn
 * @version     0.1
 * @type        INTERACT
 * @block       -1991, 162, -1000
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {Player}          player     SCRIPT BINDING
 */
function main() {
    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => sm.getDungeon(player).leave(player));
}
main();