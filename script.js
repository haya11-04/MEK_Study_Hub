const programmeData = {
    electronics: {
        title: "Electronics Engineering",
        description: "Learn about circuits, programming and automation.",
        courses: ["Electrical Circuits", "Digital Technology", "Programming"]
    },

    mechanical: {
        title: "Mechanical Engineering",
        description: "Learn about mechanics, materials and machine design.",
        courses: ["Mechanics", "Materials Science", "Machine Design"]
    },

    chemical: {
        title: "Chemical Engineering",
        description: "Learn about chemistry, industrial processes and sustainability.",
        courses: ["General Chemistry", "Process Engineering", "Sustainability"]
    }
};

const programmeCards = document.querySelectorAll(".programme-card");
const intro = document.querySelector(".intro");
const programmeList = document.querySelector(".programme-list");
const courseSection = document.querySelector("#course-section");
const programmeTitle = document.querySelector("#programme-title");
const programmeDescription = document.querySelector("#programme-description");
const courseList = document.querySelector("#course-list");
const backButton = document.querySelector("#back-button");

programmeCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const selectedProgramme = card.dataset.programme;
        const data = programmeData[selectedProgramme];

        programmeTitle.textContent = data.title;
        programmeDescription.textContent = data.description;

        courseList.innerHTML = "";

        data.courses.forEach(function (course) {
            const courseButton = document.createElement("button");
            courseButton.className = "programme-card";
        courseButton.textContent = course;

courseButton.addEventListener("click", function () {
    openCourse(course, data);
});

courseList.appendChild(courseButton);
        });

        intro.classList.add("hidden");
        programmeList.classList.add("hidden");
        courseSection.classList.remove("hidden");
    });
});

backButton.addEventListener("click", function () {
    courseSection.classList.add("hidden");
    intro.classList.remove("hidden");
    programmeList.classList.remove("hidden");
});

function openCourse(course, programme) {
    programmeTitle.textContent = course;

    programmeDescription.textContent =
        `This course is part of ${programme.title}. Choose how you want to study.`;

    courseList.innerHTML = `
        <button class="programme-card" id="video-button">
            ▶ Watch learning video
        </button>

        <button class="programme-card" id="flashcard-button">
            🃏 Study flashcards
        </button>

        <button class="programme-card" id="quiz-button">
            ✅ Take quiz
        </button>
    `;

    document
        .querySelector("#flashcard-button")
        .addEventListener("click", function () {
            showFlashcard(course);
        });

    document
    .querySelector("#quiz-button")
    .addEventListener("click", function () {
        showQuiz(course);
    });
 

document
    .querySelector("#video-button")
    .addEventListener("click", function () {
        const search = encodeURIComponent(course + " beginner tutorial");
        window.open(
            "https://www.youtube.com/results?search_query=" + search,
            "_blank"
        );
    });
}

function showFlashcard(course) {
    const flashcards = {
        "Electrical Circuits": ["What is Ohm's law?", "Voltage = Current × Resistance (V = I × R)"],
        "Digital Technology": ["What is binary?", "A number system using only 0 and 1."],
        "Programming": ["What is an algorithm?", "A step-by-step method for solving a problem."],
        "Materials Science": ["What does materials science study?", "The properties and behaviour of materials."],
        "Machine Design": ["What is machine design?", "Designing mechanical components and systems."],
        "General Chemistry": ["What is an atom?", "The smallest unit of an element."],
        "Process Engineering": ["What is a process?", "A series of steps that transforms materials."],
        "Sustainability": ["What is sustainability?", "Meeting present needs without harming future generations."]
    };

    const card = flashcards[course];

    courseList.innerHTML = `
        <div class="programme-card">
            <strong>${card[0]}</strong>
        </div>

        <button class="programme-card" id="answer-button">
            Show answer
        </button>
    `;

    document
        .querySelector("#answer-button")
        .addEventListener("click", function () {
            this.textContent = card[1];
        });
}

function showQuiz(course) {
    const quizzes = {
        "Electrical Circuits": {
            question: "Which formula represents Ohm's law?",
            options: ["V = I × R", "V = I + R", "V = R − I"],
            correct: "V = I × R"
        },

        "Digital Technology": {
            question: "Which numbers are used in binary?",
            options: ["0 and 1", "1 and 2", "0 to 9"],
            correct: "0 and 1"
        },

        "Programming": {
            question: "What is an algorithm?",
            options: [
                "A step-by-step solution",
                "A computer screen",
                "A programming error"
            ],
            correct: "A step-by-step solution"
        },

        "Mechanics": {
            question: "What is force?",
            options: ["A push or pull", "A temperature", "A material"],
            correct: "A push or pull"
        },

        "Materials Science": {
            question: "What does materials science study?",
            options: [
                "Material properties",
                "Computer networks",
                "Chemical equations only"
            ],
            correct: "Material properties"
        },

        "Machine Design": {
            question: "What is created in machine design?",
            options: [
                "Mechanical components",
                "Chemical reactions",
                "Computer passwords"
            ],
            correct: "Mechanical components"
        },

        "General Chemistry": {
            question: "What is an atom?",
            options: [
                "The smallest unit of an element",
                "A type of machine",
                "A computer program"
            ],
            correct: "The smallest unit of an element"
        },

        "Process Engineering": {
            question: "What does a process do?",
            options: [
                "Transforms materials",
                "Creates passwords",
                "Measures distance only"
            ],
            correct: "Transforms materials"
        },

        "Sustainability": {
            question: "What is a goal of sustainability?",
            options: [
                "Protect future generations",
                "Use unlimited resources",
                "Increase waste"
            ],
            correct: "Protect future generations"
        }
    };

    const quiz = quizzes[course];

    courseList.innerHTML = `
        <div class="programme-card">
            <strong>${quiz.question}</strong>
        </div>

        ${quiz.options.map(function (option) {
            return `
                <button class="programme-card quiz-option">
                    ${option}
                </button>
            `;
        }).join("")}

        <p id="quiz-result"></p>
    `;

    document.querySelectorAll(".quiz-option").forEach(function (button) {
        button.addEventListener("click", function () {
            const result = document.querySelector("#quiz-result");

            if (button.textContent.trim() === quiz.correct) {
                result.textContent = "Correct! Score: 1/1 ✅";
            } else {
                result.textContent = "Incorrect. Score: 0/1 ❌";
            }
        });
    });
}     

