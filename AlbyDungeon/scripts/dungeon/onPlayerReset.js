/**
 * DUNGEON type script for DUNGEON AlbyDungeon
 *
 * onPlayerReset is a script that contains instructions on how
 * to revert a player back to their original state if the dungeon
 * has modified their health or potion effects.
 *
 * @author      CONSOLE
 * @version     0.1
 * @type        DUNGEON
 * @dungeon     AlbyDungeon
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 * @param {LoadedDungeon}   dungeon    SCRIPT BINDING
 */
function main() {
    // RESET POTION EFFECTS THAT AlbyDungeon MAY APPLY
    const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
    sm.clearPotionEffect(player,
        PotionEffectType.SPEED,                 // SOUL ESSENCE
        PotionEffectType.INCREASE_DAMAGE,       // SOUL ESSENCE
        PotionEffectType.FIRE_RESISTANCE,       // SOUL ESSENCE
        PotionEffectType.DAMAGE_RESISTANCE,     // SOUL ESSENCE
        PotionEffectType.HEALTH_BOOST,          // SOUL ESSENCE
        PotionEffectType.REGENERATION,          // SOUL ESSENCE
        PotionEffectType.BLINDNESS,             // EXTREME DIFFICULTY
        PotionEffectType.SLOW_DIGGING,          // ELDER GUARDIAN
        PotionEffectType.POISON);               // ELDER GUARDIAN POISON POOL
}
main();