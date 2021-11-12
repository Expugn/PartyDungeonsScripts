/**
 * AREAWALK type script for AREA (-1983, 38, -998) ~ (-1983, 41, -1002)
 *
 * Record Hunt - Storage Room -> Main Room Teleport
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1983, 38, -998) ~ (-1983, 41, -1002)
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER ENTERS THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _enter() {
    const Location = Java.type("org.bukkit.Location");
    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(new Location(player.getWorld(), -1985.5, 34, -999.5, 90, 0)));
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}