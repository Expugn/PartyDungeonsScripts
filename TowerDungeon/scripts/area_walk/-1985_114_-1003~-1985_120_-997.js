/**
 * AREAWALK type script for AREA (-1985, 114, -1003) ~ (-1985, 120, -997)
 *
 * Dodge Game - Arena Gate
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1985, 114, -1003) ~ (-1985, 120, -997)
 *
 * @param {Player}          player     SCRIPT BINDING
 * @param {ScriptManager}   sm         SCRIPT BINDING
 */
function main() {}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER ENTERS THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _enter() {
    const DodgeGame = load(`${sm.getScriptDirectory("TowerDungeon")}/DodgeGame.js`);
    DodgeGame.join(player);
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}