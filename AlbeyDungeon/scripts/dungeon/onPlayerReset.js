/**
 * DUNGEON type script for DUNGEON AlbeyDungeon
 *
 * onPlayerReset is a script that contains instructions on how
 * to revert a player back to their original state if the dungeon
 * has modified their health or potion effects.
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
	// RESET POTION EFFECTS THAT AlbeyDungeon MAY APPLY
    const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
	player.setMaxHealth(20);
    sm.clearPotionEffect(player,
        PotionEffectType.SPEED,                 // SOUL ESSENCE
        PotionEffectType.INCREASE_DAMAGE,       // SOUL ESSENCE
        PotionEffectType.FIRE_RESISTANCE,       // SOUL ESSENCE
        PotionEffectType.DAMAGE_RESISTANCE,     // SOUL ESSENCE
        PotionEffectType.HEALTH_BOOST,          // SOUL ESSENCE
        PotionEffectType.REGENERATION,          // SOUL ESSENCE
        PotionEffectType.WITHER);               // BOSS GUARD WITHER SKELETON
}
main();