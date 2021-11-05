/**
 * AREAWALK type script for AREA (-1399, 143, -1003) ~ (-1399, 147, -997)
 *
 * Room Two (West) Closed Door Bypass
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1399, 143, -1003) ~ (-1399, 147, -997)
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
	const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
    const dungeon = sm.getDungeon(player);
    if (dungeon.getTempVariable(var_names.room_two) && !dungeon.getTempVariable(var_names.room_two_clear)) {
        // ROOM IS ACTIVE AND NOT CLEARED YET, TELEPORT PLAYER IN
        const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
        const ChatColor = Java.type("org.bukkit.ChatColor");
        const Location = Java.type("org.bukkit.Location");
        ScheduleHandler(() => {
            player.sendMessage(`${ChatColor.GRAY}You have warped into the room.`);
            const loc = new Location(player.getWorld(), -1385.5, 143.5, -999.5, -90, 0);
            player.teleport(loc);
        });
    }
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}