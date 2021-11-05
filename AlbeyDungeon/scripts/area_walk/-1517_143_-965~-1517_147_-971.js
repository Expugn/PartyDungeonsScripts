/**
 * AREAWALK type script for AREA (-1517, 143, -965) ~ (-1517, 147, -971)
 *
 * Key Three Door Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1517, 143, -965) ~ (-1517, 147, -971)
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
    const doorOpen = dungeon.getTempVariable(var_names.key_door_three);

    if (hasKey && !doorOpen) {
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}inserted the ${ChatColor.GOLD}Key ${ChatColor.GRAY}into the lock and the door flung open.`);
        dungeon.setTempVariable(var_names.keys, dungeon.getTempVariable(var_names.keys) - 1);
        dungeon.setTempVariable(var_names.key_door_three, true);
        ScheduleHandler(() => {
            doors.key_three_west.run_west(true);
        });
    }
    else if (!hasKey && !doorOpen) {
        player.sendMessage(`${ChatColor.GRAY}This door is locked... A ${ChatColor.GOLD}Key ${ChatColor.GRAY}is required to open it.`);
    }
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}