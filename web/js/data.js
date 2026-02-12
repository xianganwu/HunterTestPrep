/**
 * HunterTestPrep Question Data
 * Contains all questions organized by category
 */

const QuestionData = {
    reading: {
        name: "Reading Comprehension",
        passages: [
            {
                id: "passage-1",
                title: "The Underground Library",
                text: `In 1970, a group of teenagers in New York City discovered something remarkable beneath the streets of the Lower East Side. While exploring an abandoned subway tunnel, they stumbled upon thousands of books stacked against damp walls, their pages yellowed but still readable. The collection, they later learned, had been assembled over decades by a man named Theodore Crane, a former librarian who had lost his job during the Great Depression.

Unable to bear the thought of books being destroyed, Crane had spent forty years rescuing volumes destined for incinerators and garbage trucks. He transported them by wheelbarrow and shopping cart to his underground sanctuary, organizing them by subject with handwritten cards tucked into each spine. There were novels in twelve languages, scientific treatises from the 1800s, and first editions of poetry collections that scholars had believed were lost.

Crane had died in 1965, five years before the teenagers' discovery. His underground library, containing an estimated 40,000 books, had remained untouched, protected by the constant cool temperature of the tunnel. When news of the find spread, the city faced a dilemma: the books were too valuable to ignore but too numerous to easily relocate. A preservation team spent three years cataloging and carefully moving the collection to the New York Public Library, where a special wing now bears Crane's name.

Today, visitors can see a recreation of Crane's tunnel library, complete with the original shelving he built from discarded wooden crates. The exhibit serves as a reminder that preservation often depends not on institutions with vast resources, but on individuals with stubborn devotion to what they love.`,
                questions: [
                    {
                        id: "r1",
                        text: 'The word "sanctuary" in the passage most nearly means',
                        options: [
                            { label: "A", text: "a place of religious worship" },
                            { label: "B", text: "a protected refuge" },
                            { label: "C", text: "a government building" },
                            { label: "D", text: "a temporary shelter" },
                            { label: "E", text: "an illegal hideout" }
                        ],
                        correct: "B",
                        explanation: 'In context, "sanctuary" refers to Crane\'s underground space where he kept books safe from destruction. While "sanctuary" can mean a religious place (A), here it means a protected refuge or safe haven.'
                    },
                    {
                        id: "r2",
                        text: "According to the passage, Theodore Crane began collecting books because he",
                        options: [
                            { label: "A", text: "wanted to start his own library business" },
                            { label: "B", text: "could not afford to buy new books" },
                            { label: "C", text: "wanted to prevent books from being destroyed" },
                            { label: "D", text: "was conducting research on rare volumes" },
                            { label: "E", text: "needed a hobby after losing his job" }
                        ],
                        correct: "C",
                        explanation: 'The passage states that Crane was "Unable to bear the thought of books being destroyed" and "spent forty years rescuing volumes destined for incinerators and garbage trucks." This directly indicates his motivation was preservation.'
                    },
                    {
                        id: "r3",
                        text: "The passage suggests that the books remained in good condition primarily because",
                        options: [
                            { label: "A", text: "Crane had treated them with special chemicals" },
                            { label: "B", text: "the teenagers protected them after discovery" },
                            { label: "C", text: "the tunnel's temperature helped preserve them" },
                            { label: "D", text: "the city had secretly maintained the collection" },
                            { label: "E", text: "the books were stored in waterproof containers" }
                        ],
                        correct: "C",
                        explanation: 'The passage states the books "remained untouched, protected by the constant cool temperature of the tunnel."'
                    },
                    {
                        id: "r4",
                        text: "The author's attitude toward Theodore Crane can best be described as",
                        options: [
                            { label: "A", text: "critical and dismissive" },
                            { label: "B", text: "neutral and detached" },
                            { label: "C", text: "admiring and respectful" },
                            { label: "D", text: "confused and uncertain" },
                            { label: "E", text: "amused and entertained" }
                        ],
                        correct: "C",
                        explanation: 'The passage portrays Crane positively, describing his "stubborn devotion" and noting that a library wing "bears Crane\'s name." This tone is admiring and respectful.'
                    },
                    {
                        id: "r5",
                        text: "The final paragraph primarily serves to",
                        options: [
                            { label: "A", text: "describe the current location of all the books" },
                            { label: "B", text: "explain how Crane built his shelving system" },
                            { label: "C", text: "criticize institutions for not helping Crane earlier" },
                            { label: "D", text: "emphasize the broader significance of Crane's efforts" },
                            { label: "E", text: "provide directions to the exhibit for visitors" }
                        ],
                        correct: "D",
                        explanation: 'The final paragraph states the exhibit "serves as a reminder that preservation often depends not on institutions with vast resources, but on individuals with stubborn devotion." This emphasizes the larger meaning of Crane\'s work.'
                    }
                ]
            },
            {
                id: "passage-2",
                title: "The Migrations",
                text: `Twice each year, the Arctic tern embarks on a journey that defies human imagination. This small seabird, weighing barely four ounces, travels from its Arctic breeding grounds to the Antarctic and back again—a round trip of approximately 44,000 miles. Over its lifetime of 30 years, a single tern may fly the equivalent distance of three trips to the moon and back.

Scientists long wondered how these birds navigate such vast distances with such precision. Recent research has revealed that Arctic terns possess multiple navigation systems working in concert. They can detect Earth's magnetic field, essentially carrying an internal compass. They also use the position of the sun and stars, the patterns of polarized light in the sky, and even their sense of smell to recognize familiar coastlines.

Perhaps most remarkably, Arctic terns do not simply fly the shortest route between poles. Instead, they follow a winding path that takes advantage of prevailing winds, effectively "surfing" air currents to conserve energy. A tern flying from Greenland to Antarctica might first head east toward Europe, then south along the African coast, before finally crossing to South America and continuing to Antarctica.

This indirect route, while longer in distance, actually requires less effort than fighting against headwinds on a direct path. The terns have evolved over millions of years to find the most efficient journey, not the shortest one—a distinction that human travelers, with our obsession with straight lines and speed, often fail to appreciate.`,
                questions: [
                    {
                        id: "r6",
                        text: 'The phrase "defies human imagination" suggests that the tern\'s journey is',
                        options: [
                            { label: "A", text: "impossible for scientists to study" },
                            { label: "B", text: "beyond what humans can easily comprehend" },
                            { label: "C", text: "guided by supernatural forces" },
                            { label: "D", text: "frequently exaggerated in reports" },
                            { label: "E", text: "only recently discovered" }
                        ],
                        correct: "B",
                        explanation: '"Defies human imagination" means the journey is so extraordinary that it\'s difficult for humans to fully grasp or believe.'
                    },
                    {
                        id: "r7",
                        text: "According to the passage, Arctic terns navigate using all of the following EXCEPT",
                        options: [
                            { label: "A", text: "Earth's magnetic field" },
                            { label: "B", text: "the position of celestial bodies" },
                            { label: "C", text: "patterns of light in the sky" },
                            { label: "D", text: "echolocation signals" },
                            { label: "E", text: "recognition of familiar smells" }
                        ],
                        correct: "D",
                        explanation: 'The passage lists magnetic field detection, sun and star positions, polarized light patterns, and smell. Echolocation is never mentioned.'
                    },
                    {
                        id: "r8",
                        text: "The passage indicates that Arctic terns follow an indirect route primarily because it",
                        options: [
                            { label: "A", text: "allows them to find more food along the way" },
                            { label: "B", text: "helps them avoid predators in certain regions" },
                            { label: "C", text: "enables them to use wind patterns to save energy" },
                            { label: "D", text: "gives younger birds time to build strength" },
                            { label: "E", text: "follows the paths established by their ancestors" }
                        ],
                        correct: "C",
                        explanation: 'The passage explains that terns "follow a winding path that takes advantage of prevailing winds" and that this "requires less effort than fighting against headwinds."'
                    },
                    {
                        id: "r9",
                        text: 'In the passage, "surfing" is used to describe how terns',
                        options: [
                            { label: "A", text: "dive into ocean waves to catch fish" },
                            { label: "B", text: "ride air currents to reduce effort" },
                            { label: "C", text: "compete with other birds for resources" },
                            { label: "D", text: "play during breaks in their journey" },
                            { label: "E", text: "teach flying techniques to their young" }
                        ],
                        correct: "B",
                        explanation: 'The passage uses "surfing" metaphorically to describe how terns ride "air currents to conserve energy," similar to how a surfer rides waves.'
                    },
                    {
                        id: "r10",
                        text: 'The author mentions "our obsession with straight lines and speed" in order to',
                        options: [
                            { label: "A", text: "criticize modern transportation systems" },
                            { label: "B", text: "suggest humans should travel more like birds" },
                            { label: "C", text: "contrast human thinking with the terns' evolved wisdom" },
                            { label: "D", text: "argue that direct routes are always inefficient" },
                            { label: "E", text: "explain why humans cannot migrate like birds" }
                        ],
                        correct: "C",
                        explanation: 'The author uses this phrase to highlight how humans value directness and speed, while terns have evolved to value efficiency—even if it means longer routes. This contrast illuminates the terns\' wisdom.'
                    }
                ]
            }
        ]
    },

    math: {
        name: "Mathematics",
        questions: [
            {
                id: "m1",
                text: "If 3/4 of a number is 18, what is the number?",
                options: [
                    { label: "A", text: "13.5" },
                    { label: "B", text: "22" },
                    { label: "C", text: "24" },
                    { label: "D", text: "27" },
                    { label: "E", text: "72" }
                ],
                correct: "C",
                explanation: "If 3/4 of x = 18, then x = 18 × (4/3) = 72/3 = 24"
            },
            {
                id: "m2",
                text: "A rectangle has a length of 12 cm and a width of 8 cm. What is the perimeter?",
                options: [
                    { label: "A", text: "20 cm" },
                    { label: "B", text: "40 cm" },
                    { label: "C", text: "96 cm" },
                    { label: "D", text: "160 cm" },
                    { label: "E", text: "192 cm" }
                ],
                correct: "B",
                explanation: "Perimeter = 2(length + width) = 2(12 + 8) = 2(20) = 40 cm"
            },
            {
                id: "m3",
                text: "What is the value of 2.5 + 3.75 - 1.25?",
                options: [
                    { label: "A", text: "4.0" },
                    { label: "B", text: "4.5" },
                    { label: "C", text: "5.0" },
                    { label: "D", text: "5.5" },
                    { label: "E", text: "6.0" }
                ],
                correct: "C",
                explanation: "2.5 + 3.75 = 6.25, then 6.25 - 1.25 = 5.0"
            },
            {
                id: "m4",
                text: "If a train travels at 60 miles per hour, how far will it travel in 2 hours and 30 minutes?",
                options: [
                    { label: "A", text: "120 miles" },
                    { label: "B", text: "130 miles" },
                    { label: "C", text: "140 miles" },
                    { label: "D", text: "150 miles" },
                    { label: "E", text: "180 miles" }
                ],
                correct: "D",
                explanation: "2 hours 30 minutes = 2.5 hours. Distance = 60 × 2.5 = 150 miles"
            },
            {
                id: "m5",
                text: "What is 15% of 80?",
                options: [
                    { label: "A", text: "8" },
                    { label: "B", text: "12" },
                    { label: "C", text: "15" },
                    { label: "D", text: "65" },
                    { label: "E", text: "95" }
                ],
                correct: "B",
                explanation: "15% of 80 = 0.15 × 80 = 12. Alternative: 10% = 8, 5% = 4, so 15% = 12"
            },
            {
                id: "m6",
                text: "The average of four numbers is 15. If three of the numbers are 12, 14, and 18, what is the fourth number?",
                options: [
                    { label: "A", text: "13" },
                    { label: "B", text: "15" },
                    { label: "C", text: "16" },
                    { label: "D", text: "17" },
                    { label: "E", text: "20" }
                ],
                correct: "C",
                explanation: "Sum = 4 × 15 = 60. Fourth number = 60 - (12 + 14 + 18) = 60 - 44 = 16"
            },
            {
                id: "m7",
                text: "A bag contains 4 red marbles, 6 blue marbles, and 5 green marbles. What is the probability of drawing a blue marble?",
                options: [
                    { label: "A", text: "1/15" },
                    { label: "B", text: "2/15" },
                    { label: "C", text: "1/5" },
                    { label: "D", text: "2/5" },
                    { label: "E", text: "6/15" }
                ],
                correct: "D",
                explanation: "Total marbles = 15. P(blue) = 6/15 = 2/5"
            },
            {
                id: "m8",
                text: "What is the value of (-3) × (-4) + (-2)?",
                options: [
                    { label: "A", text: "-14" },
                    { label: "B", text: "-10" },
                    { label: "C", text: "10" },
                    { label: "D", text: "14" },
                    { label: "E", text: "22" }
                ],
                correct: "C",
                explanation: "(-3) × (-4) = 12, then 12 + (-2) = 10"
            },
            {
                id: "m9",
                text: "A square has an area of 64 square inches. What is the length of one side?",
                options: [
                    { label: "A", text: "4 inches" },
                    { label: "B", text: "8 inches" },
                    { label: "C", text: "16 inches" },
                    { label: "D", text: "32 inches" },
                    { label: "E", text: "64 inches" }
                ],
                correct: "B",
                explanation: "If area = side², then side = √64 = 8 inches"
            },
            {
                id: "m10",
                text: "If x = 5, what is the value of 3x² - 2x + 1?",
                options: [
                    { label: "A", text: "56" },
                    { label: "B", text: "64" },
                    { label: "C", text: "66" },
                    { label: "D", text: "74" },
                    { label: "E", text: "76" }
                ],
                correct: "C",
                explanation: "3(5)² - 2(5) + 1 = 3(25) - 10 + 1 = 75 - 10 + 1 = 66"
            },
            {
                id: "m11",
                text: "What is 3/8 expressed as a decimal?",
                options: [
                    { label: "A", text: "0.35" },
                    { label: "B", text: "0.375" },
                    { label: "C", text: "0.38" },
                    { label: "D", text: "0.4" },
                    { label: "E", text: "0.425" }
                ],
                correct: "B",
                explanation: "3 ÷ 8 = 0.375"
            },
            {
                id: "m12",
                text: "The ratio of boys to girls in a class is 3:4. If there are 28 students, how many are boys?",
                options: [
                    { label: "A", text: "9" },
                    { label: "B", text: "12" },
                    { label: "C", text: "14" },
                    { label: "D", text: "16" },
                    { label: "E", text: "21" }
                ],
                correct: "B",
                explanation: "Total parts = 7. Each part = 28 ÷ 7 = 4. Boys = 3 × 4 = 12"
            },
            {
                id: "m13",
                text: "A circle has a diameter of 14 cm. What is its circumference? (Use π = 22/7)",
                options: [
                    { label: "A", text: "22 cm" },
                    { label: "B", text: "44 cm" },
                    { label: "C", text: "88 cm" },
                    { label: "D", text: "154 cm" },
                    { label: "E", text: "308 cm" }
                ],
                correct: "B",
                explanation: "C = πd = (22/7) × 14 = 44 cm"
            },
            {
                id: "m14",
                text: "If 2n + 7 = 19, what is the value of n?",
                options: [
                    { label: "A", text: "4" },
                    { label: "B", text: "5" },
                    { label: "C", text: "6" },
                    { label: "D", text: "7" },
                    { label: "E", text: "12" }
                ],
                correct: "C",
                explanation: "2n = 19 - 7 = 12, so n = 6"
            },
            {
                id: "m15",
                text: "A rectangular prism has dimensions 4 cm × 5 cm × 6 cm. What is its volume?",
                options: [
                    { label: "A", text: "15 cubic cm" },
                    { label: "B", text: "60 cubic cm" },
                    { label: "C", text: "74 cubic cm" },
                    { label: "D", text: "120 cubic cm" },
                    { label: "E", text: "148 cubic cm" }
                ],
                correct: "D",
                explanation: "Volume = 4 × 5 × 6 = 120 cubic cm"
            }
        ]
    },

    quantitative: {
        name: "Quantitative Reasoning",
        questions: [
            {
                id: "q1",
                text: "Compare: Column A: 3/5 | Column B: 0.59",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "A",
                explanation: "3/5 = 0.60, and 0.60 > 0.59, so Column A is greater."
            },
            {
                id: "q2",
                text: "Compare: Column A: 25% of 80 | Column B: 80% of 25",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "C",
                explanation: "25% of 80 = 20, and 80% of 25 = 20. Both equal 20."
            },
            {
                id: "q3",
                text: "x is a positive integer. Compare: Column A: x² | Column B: x³",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "D",
                explanation: "If x=1: equal. If x=2: B is greater (4 vs 8). Since the relationship varies, it cannot be determined."
            },
            {
                id: "q4",
                text: "Compare: Column A: Minutes in 2 hours | Column B: Seconds in 2 minutes",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "C",
                explanation: "2 hours = 120 minutes. 2 minutes = 120 seconds. Both equal 120."
            },
            {
                id: "q5",
                text: "a and b are both negative. Compare: Column A: a + b | Column B: a × b",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "B",
                explanation: "Negative + negative = negative. Negative × negative = positive. Positive > negative, so B is greater."
            },
            {
                id: "q6",
                text: "What is the next number: 1, 4, 9, 16, 25, ___?",
                type: "pattern",
                options: [
                    { label: "A", text: "30" },
                    { label: "B", text: "34" },
                    { label: "C", text: "36" },
                    { label: "D", text: "40" },
                    { label: "E", text: "49" }
                ],
                correct: "C",
                explanation: "These are perfect squares: 1², 2², 3², 4², 5²... Next: 6² = 36"
            },
            {
                id: "q7",
                text: "What is the next number: 3, 6, 12, 24, 48, ___?",
                type: "pattern",
                options: [
                    { label: "A", text: "60" },
                    { label: "B", text: "72" },
                    { label: "C", text: "84" },
                    { label: "D", text: "96" },
                    { label: "E", text: "120" }
                ],
                correct: "D",
                explanation: "Each number is doubled: 48 × 2 = 96"
            },
            {
                id: "q8",
                text: "If all Bloops are Razzies and all Razzies are Lazzies, which must be true?",
                type: "logic",
                options: [
                    { label: "A", text: "All Lazzies are Bloops" },
                    { label: "B", text: "All Razzies are Bloops" },
                    { label: "C", text: "All Bloops are Lazzies" },
                    { label: "D", text: "Some Lazzies are Razzies" },
                    { label: "E", text: "No Bloops are Lazzies" }
                ],
                correct: "C",
                explanation: "If Bloops → Razzies → Lazzies, then all Bloops are Lazzies (transitive property)."
            },
            {
                id: "q9",
                text: "Compare: Column A: (-5)² | Column B: -(5²)",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "A",
                explanation: "(-5)² = 25 (squaring removes the negative). -(5²) = -25. 25 > -25"
            },
            {
                id: "q10",
                text: "Compare: Column A: √49 + √16 | Column B: √(49 + 16)",
                type: "comparison",
                options: [
                    { label: "A", text: "Column A is greater" },
                    { label: "B", text: "Column B is greater" },
                    { label: "C", text: "The quantities are equal" },
                    { label: "D", text: "Cannot be determined" }
                ],
                correct: "A",
                explanation: "√49 + √16 = 7 + 4 = 11. √65 ≈ 8.06. 11 > 8.06"
            },
            {
                id: "q11",
                text: "In the sequence 2, 6, 18, 54, ..., what is the next number?",
                type: "pattern",
                options: [
                    { label: "A", text: "72" },
                    { label: "B", text: "108" },
                    { label: "C", text: "162" },
                    { label: "D", text: "216" },
                    { label: "E", text: "324" }
                ],
                correct: "C",
                explanation: "Each number is multiplied by 3: 54 × 3 = 162"
            },
            {
                id: "q12",
                text: "The sum of three consecutive even integers is 48. What is the largest?",
                type: "logic",
                options: [
                    { label: "A", text: "14" },
                    { label: "B", text: "16" },
                    { label: "C", text: "18" },
                    { label: "D", text: "20" },
                    { label: "E", text: "22" }
                ],
                correct: "C",
                explanation: "Let integers be n, n+2, n+4. Sum: 3n + 6 = 48, so n = 14. Largest: 14 + 4 = 18"
            }
        ]
    },

    writing: {
        name: "Writing Practice",
        prompts: [
            {
                id: "w1",
                title: "Family",
                text: `Being part of a family means something different to everyone. "Family" is something that we each describe and define differently; it is a collection of various people in our lives. For some, "family" refers to those people who are a part of their household; for others, "family" stretches to include members of their community.

**Write an essay or tell a true story that captures what "family" means to you.**

Your writing should:
- Define and describe what "family" means to you
- Use sensory detail to create a vivid image of the meaning of "family"
- Convey the significance of "family" in your life`,
                sampleResponse: `Every Saturday morning begins the same way in our apartment: with the sound of my father's slippers shuffling across the kitchen floor at 6:15 AM. I am not awake, not really, but somewhere between sleep and waking I register this sound—that distinctive slide-step rhythm that means the weekend has begun...

[Continue with a full essay about family traditions, sounds of home, and what family means to the writer.]`
            },
            {
                id: "w2",
                title: "A Place in New York",
                text: `New York City is a place of countless neighborhoods, parks, buildings, and hidden corners. Some places become special to us—a quiet bench in a park, a busy corner, a library reading room, or a spot where we watch the city go by.

**Describe a place in New York City that is meaningful to you and explain why.**

Your writing should:
- Use descriptive language to bring the place to life
- Explain your personal connection to this place
- Show, rather than just tell, why this place matters to you`,
                sampleResponse: `The third floor reading room of the Jefferson Market Library smells of old paper and possibility. I discovered this place by accident three years ago, ducking in to escape a summer rainstorm...`
            },
            {
                id: "w3",
                title: "A Challenging Moment",
                text: `Growing up often involves facing challenges—moments when we must push past difficulties, overcome fears, or deal with unexpected problems. These experiences can teach us important lessons about ourselves.

**Write about a time when you faced a challenge and what you learned from the experience.**

Your writing should:
- Describe the challenge clearly
- Include specific details about your thoughts, feelings, and actions
- Reflect on how this experience changed or shaped you`,
                sampleResponse: `The basketball tryout was on Friday, and I was ready. But then Ms. Chen posted the dates for the spring musical auditions. Same day. Same time...`
            },
            {
                id: "w4",
                title: "An Object That Tells a Story",
                text: `Many of us hold onto objects that others might consider worthless—a worn stuffed animal, a crumpled letter, a rock from a beach. These items become important not for what they're worth, but for what they represent.

**Write about an object you've kept and why it matters to you.**

Your writing should:
- Describe the object so readers can picture it clearly
- Tell the story of how you came to have it
- Explain what this object represents in your life`,
                sampleResponse: `The chess piece sits on my desk: a white knight, carved from marble, missing one ear from a fall years ago...`
            },
            {
                id: "w5",
                title: "A Person Who Influenced You",
                text: `Throughout our lives, we encounter people who shape who we are—teachers, family members, friends, or even strangers who pass through briefly but leave a lasting impression.

**Write about a person who has had a significant influence on your life.**

Your writing should:
- Describe this person vividly
- Explain how they influenced you through specific examples
- Reflect on why their influence matters`,
                sampleResponse: `Mr. Davidson didn't look like other teachers. He wore mismatched socks on purpose, he claimed, because "paying attention to small things that don't matter is a waste of attention better spent elsewhere"...`
            }
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionData;
}
