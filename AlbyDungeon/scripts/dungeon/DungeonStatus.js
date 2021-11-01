/**
 * DUNGEON type script for DUNGEON AlbyDungeon
 *
 * DungeonStatus is a script containing instructions
 * on how to handle a user when they run `/partydungeons status`.
 *
 * @author      CONSOLE
 * @version     0.1
 * @type        DUNGEON
 * @dungeon     AlbyDungeon
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {Player}          player     SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    const ChatColor = Java.type("org.bukkit.ChatColor");
    const DifficultyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`);
    const DropRateHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DropRateHandler.js`);
    const SpecialItemHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/SpecialItemHandler.js`);
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const party = dungeon.getParty();
    const drop_rate = dungeon.getTempVariable(var_names.drop_rate);
    const soul_essence = dungeon.getTempVariable(var_names.soul_essence);

    let message = `${ChatColor.GOLD}Current status of ${ChatColor.GREEN}Alby Dungeon${ChatColor.GOLD}:\n`;
    const difficulty = dungeon.isActive() ?
        DifficultyHandler.get_difficulty(party.size(), dungeon.getTempVariable(var_names.extreme)) :
        DifficultyHandler.get_difficulty(-1, false); // HIDE DIFFICULTY IF DUNGEON ISN'T ACTIVE
    message += `${ChatColor.DARK_GRAY}Difficulty: ${ChatColor.RED}${difficulty}\n`;
    message += `${ChatColor.DARK_GRAY}Drop Rate: ${ChatColor.GREEN}x${drop_rate} ${ChatColor.LIGHT_PURPLE}(${DropRateHandler.get_drop_rate(drop_rate) * 100}%)\n`;
    message += `${ChatColor.DARK_GRAY}Soul Essence: ${SpecialItemHandler.soul_essence.rarity(soul_essence)}${SpecialItemHandler.soul_essence.get(soul_essence)}\n`;
    message += `${ChatColor.GOLD}Current Players:\n`;

    const enumAlive = sm.enumPlayerState("Alive");
    let alive = "";
    let dead = "";
    for (const uuid in party) {
        const status = party[uuid];
        let player_name = sm.getPlayerFromUUID(uuid) ? sm.getPlayerFromUUID(uuid).getName() : uuid;
        if (status === enumAlive) {
            alive += `${ChatColor.DARK_GRAY}- ${ChatColor.DARK_RED}${player_name}\n`;
        }
        else {
            dead += `${ChatColor.DARK_GRAY}- ${ChatColor.GRAY}${player_name} (${status})\n`;
        }
    }
    message += `${ChatColor.GREEN}ALIVE:\n${alive}\n${ChatColor.RED}DEAD:\n${dead}`;
    player.sendMessage(message);
 }
 main();