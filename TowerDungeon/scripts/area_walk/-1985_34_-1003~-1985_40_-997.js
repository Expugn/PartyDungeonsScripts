/**
 * AREAWALK type script for AREA (-1985, 34, -1003) ~ (-1985, 40, -997)
 *
 * Record Hunt - Main Room -> Storage Room Teleport
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1985, 34, -1003) ~ (-1985, 40, -997)
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
    load(`${sm.getScriptDirectory("TowerDungeon")}/ScheduleHandler.js`)(() => player.teleport(new Location(player.getWorld(), -1981.5, 38, -999.5, -90, 0)));
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}