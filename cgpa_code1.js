document.addEventListener('DOMContentLoaded', () => {
    const semestersSubjectsData = {
        1: [
            { subname: "Matrics,Differtial and Integral Calculus", subcredit: 4.0 },
            { subname: "Engineering Graphics", subcredit: 4.0 },
            { subname: "Commutative English", subcredit: 2.0 },
            { subname: "Engineering Chemistry", subcredit: 3.0 },
            { subname: "C Programming", subcredit: 3.0 },
            { subname: "Commutative English Lab", subcredit: 1.0 },
            { subname: "Engineering Chemistry Lab", subcredit: 1.0 },
            { subname: "C Programming Lab", subcredit: 2.0 },
        ],
        2: [
            { subname: "Vector Calculus and Complex Functions", subcredit: 4.0 },
            { subname: "Engineering Physics", subcredit: 3.0 },
            { subname: "Programming for Problem Solving using Python", subcredit: 4 },
            { subname: "Basic Electrical, Electronics and Communication Engineering", subcredit: 3 },
            { subname: "Introduction to Information and Computing Technology", subcredit: 3 },
            { subname: "Constitution of India", subcredit: 0 },
            { subname: "Physics Laboratory", subcredit: 1.0 },
            { subname: "Workshop Practice", subcredit: 2.0 },
            { subname: "Basic Electrical, Electronics & Communication Engineering Lab", subcredit: 1.0 },
            { subname: "Quantitative Aptitude and Verbal Reasoning", subcredit: 1.0 },
        ],
        3: [
            { subname: "Data Structures", subcredit: 3 },
            { subname: "Digital Logic Circuits", subcredit: 4 },
            { subname: "Object Oriented Programming", subcredit: 3 },
            { subname: "Computer Architecture", subcredit: 3 },
            { subname: "Discrete Mathematics", subcredit: 3 },
            { subname: "Fundamentals of Nano Science", subcredit: 0 },
            { subname: "Heritage of Tamil", subcredit: 1 },
            { subname: "Data Structures Laboratory", subcredit: 1 },
            { subname: "Object Oriented Programming Laboratory", subcredit: 1 },
            { subname: "Quantitative Aptitude & Behavioral Skills", subcredit: 1 },
        ],
        4: [
            { subname: "Probability and Statistics", subcredit: 3 },
            { subname: "Operating system", subcredit: 3 },
            { subname: "Design and Analysis of Algorithms", subcredit: 4 },
            { subname: "Object Oriented Software Engineering", subcredit: 3 },
            { subname: "Database Management Systems", subcredit: 3 },
            { subname: "Java programming", subcredit: 3 },
            { subname: "Environmental Science and Engineering", subcredit: 0 },
            { subname: "Tamil and Technology", subcredit: 1 },
            { subname: "Operating system Laboratory", subcredit: 1 },
            { subname: "Database Management Systems Laboratory", subcredit: 1 },
            { subname: "Java Programming Laboratory", subcredit: 1 },
            { subname: "Quantitative Aptitude & Communication Skills", subcredit: 1 }
        ]
    };

    let numSemesters = 0;

    function isValidGrade(grade) {
        const validGrades = ["O", "A+", "A", "B+", "B", "C", "U"];
        return validGrades.includes(grade);
    }

    function calculateGPA(grades, semesterSubjects) {
        const gradeMapping = {
            'O': 10, 'A+': 9, 'A': 8,
            'B+': 7, 'B': 6, 'C': 5,
            'U': 0,
        };

        let totalPoints = 0;
        let totalCredits = 0;

        for (let i = 0; i < semesterSubjects.length; i++) {
            const { subcredit } = semesterSubjects[i];
            const gradeValue = gradeMapping[grades[i]];
            totalPoints += gradeValue * subcredit;
            totalCredits += subcredit;
        }

        return { totalPoints, totalCredits };
    }

   function simulateGradesInput() {
    console.log("Simulate Grades Input STARTED");

    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = "";

    numSemesters = parseInt(document.getElementById('numSemesters').value.trim());

    if (isNaN(numSemesters) || numSemesters < 1 || numSemesters > 8) {
        alert("❌ Enter a valid number of semesters (1 to 8)");
        return;
    }

    for (let semester = 1; semester <= numSemesters; semester++) {
        if (!semestersSubjectsData[semester]) {
            alert(`❌ No stored subjects for Semester ${semester}`);
            return;
        }

        const header = document.createElement('h3');
        header.textContent = `Semester ${semester}`;
        inputContainer.appendChild(header);

        semestersSubjectsData[semester].forEach(({ subname, subcredit }, i) => {
            const label = document.createElement('label');
            label.textContent = `${subname} (Credit: ${subcredit}):`;
            inputContainer.appendChild(label);

            const input = document.createElement('input');
            input.type = "text";
            input.placeholder = "Enter grade (O, A+, A, B+, B, C, U)";
            input.id = `grade${semester}_${i + 1}`;
            input.style.marginBottom = "10px";
            input.style.display = "block";
            inputContainer.appendChild(input);
        });
    }

    // 🔥 CREATE BUTTON
    const calculateButton = document.createElement("button");
    calculateButton.id = "calculateBtn";         // VERY important
    calculateButton.textContent = "Calculate CGPA";
    calculateButton.type = "button";

    calculateButton.addEventListener("click", (event) => {
        event.preventDefault();  // Should appear!
        calculateCGPA();
    });

    inputContainer.appendChild(calculateButton);
}



    function calculateCGPA() {
        const userName = document.getElementById('userName').value.trim();

        if (userName === "") {
            alert("❌ Enter your name!");
            return;
        }

        let totalCumulativePoints = 0;
        let totalCumulativeCredits = 0;
        let arrearsCount = 0;

        for (let semester = 1; semester <= numSemesters; semester++) {
            const grades = [];
            for (let i = 0; i < semestersSubjectsData[semester].length; i++) {
                const inputField = document.getElementById(`grade${semester}_${i + 1}`);
                let grade = inputField.value.trim().toUpperCase();
                if (!isValidGrade(grade)) {
                    alert(`❌ Invalid grade "${grade}" entered in Semester ${semester}.
Allowed grades: O, A+, A, B+, B, C, U`);
                    inputField.focus();
                    return;
                }
                if (grade === "U") arrearsCount++;
                grades.push(grade);
            }

            const { totalPoints, totalCredits } =
                calculateGPA(grades, semestersSubjectsData[semester]);

            totalCumulativePoints += totalPoints;
            totalCumulativeCredits += totalCredits;
        }

        const CGPA = totalCumulativePoints / totalCumulativeCredits;

        document.getElementById('output').textContent =
            `CGPA for ${userName} is: ${CGPA.toFixed(2)}`;

        fetch("http://localhost:5000/save-result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentName: userName,
                cgpa: CGPA.toFixed(2),
                arrears: arrearsCount
            })
        })
        .then(r => r.json())
        .then(d => console.log("Saved:", d))
        .catch(e => console.error(e));
    }

    document.getElementById('simulateButton')
            .addEventListener('click', simulateGradesInput);

});
