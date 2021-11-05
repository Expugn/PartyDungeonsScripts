/**
 * DUNGEON type script for DUNGEON AlbeyDungeon
 *
 * onEntityDeath is a script that containing instructions
 * on how to deal with entities who die in the dungeon
 * area while it is active.
 *
 * @author      CONSOLE
 * @version     0.1
 * @version     DUNGEON
 * @dungeon     AlbeyDungeon
 *
 * @param {LivingEntity}    entity     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
	if (dungeon.isCleared()) {
        // DUNGEON IS CLEARED, WE DON'T NEED TO WORRY ABOUT EntityDeath ANYMORE
        return;
    }

	const ChatColor = Java.type("org.bukkit.ChatColor");
    const DropRateHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DropRateHandler.js`);
    const BonusDropHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/BonusDropHandler.js`);
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    const EnemyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/EnemyHandler.js`);
    const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
    const doors = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DoorHandler.js`).init(entity.getWorld());
    const enemy_names = EnemyHandler.enemy_names;
    const drop_rate = DropRateHandler.get_drop_rate(dungeon.getTempVariable(var_names.drop_rate));
    const bonus_drops = BonusDropHandler.init(entity.getWorld(), dungeon.getTempVariable(var_names.drop_rate));

	if ([
        enemy_names.ROOM_ONE_GUARD,
        enemy_names.ROOM_TWO_GUARD,
        enemy_names.ROOM_THREE_GUARD,
        enemy_names.ROOM_BOSS_GUARD,
        enemy_names.ROOM_BOSS_ZOMBIE,
        enemy_names.BOSS
    ].indexOf(entity.getName()) < 0) {
        // ENEMY IS NOT PART OF THE ROOM FIGHT, IGNORE
        return;
    }

    if (entity.getName() === enemy_names.ROOM_BOSS_ZOMBIE
        && dungeon.getTempVariable(var_names.room_boss)
        && dungeon.getTempVariable(var_names.zombie_kill_count) < 50) {
        // PHASE 1: NEEDS 50 KILLS
        dungeon.setTempVariable(var_names.zombie_kill_count, dungeon.getTempVariable(var_names.zombie_kill_count) + 1);
        const kill_count = dungeon.getTempVariable(var_names.zombie_kill_count);
        if (kill_count < 50) {
            // NOT ENOUGH KILLS YET
            if (kill_count % 10 === 0) {
                dungeon.messageParty(`${ChatColor.RED}${50 - kill_count} ${ChatColor.GRAY}Zombies to go!`);
            }
            return;
        }
    }
    else if (entity.getName() === enemy_names.ROOM_BOSS_ZOMBIE) {
        // IGNORE ZOMBIE KILLS OTHERWISE
        return;
    }

	ScheduleHandler(() => {
        if (entity.getName() !== enemy_names.ROOM_BOSS_ZOMBIE) {
            // ZOMBIE CHECK OCCURED PRIOR
            const remaining_enemies = entity.getWorld().getNearbyEntities(entity.getLocation(), 100, 20, 100).stream()
            .filter(e => e !== entity && e.getName().equals(entity.getName()))
            .toList();
            if (remaining_enemies.size() > 0) {
                // THERE ARE STILL ENTITIES NAMED THE SAME AS THIS ENTITY AROUND.
                return;
            }
        }

		// HANDLE ENTITY CLEARED, THESE WILL ONLY BE CALLED ONCE THE LAST ENTITY OF THIS NAME DIES IN THE AREA
        let enemies;
        const difficulty = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DifficultyHandler.js`).difficulty_names;
        const Sound = Java.type("org.bukkit.Sound");
        const Location = Java.type("org.bukkit.Location");
        switch (entity.getName()) {
			case enemy_names.ROOM_ONE_GUARD:
				if (!dungeon.getTempVariable(var_names.room_one_clear)) {
					dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Key ${ChatColor.GRAY}was looted from the monsters.`);
                    dungeon.setTempVariable(var_names.keys, dungeon.getTempVariable(var_names.keys) + 1);
					dungeon.setTempVariable(var_names.room_one_clear, true);
					doors.room_one_west.run_west(true);
					doors.room_one_east.run_east(true);
					doors.room_one_south.run_south(true);
                    bonus_drops.room_one();
				}
				break;
			case enemy_names.ROOM_TWO_GUARD:
				if (!dungeon.getTempVariable(var_names.room_two_clear)) {
					dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Key ${ChatColor.GRAY}was looted from the monsters.`);
                    dungeon.setTempVariable(var_names.keys, dungeon.getTempVariable(var_names.keys) + 1);
					dungeon.setTempVariable(var_names.room_two_clear, true);
					doors.room_two_west.run_west(true);
                    bonus_drops.room_two();
				}
				break;
			case enemy_names.ROOM_THREE_GUARD:
				if (!dungeon.getTempVariable(var_names.room_three_clear)) {
					dungeon.messageParty(`${ChatColor.GRAY}A ${ChatColor.GOLD}Key ${ChatColor.GRAY}was looted from the monsters.`);
                    dungeon.setTempVariable(var_names.keys, dungeon.getTempVariable(var_names.keys) + 1);
					dungeon.setTempVariable(var_names.room_three_clear, true);
					doors.room_three_west.run_west(true);
                    bonus_drops.room_three();
				}
				break;
            case enemy_names.ROOM_BOSS_ZOMBIE:
                // SPAWN GUARDS
                enemies = EnemyHandler.init(entity.getWorld(), drop_rate);
                enemies.room_boss.hard();
                dungeon.messageParty(`${ChatColor.GRAY}The ${ChatColor.GOLD}Boss Guards ${ChatColor.GRAY}have arrived!`);

                // FANCY LIGHTNING SOUND EFFECTS
                entity.getWorld().playSound(new Location(entity.getWorld(), -1373, 99, -946), Sound.ENTITY_LIGHTNING_BOLT_THUNDER, 10, 1);
                break;
			case enemy_names.ROOM_BOSS_GUARD:
                // SPAWN BOSS
                enemies = EnemyHandler.init(entity.getWorld(), drop_rate);
                enemies.room_boss.hard_boss();
                dungeon.messageParty(`${ChatColor.GRAY}The ${ChatColor.GOLD}Corrupted Slime ${ChatColor.GRAY}has been summoned!`);

                // FANCY LIGHTNING SOUND EFFECTS
                entity.getWorld().playSound(new Location(entity.getWorld(), -1373, 99, -946), Sound.ENTITY_LIGHTNING_BOLT_THUNDER, 10, 1);
				break;
			case enemy_names.BOSS:
				// DUNGEON IS CLEARED
				dungeon.messageParty(`${ChatColor.GOLD}${entity.getKiller().getName()} ${ChatColor.GREEN}dealt the final blow to the ${ChatColor.GOLD}Corrupted Slime${ChatColor.GREEN}!\n${ChatColor.GRAY}The final door creaked open as the ${ChatColor.GOLD}Corrupted Slime ${ChatColor.GRAY}and its minions were defeated.`);
                doors.boss_door_north.run_north(true);
                doors.boss_door_south.run_south(true);
                doors.boss_tower_nw.run(false);
                doors.boss_tower_ne.run(false);
                doors.boss_tower_se.run(false);
                doors.boss_tower_sw.run(false);
                doors.boss_tower_lock_nw.run(false);
                doors.boss_tower_lock_ne.run(false);
                doors.boss_tower_lock_se.run(false);
                doors.boss_tower_lock_sw.run(false);
                bonus_drops.room_boss();
                dungeon.clear();

                // ADD PLAYERS TO HALL OF FAME IF IMPOSSIBLE
                if (dungeon.getTempVariable(var_names.difficulty) === difficulty.IMPOSSIBLE) {
                    const ArrayList = Java.type("java.util.ArrayList");
                    const enumAlive = sm.enumPlayerState("Alive");
                    const party = dungeon.getParty();
                    const dun = dungeon.getDungeon();
                    const dungeon_file = dun.getDungeonFile();
                    let hall_of_fame = dungeon_file.getVariable(var_names.hall_of_fame);
                    if (hall_of_fame === null) {
                        // HALL OF FAME DOES NOT EXIST, CREATE IT
                        dungeon_file.setVariable(var_names.hall_of_fame, new ArrayList());
                        hall_of_fame = dungeon_file.getVariable(var_names.hall_of_fame);
                    }
                    for (const uuid in party) {
                        const status = party[uuid];
                        if (status === enumAlive) {
                            let exists = false;
                            for (const entry of hall_of_fame) {
                                if (entry[0] === uuid) {
                                    // PLAYER ALREADY IN HALL OF FAME, UPDATE NAME
                                    entry[1] = sm.getPlayerFromUUID(uuid).getName();
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists) {
                                // PLAYER NOT IN HALL OF FAME, ADD
                                const player = sm.getPlayerFromUUID(uuid);
                                hall_of_fame.add([uuid, player.getName(), Date.now()]);
                                player.sendMessage(`${ChatColor.GREEN}You have been added to the ${ChatColor.GOLD}Hall of Fame${ChatColor.GREEN}. Congratulations!`);
                            }
                        }
                    }
                    dun.saveDungeonFile();
                }
				break;
		}
	}, 20);
}
main();