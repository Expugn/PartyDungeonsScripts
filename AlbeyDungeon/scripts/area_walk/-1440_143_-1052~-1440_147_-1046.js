/**
 * AREAWALK type script for AREA (-1440, 143, -1052) ~ (-1440, 147, -1046)
 *
 * Room One (West) Closed Door Bypass
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1440, 143, -1052) ~ (-1440, 147, -1046)
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
    if (dungeon.getTempVariable(var_names.room_one) && !dungeon.getTempVariable(var_names.room_one_clear)) {
        // ROOM IS ACTIVE AND NOT CLEARED YET, TELEPORT PLAYER IN
        const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
        const ChatColor = Java.type("org.bukkit.ChatColor");
        const Location = Java.type("org.bukkit.Location");
        ScheduleHandler(() => {
            player.sendMessage(`${ChatColor.GRAY}You have warped into the room.`);
            const loc = new Location(player.getWorld(), -1425.5, 143.5, -1048.5, -180, 0);
            player.teleport(loc);
        });
    }
}
/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}