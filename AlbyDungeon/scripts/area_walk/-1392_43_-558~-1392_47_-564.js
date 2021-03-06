/**
 * AREAWALK type script for AREA (-1392, 43, -558) ~ (-1392, 47, -564)
 *
 * Key Two Door Interaction
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1392, 43, -558) ~ (-1392, 47, -564)
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {Player}          player     SCRIPT BINDING
 */
function main() {}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER ENTERS THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _enter() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
    const DoorHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DoorHandler.js`);

    const dungeon = sm.getDungeon(player);
    const doors = DoorHandler.init(player.getWorld());
    const hasKey = dungeon.getTempVariable(var_names.key_two);
    const doorOpen = dungeon.getTempVariable(var_names.key_two_used);

    if (hasKey && !doorOpen) {
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}inserted the ${ChatColor.GOLD}Key ${ChatColor.GRAY}into the lock and the door flung open.`);
        dungeon.setTempVariable(var_names.key_two_used, true);
        ScheduleHandler(() => {
            doors.key_two_west.run_west(true);
        });
    }
    else if (!hasKey) {
        player.sendMessage(`${ChatColor.GRAY}This door is locked... A ${ChatColor.GOLD}Key ${ChatColor.GRAY}is required to open it.`);
    }
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}