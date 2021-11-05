/**
 * DUNGEON type script for DUNGEON AlbeyDungeon
 *
 * onPartyMemberJoin is a script that containing instructions
 * on how to start the dungeon once a party member joins.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     AlbeyDungeon
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
	const ChatColor = Java.type("org.bukkit.ChatColor");
    const VariableHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`);
    const var_names = VariableHandler.variable_names;

	if (!dungeon.getTempVariable(var_names.init)) {
        // INITIALIZE TEMP VARIABLES IF IT HASN'T BEEN DONE YET
        VariableHandler.init(dungeon);
    }

    if (dungeon.getTempVariable(var_names.start)) {
        // DUNGEON ALREADY IN PROCESS OF STARTING
        return;
    }
    dungeon.setTempVariable(var_names.start, true);

    const time_start = 5;
    dungeon.messageArea(`${ChatColor.GOLD}Albey Dungeon ${ChatColor.YELLOW}party recruitment has started.\n${ChatColor.GRAY}The dungeon will warp all party members inside in ${ChatColor.GOLD}${time_start} ${ChatColor.GRAY}minutes.`);

    // SLEEP 60,000 and try again
    var counter = 0;
    while (counter < 5) {
        java.lang.Thread.sleep(60000) // 1 minute * 5 = 5 minute total wait time
        counter++;

        if (counter < time_start) {
            const time_remaining = time_start - counter;
            dungeon.messageArea(`${ChatColor.GOLD}Albey Dungeon ${ChatColor.YELLOW}party recruitment is ongoing.\n${ChatColor.GRAY}There is ${ChatColor.GOLD}${time_remaining} ${ChatColor.GRAY}minute(s) remaining before all party members are warped inside.`);
        }
    }

    if (dungeon.getParty().size() > 0) {
        dungeon.messageArea(`${ChatColor.GRAY}Starting ${ChatColor.GOLD}Albey Dungeon${ChatColor.GRAY}...`);
        dungeon.start();

        const DifficultyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DifficultyHandler.js`);
        const party = dungeon.getParty();
        const difficulty = DifficultyHandler.get_difficulty(party.size(), dungeon.getTempVariable(var_names.impossible));
        dungeon.setTempVariable(var_names.difficulty, difficulty);
        const difficulty_message = DifficultyHandler.get_message(difficulty);
        dungeon.messageParty(`${ChatColor.GRAY}${ChatColor.ITALIC}${difficulty_message}\n${ChatColor.RESET}${ChatColor.DARK_GRAY}Difficulty: ${ChatColor.RED}${difficulty}`);

        // APPLY IMPOSSIBLE DIFFICULTY REDUCED HEALTH
        // ALSO OPEN CHEST GATES
        const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
        const DoorHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`);
        const doors = DoorHandler.init(player.getWorld());
        if (difficulty == DifficultyHandler.difficulty_names.IMPOSSIBLE) {
            reduce_party_health();
            ScheduleHandler(() => {
                doors.chest_gate_extreme_west.run_west(true);
                doors.chest_gate_impossible_west.run_west(true);
            });
        }
        else if (difficulty == DifficultyHandler.difficulty_names.EXTREME) {
            ScheduleHandler(() => {
                doors.chest_gate_extreme_west.run_west(true);
            });
        }

        // APPLY SOUL ESSENCE EFFECTS
        const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
        const soul_essence_value = dungeon.getTempVariable(var_names.soul_essence);
        if (soul_essence_value > 0) {
            switch (soul_essence_value) {
                case 1: // SPEED 1
                    give_party_potion_effect(PotionEffectType.SPEED, 0);
                    break;
                case 2: // STRENGTH 1
                    give_party_potion_effect(PotionEffectType.INCREASE_DAMAGE, 0);
                    break;
                case 3: // SPEED 2
                    give_party_potion_effect(PotionEffectType.SPEED, 1);
                    break;
                case 4: // FIRE RESIST 1
                    give_party_potion_effect(PotionEffectType.FIRE_RESISTANCE, 0);
                    break;
                case 5: // STRENGTH 2
                    give_party_potion_effect(PotionEffectType.INCREASE_DAMAGE, 1);
                    break;
                case 6: // RESISTANCE 1
                    give_party_potion_effect(PotionEffectType.DAMAGE_RESISTANCE, 0);
                    break;
                case 7: // HEALTH BOOST 1
                    give_party_potion_effect(PotionEffectType.HEALTH_BOOST, 2);
                    break;
                case 8: // REGENERATION 1
                    give_party_potion_effect(PotionEffectType.REGENERATION, 0);
                    break;
                case 9: // HEALTH BOOST 3
                    give_party_potion_effect(PotionEffectType.HEALTH_BOOST, 2);
                    break;
                case 10: // STRENGTH 3
                    give_party_potion_effect(PotionEffectType.INCREASE_DAMAGE, 2);
                    break;
            }
        }
    }
    else {
        dungeon.messageArea(`${ChatColor.GRAY}There are no party members. The pending teleport has been canceled.`);
        dungeon.resetTempVariables();
    }
}
main();

function give_party_potion_effect(potion_effect_type, amplifier) {
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
    const Integer = Java.type("java.lang.Integer");
    const enumAlive = sm.enumPlayerState("Alive");
    const party = dungeon.getParty();
    ScheduleHandler(() => {
        for (const uuid in party) {
            const status = party[uuid];
            if (status === enumAlive) {
                sm.getPlayerFromUUID(uuid).addPotionEffect(new PotionEffect(potion_effect_type, Integer.MAX_VALUE, amplifier));
            }
        }
    });
}

function reduce_party_health() {
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const enumAlive = sm.enumPlayerState("Alive");
    const party = dungeon.getParty();
    ScheduleHandler(() => {
        for (const uuid in party) {
            const status = party[uuid];
            if (status === enumAlive) {
                sm.getPlayerFromUUID(uuid).setMaxHealth(6);
            }
        }
    });
}