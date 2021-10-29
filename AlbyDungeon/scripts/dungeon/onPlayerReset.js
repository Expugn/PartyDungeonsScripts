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
    // print("onPlayerReset called");
    
    // RESET POTION EFFECTS THAT AlbyDungeon MAY APPLY
    const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
    sm.clearPotionEffect(player, 
        PotionEffectType.SPEED, 
        PotionEffectType.INCREASE_DAMAGE, 
        PotionEffectType.FIRE_RESISTANCE, 
        PotionEffectType.DAMAGE_RESISTANCE, 
        PotionEffectType.HEALTH_BOOST,
        PotionEffectType.REGENERATION,
        PotionEffectType.BLINDNESS,
        PotionEffectType.SLOW_DIGGING);
}
main();