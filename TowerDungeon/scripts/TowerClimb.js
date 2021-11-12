/**
 * NONE type script
 * Tower Dungeon - Tower Climb Puzzle
 * - Party members must reach the top of the room by standing on one of three barrels.
 * - One of the barrels will teleport them to the next platform while the other two will teleport them to the start.
 * - There are three barrels per platform.
 * - Players must go through 9 levels before reaching the top.
 * - The correct barrel sequence will be a randomly generated string of numbers between 1 and 3.
 * - Barrel teleportation will be handled by Walk scripts
 *
 * Grading (based on time spent):
 * - S (4 points): ~3:00
 * - A (3 points): ~4:00
 * - B (2 points): ~5:00
 * - C (1 point):  ~6:00
 *
 * @author      Expugn
 * @version     0.1
 * @type        NONE
 */
function main() {
    return (function () {
        // [x, y, z, yaw]
        const TELEPORT_LOCATIONS = {
            1:  [-2000.5, 50, -999.5, -90], // RED
            2:  [-1996.5, 55, -999.5, -90], // ORANGE
            3:  [-2002.5, 57, -999.5, 90],  // YELLOW
            4:  [-1996.5, 60, -999.5, -90], // GREEN
            5:  [-2002.5, 62, -999.5, 90],  // CYAN
            6:  [-1996.5, 65, -999.5, -90], // LIGHT BLUE
            7:  [-2002.5, 67, -999.5, 90],  // PURPLE
            8:  [-1996.5, 70, -999.5, -90], // MAGENTA
            9:  [-2002.5, 72, -999.5, 90],  // PINK
            10: [-1999.5, 77, -999.5, -90], // TOP FLOOR
        };

        return {
            check: check_answer,
            grade: get_grade,
            answer: generate_answer,
            instructions: spooky_instructions,
            comment: spooky_comment,
            locations: TELEPORT_LOCATIONS,
        }

        /**
         * Checks if the player got the correct answer and returns a teleport location for them to advance to.
         * This function returns an array where the first element is a boolean if they pass and the second element is
         * the teleport location.
         * @param {String} answer
         * @param {number} floor
         * @param {number} guess
         * @param {Location} location
         * @returns [boolean, Location] - boolean is true if answer is correct, false if not, Location is the next teleport location
         */
        function check_answer(answer, floor, guess, location) {
            const Location = Java.type("org.bukkit.Location");
            if (parseInt(answer[floor - 1]) === guess) {
                // CORRECT ANSWER, ADVANCE TO NEXT FLOOR
                const tele_loc = TELEPORT_LOCATIONS[floor + 1];
                return [true, new Location(location.getWorld(), tele_loc[0], tele_loc[1], tele_loc[2], tele_loc[3], 0)];
            }
            else {
                // WRONG ANSWER, RETURN TO FLOOR 1
                const tele_loc = TELEPORT_LOCATIONS[1];
                return [false, new Location(location.getWorld(), tele_loc[0], tele_loc[1], tele_loc[2], tele_loc[3], 0)];
            }
        }

        function generate_answer() {
            let result = [];
            for (let i = 0; i < 9; i++) {
                result.push(Math.floor(Math.random() * 3) + 1);
            }
            return result.join("");
        }

        function get_grade(time_start) {
            const time_end = Date.now();
            const time_taken = time_end - time_start;
            if (time_taken < 3 * 60 * 1000) {
                return 4;
            }
            else if (time_taken < 4 * 60 * 1000) {
                return 3;
            }
            else if (time_taken < 5 * 60 * 1000) {
                return 2;
            }
            else {
                return 1;
            }
        }

        function spooky_instructions() {
            const ChatColor = Java.type("org.bukkit.ChatColor");
            const YELLOW = `${ChatColor.YELLOW}${ChatColor.ITALIC}`;
            const GRAY = `${ChatColor.GRAY}${ChatColor.ITALIC}`;
            return `${GRAY}I love to climb! Can you guys make it to the top of this room?\n`
                + `${YELLOW}Stand on one of three barrels to teleport${GRAY}! If you guessed correctly, you will advance to the next platform.\n`
                + `${YELLOW}An incorrect guess will teleport you back down to the start, so coordinate with your party well${GRAY}!\n`
                + `${YELLOW}Speed is important${GRAY}! So do your best to make it to the top as soon as possible!`;
        }

        function spooky_comment(grade_value) {
            switch(grade_value) {
                case 4:
                    return "Bwahaha! I expected nothing less from you all!";
                case 3:
                    return "Excellent work, I hope you enjoy the view!";
                case 2:
                    return "Worked up a sweat? That's the best part about climbing!";
                case 1:
                    return "You guys could use a bit more of a workout...";
                default:
                    return "";
            }
        }
    })();
}
main();