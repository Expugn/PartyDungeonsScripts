/**
 * AREAWALK type script for AREA (-1617, 39, -562) ~ (-1599, 42, -544)
 *
 * Corrupted Guardian's Poison Pool
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1617, 39, -562) ~ (-1599, 42, -544)
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
    const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
    const Integer = Java.type("java.lang.Integer");
    sm.addPotionEffect(player, Integer.MAX_VALUE, 1, PotionEffectType.POISON);
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {
    const PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
    sm.clearPotionEffect(player, PotionEffectType.POISON);
}