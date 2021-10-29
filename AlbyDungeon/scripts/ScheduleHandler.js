/**
 * NONE type script
 * 
 * ScheduleHandler IS TO MANAGE TASKS THAT CAN'T BE RUN
 * ASYNCHRONOUSLY (giving potion effects, placing blocks, 
 * spawning entities, etc).
 * 
 * TO IMPORT:
 *   const ScheduleHandler = load(`${sm.getScriptDirectory("AlbyDungeon")}/ScheduleHandler.js`);
 * 
 * TO USE:
 *   // OPTION ONE
 *   ScheduleHandler(() => {
 *     // YOUR CODE HERE
 *   });
 *   
 *   // OPTION TWO
 *   ScheduleHandler(test);
 *   function test() {
 *     // YOUR CODE HERE
 *   }
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return function (callback) {
        const Bukkit = Java.type("org.bukkit.Bukkit");
        const Runnable = Java.type("java.lang.Runnable");
        const task = Java.extend(Runnable, {
            run: callback
        });
        
        const scheduler = Bukkit.getScheduler();
        scheduler.runTaskLater(sm.getPlugin(), new task(), 0);
    }
}
main();