/**
 * AREAWALK type script for AREA (-1540, 43, -532) ~ (-1546, 47, -532)
 *
 * Room Four (North) Closed Door Bypass
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1540, 43, -532) ~ (-1546, 47, -532)
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
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const dungeon = sm.getDungeon(player);
    if (dungeon.getTempVariable(var_names.room_four) && !dungeon.getTempVariable(var_names.key_boss)) {
        // ROOM IS ACTIVE AND NOT CLEARED YET, TELEPORT PLAYER IN
        const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
        const ChatColor = Java.type("org.bukkit.ChatColor");
        const Location = Java.type("org.bukkit.Location");
        ScheduleHandler(() => {
            player.sendMessage(`${ChatColor.GRAY}You have warped into the room.`);
            const loc = new Location(player.getWorld(), -1543.5, 43, -520.5, 180, 0);
            player.teleport(loc);
        });
    }
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}