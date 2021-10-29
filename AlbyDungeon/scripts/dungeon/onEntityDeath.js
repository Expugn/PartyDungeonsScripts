/**
 * DUNGEON type script for DUNGEON AlbyDungeon
 * 
 * onEntityDeath is a script containing instructions
 * on how to deal with entities who die in the dungeon
 * area while it is active.
 *
 * @author      CONSOLE
 * @version     0.1
 * @type        DUNGEON
 * @dungeon     AlbyDungeon
 *
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 * @param {LivingEntity}    entity     SCRIPT BINDING
 */
function main() {
    if (dungeon.isCleared()) {
        // DUNGEON IS CLEARED, WE DON'T NEED TO WORRY ABOUT EntityDeath ANYMORE
        return;
    }

    // print(`onEntityDeath called, rip ${entity.getName()} ${death_count}`);

    const ChatColor = Java.type("org.bukkit.ChatColor");
    const DropRateHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DropRateHandler.js`);
    const BonusDropHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/BonusDropHandler.js`);
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
    const EnemyHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/EnemyHandler.js`);
    const var_names = load(`${sm.getScriptDirectory("AlbyDungeon")}/VariableHandler.js`).variable_names;
    const doors = load(`${sm.getScriptDirectory("AlbyDungeon")}/DoorHandler.js`).init(entity.getWorld());
    const enemy_names = EnemyHandler.enemy_names;
    const drop_rate = DropRateHandler.get_drop_rate(dungeon.getTempVariable(var_names.drop_rate));
    const bonus_drops = BonusDropHandler.init(entity.getWorld(), dungeon.getTempVariable(var_names.drop_rate));

    const var_name = `${entity.getName()}_killed`;
    let death_count = dungeon.getTempVariable(var_name);
    death_count = (death_count !== null) ? death_count + 1 : 1;
    dungeon.setTempVariable(var_name, death_count);

    // HANDLE STUFF HERE
    switch (entity.getName()) {
        case enemy_names.ROOM_ONE_GUARD:
            if (death_count >= 8 && !dungeon.getTempVariable(var_names.key_one)) {
                dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Key ${ChatColor.GRAY}was looted from the monsters in ${ChatColor.GOLD}Room One${ChatColor.GRAY}.`);
                dungeon.setTempVariable(var_names.key_one, true);
                ScheduleHandler(() => {
                    doors.room_one_south.run_south(true);
                    doors.room_one_west.run_west(true);
                    doors.room_one_north.run_north(true);
                    bonus_drops.room_one();
                });
            }
            break;
        case enemy_names.ROOM_TWO_GUARD:
            if (death_count >= 8 && !dungeon.getTempVariable(var_names.key_two)) {
                dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Key ${ChatColor.GRAY}was looted from the monsters in ${ChatColor.GOLD}Room Two${ChatColor.GRAY}.`);
                dungeon.setTempVariable(var_names.key_two, true);
                ScheduleHandler(() => {
                    doors.room_two_west.run_west(true);
                    doors.room_two_north.run_north(true);
                    bonus_drops.room_two();
                });
            }
            break;
        case enemy_names.ROOM_THREE_GUARD:
            if (death_count >= 8 && !dungeon.getTempVariable(var_names.key_three)) {
                dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Key ${ChatColor.GRAY}was looted from the monsters in ${ChatColor.GOLD}Room Three${ChatColor.GRAY}.`);
                dungeon.setTempVariable(var_names.key_three, true);
                ScheduleHandler(() => {
                    doors.room_three_east.run_east(true);
                    doors.room_three_south.run_south(true);
                    doors.room_three_west.run_west(true);
                    bonus_drops.room_three();
                });
            }
            break;
        case enemy_names.ROOM_FOUR_GUARD:
            if (death_count >= 16) {
                // OPEN DOOR, GET KEY
                dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Boss Key ${ChatColor.GRAY}was looted from the monsters in ${ChatColor.GOLD}Room Four${ChatColor.GRAY}.`);
                dungeon.setTempVariable(var_names.key_boss, true);
                ScheduleHandler(() => {
                    doors.room_four_north.run_north(true);
                    bonus_drops.room_four();
                });
            }
            else if (death_count === 8) {
                // SPAWN REINFORCEMENTS
                ScheduleHandler(() => {
                    const enemies = EnemyHandler.init(entity.getWorld(), drop_rate);
                    const difficulty = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`).difficulty_names;
                    switch (dungeon.getTempVariable(var_names.difficulty)) {
                        case difficulty.NORMAL:
                            enemies.room_four.normal_reinforcements();
                            break;
                        case difficulty.HARD:
                            enemies.room_four.hard_reinforcements();
                            break;
                        case difficulty.EXTREME:
                            enemies.room_four.extreme_reinforcements();
                            break;
                        default:
                            enemies.room_four.easy_reinforcements();
                            break;
                    }
                    dungeon.messageParty(`${ChatColor.GOLD}Reinforcements ${ChatColor.GRAY}have been summoned.`);
                });
            }
            break;
        case enemy_names.ROOM_BOSS_GUARD:
            if (death_count >= 10) {
                // SPAWN BOSS
                ScheduleHandler(() => {
                    const enemies = EnemyHandler.init(entity.getWorld(), drop_rate);
                    const difficulty = load(`${sm.getScriptDirectory("AlbyDungeon")}/DifficultyHandler.js`).difficulty_names;
                    switch (dungeon.getTempVariable(var_names.difficulty)) {
                        case difficulty.NORMAL:
                            enemies.room_boss.normal_boss();
                            break;
                        case difficulty.HARD:
                            enemies.room_boss.hard_boss();
                            break;
                        case difficulty.EXTREME:
                            enemies.room_boss.extreme_boss();
                            break;
                        default:
                            enemies.room_boss.easy_boss();
                            break;
                    }
                    dungeon.messageParty(`${ChatColor.GRAY}The ${ChatColor.GOLD}Elder Guardian ${ChatColor.GRAY}has been summoned!`);

                    // FANCY LIGHTNING SOUND EFFECTS
                    const Sound = Java.type("org.bukkit.Sound");
                    const Location = Java.type("org.bukkit.Location");
                    entity.getWorld().playSound(new Location(entity.getWorld(), -1608, 43, -553), Sound.ENTITY_LIGHTNING_BOLT_THUNDER, 10, 1);
                });
            }
            break;
        case enemy_names.BOSS:
            // DUNGEON IS CLEARED
            entity.getKiller()
            dungeon.messageParty(`${ChatColor.GOLD}${entity.getKiller().getName()} ${ChatColor.GREEN}dealt the final blow to the ${ChatColor.GOLD}Corrupted Guardian${ChatColor.GREEN}!\n${ChatColor.GRAY}The final door creaked open as the ${ChatColor.GOLD}Corrupted Guardian ${ChatColor.GRAY}and its minions were defeated.`);
            ScheduleHandler(() => {
                doors.boss_door_east.run_east(true);
                doors.boss_door_west.run_west(true);
                bonus_drops.room_boss();
            });
            dungeon.clear();
            break;
    }
}
main();