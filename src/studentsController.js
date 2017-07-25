const readlineSync = require('readline-sync');
const StudentModule = require('./student');

class StudentsController {

    addStudent(parms) {
        const normalResponse = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交\n：`;
        const errorResponse = `请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：\n`;
        const response = parms.displayErrorMessage ? errorResponse : normalResponse;

        const studentInfo = readlineSync.question(response);
        if (StudentModule.Student.validateStudentString(studentInfo)) {
            this.dispatcher.dispatch({
                route: '/students/create',
                parms: studentInfo
            });
        } else {
            this.dispatcher.dispatch({
                route: '1',
                parms: {
                    displayErrorMessage: true
                }
            });
        }
    }

    create(parms) {
        let student = StudentModule.Student.initStudentFromString(parms);
        student.save();

        const response = `学生${student.name}的成绩被添加
`;
        console.log(response);

        this.dispatcher.dispatch({
            route: '/',
            parms: {}
        });
    }

    generateReport(parms) {
        const normalResponse = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：\n`;
        const errorResponse = `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：\n`;
        //丁梦, 13, 汉, 三班, 语文: 12, 数学: 23, 英语: 90, 编程: 30
        const response = parms.displayErrorMessage ? errorResponse : normalResponse;

        const queryString = readlineSync.question(response);
        if (StudentModule.Student.validateQueryString(queryString)) {
            this.dispatcher.dispatch({
                route: '/students',
                parms: queryString
            });
        } else {
            this.dispatcher.dispatch({
                route: '2',
                parms: {
                    displayErrorMessage: true
                }
            });
        }
    }

    index(parms) {
        const students = StudentModule.Student.query(parms);

        const response = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
========================
${students.map((student) => {
      return `${student.name}|${student.mathScore}|${student.mandarinScore}|${student.englishScore}|${student.programmingScore}|${this.fixedTwoDecimal(student.averageScore())}|${this.fixedTwoDecimal(student.totalScore())}`;
    }).join(`
        `)}
========================
全班总分平均数：${this.fixedTwoDecimal(StudentModule.Student.averageOfTotalScoreSum(students))}
全班总分中位数：${this.fixedTwoDecimal(StudentModule.Student.medianOfTotalScoreSum(students))}`;

        console.log(response);

        this.dispatcher.dispatch({
            route: '/',
            parms: {}
        });
    }

    fixedTwoDecimal(number) {
        return number.toFixed(2);
    }
}

module.exports.StudentsController = StudentsController;
