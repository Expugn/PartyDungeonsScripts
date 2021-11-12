/**
 * AREAWALK type script for AREA (-1930, 1, -1026) ~ (-1982, 0, -974)
 *
 * Dodge Game - Loser Warp
 *
 * @author      Expugn
 * @version     0.1
 * @type        AREAWALK
 * @block       (-1930, 1, -1026) ~ (-1982, 0, -974)
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
    DodgeGame.leave(player);
}

/**
 * AreaWalk SPECIAL FUNCTION: CALLED WHEN A PLAYER LEAVES THE AREA.
 * DO NOT REMOVE THIS FUNCTION.
 */
function _exit() {}