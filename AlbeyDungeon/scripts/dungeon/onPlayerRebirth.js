/**
 * DUNGEON type script for DUNGEON AlbeyDungeon
 *
 * onPlayerReset is a script that containing instructions
 * on how to deal with dead players trying to rejoin
 * the dungeon session they were a part of.
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

	const var_names = load(`${sm.getScriptDirectory("AlbeyDungeon")}/VariableHandler.js`).variable_names;
	const DifficultyHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/DifficultyHandler.js`);
	if (dungeon.getTempVariable(var_names.difficulty) === DifficultyHandler.difficulty_names.impossible) {
		// NO REBIRTHS IN IMPOSSIBLE DIFFICULTY
		player.sendMessage(`${ChatColor.GRAY}You can not rebirth in ${ChatColor.RED}${DifficultyHandler.difficulty_names.impossible} ${ChatColor.GRAY}mode.`);
		return;
	}
    const price = 300;
    if (!sm.withdrawMoney(player, price)) {
        // TRANSACTION FAILED
        player.sendMessage(`${ChatColor.GRAY}You do not have enough money. You need $${ChatColor.GOLD}${price} ${ChatColor.GRAY}to rebirth.`);
        return;
    }

    // TRANSACTION SUCCESSFUL
    const dungeon_file = dungeon.getDungeon().getDungeonFile();
    const cash_money = dungeon_file.getVariable(var_names.cash_money);
    dungeon_file.setVariable(var_names.cash_money, cash_money ? cash_money + price : price);
    dungeon_file.saveJSON(dungeon.getDungeon().getName());

    // REBIRTH PLAYER
    const ScheduleHandler = load(`${sm.getScriptDirectory("AlbeyDungeon")}/ScheduleHandler.js`);
    ScheduleHandler(() => {
        // TELEPORT PLAYER TO START POSITON AND MARK THEM AS ALIVE
        player.teleport(dungeon.getDungeon().getDungeonFile().getStartLocation());
        dungeon.modifyPlayerState(player, sm.enumPlayerState("Alive"));
        dungeon.messageParty(`${ChatColor.GOLD}${player.getName()} ${ChatColor.GRAY}has been reborn.`);

        // APPLY SOUL ESSENCE EFFECTS
        const PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
        const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
        const Integer = Java.type("java.lang.Integer");
        const soul_essence_value = dungeon.getTempVariable(var_names.soul_essence);
        if (soul_essence_value > 0) {
            switch (soul_essence_value) {
                case 1: // SPEED 1
                    player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 0));
                    break;
                case 2: // STRENGTH 1
                    player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, Integer.MAX_VALUE, 0));
                    break;
                case 3: // SPEED 2
                    player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, Integer.MAX_VALUE, 1));
                    break;
                case 4: // FIRE RESIST 1
                    player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, Integer.MAX_VALUE, 0));
                    break;
                case 5: // STRENGTH 2
                    player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, Integer.MAX_VALUE, 1));
                    break;
                case 6: // RESISTANCE 1
                    player.addPotionEffect(new PotionEffect(PotionEffectType.DAMAGE_RESISTANCE, Integer.MAX_VALUE, 0));
                    break;
                case 7: // HEALTH BOOST 1
                    player.addPotionEffect(new PotionEffect(PotionEffectType.HEALTH_BOOST, Integer.MAX_VALUE, 2));
                    break;
                case 8: // REGENERATION 1
                    player.addPotionEffect(new PotionEffect(PotionEffectType.REGENERATION, Integer.MAX_VALUE, 0));
                    break;
                case 9: // HEALTH BOOST 3
                    player.addPotionEffect(new PotionEffect(PotionEffectType.HEALTH_BOOST, Integer.MAX_VALUE, 2));
                    break;
                case 10: // STRENGTH 3
                    player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, Integer.MAX_VALUE, 2));
                    break;
            }
        }
    });
}
main();