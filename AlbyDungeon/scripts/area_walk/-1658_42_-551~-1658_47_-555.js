/**
 * AREAWALK type script for AREA (-1658, 42, -551) ~ (-1658, 47, -555)
 *
 * Albey Dungeon Gateway
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1658, 42, -551) ~ (-1658, 47, -555)
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
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
    ScheduleHandler(() => {
        player.teleport(new Location(player.getWorld(), -1510.5, 172.5, -999.5, -90, 0));
    });
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}