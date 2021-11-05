/**
 * AREAWALK type script for AREA (-1551, 143, -965) ~ (-1551, 147, -971)
 *
 * Floor One -> Floor Two Staircase
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1551, 143, -965) ~ (-1551, 147, -971)
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
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const Location = Java.type("org.bukkit.Location");
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const dungeon = sm.getDungeon(player);
    dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}traversed deeper in the dungeon and entered ${ChatColor.GOLD}Floor Two${ChatColor.GRAY}.`);
    ScheduleHandler(() => {
        player.teleport(new Location(player.getWorld(), -1510.5, 132.5, -999.5, -90, 0));
    });
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}