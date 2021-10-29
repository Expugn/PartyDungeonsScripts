/**
 * NONE type script
 * 
 * HANDLES DROP RATE INFORMATION FOR AlbyDungeon (drop rate values).
 * 
 * TO IMPORT:
 *   const DropRateHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/DropRateHandler.js`);
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        const DROP_RATE = {
            UNKNOWN: 0,
            x1: 0.025,
            x2: 0.05,
            x3: 0.075,
            x4: 0.1,
        }

        function get_drop_rate(multiplier) {
            switch (multiplier) {
                case 1:
                    return DROP_RATE.x1;
                case 2:
                    return DROP_RATE.x2;
                case 3:
                    return DROP_RATE.x3;
                case 4:
                    return DROP_RATE.x4;
                default:
                    return DROP_RATE.UNKNOWN;
            }
        }

        return {
            drop_rate: DROP_RATE,
            get_drop_rate: get_drop_rate
        };
    })();
}
main();