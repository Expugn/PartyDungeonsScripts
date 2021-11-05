/**
 * AREAWALK type script for AREA (-1370, 99, -973) ~ (-1376, 103, -973)
 *
 * Boss Key Door Interaction and Closed Door Bypass
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1370, 99, -973) ~ (-1376, 103, -973)
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
    const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);

    const dungeon = sm.getDungeon(player);
    const doors = DoorHandler.init(player.getWorld());
    const hasKey = dungeon.getTempVariable(var_names.keys) > 0;
    const doorOpen = dungeon.getTempVariable(var_names.key_door_boss);

    if (hasKey && !doorOpen) {
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}inserted the ${ChatColor.GOLD}Boss Key ${ChatColor.GRAY}into the lock and the door flung open.`);
        dungeon.setTempVariable(var_names.key_door_boss, true);
        ScheduleHandler(() => {
            doors.boss_door_north.run_north(true);
        });
    }
    else if (!hasKey && !doorOpen) {
        player.sendMessage(`${ChatColor.GRAY}This door is locked... A ${ChatColor.GOLD}Boss Key ${ChatColor.GRAY}is required to open it.`);
    }

    if (dungeon.getTempVariable(var_names.room_boss) && !dungeon.isCleared()) {
        // ROOM IS ACTIVE AND NOT CLEARED YET, TELEPORT PLAYER IN
        const Location = Java.type("org.bukkit.Location");
        ScheduleHandler(() => {
            player.sendMessage(`${ChatColor.GRAY}You have warped into the room.`);
            const loc = new Location(player.getWorld(), -1372.5, 99.5, -969.5, 0, 0);
            player.teleport(loc);
        });
    }
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}