const $ = require('jquery');
const StudentModule = require('./student');

function getAllStudentsInfo() {
  const allStudentInfo = [];
  for(let i=0;i<localStorage.length;i++) {
    let studentNum = localStorage.key(i);
    let isStudentNumValid = /^([0-9]{2})$/.test(studentNum);
    if(!isStudentNumValid) {
      //break表示跳出循环，continue表示结束本次循环
      continue;
    }
    const studentInfoObj = JSON.parse(localStorage[studentNum]);
    allStudentInfo.push(studentInfoObj);
  }
  return allStudentInfo;
}

function fixedTwoDecimal(number) {
    return number.toFixed(2);
}

$("#add form").submit(function(e) {
  $(".msg").remove();
  e.preventDefault();
  const inputAttr = ["#inputName", "#inputNum", "#ethnic", "#inputClass",
   "#inputMandarinScore", "#inputMathScore", "#inputEnglishScore", "#inputProgrammingScore"];
  const inputData = inputAttr.map(ele => {
     return $(ele).val();
   });
  const inputStr = inputData.join(", ");
  const isInputStrValid = StudentModule.Student.validateStudentString(inputStr);

  const allStudentInfo = getAllStudentsInfo();
  const isDuplicateNumStudent = allStudentInfo.some(studentEle => {
    return studentEle.num === inputData[1];
  });

  let msg = '请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...)';
  let msgType = 'warning';
  if(isDuplicateNumStudent) {
    msg = '您输入的学生学号重复，请重新输入';
  } else if(isInputStrValid) {
    let student = StudentModule.Student.initStudentFromString(inputStr);
    student.save();
    $("form").trigger("reset");
    msg = '已成功添加该学生成绩';
    msgType = 'success';
  }
  $(".btns").before(`<div class="${msgType} msg">${msg}</div>`);
});

$(".all-tab").click(function(e) {
  e.preventDefault();
  const allStudentInfo = getAllStudentsInfo();
  let studentsInfoStr = '';
  $("table tr td").remove();
  allStudentInfo.forEach(studentInfo => {
     studentsInfoStr += `<tr><td>${studentInfo.name}</td><td>${studentInfo.num}</td><td>${studentInfo.ethnic}</td><td>${studentInfo.klass}</td><td>${studentInfo.mandarinScore}</td><td>${studentInfo.mathScore}</td><td>${studentInfo.englishScore}</td><td>${studentInfo.programmingScore}</td></tr>`;
  });

  $("table").append(studentsInfoStr);
});

$("#queryBtn").click(function(e) {
  $(".msg").remove();
  $("table tr td").remove();
  e.preventDefault();

  const numsQueryStr = $("#numList").val();
  const isQueryStrValid = StudentModule.Student.validateQueryString(numsQueryStr);
  const warningMsg = '请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,…）';
  const allStudentInfo = getAllStudentsInfo();

  let domStr = `<div class="warning msg">${warningMsg}</div>`;

  if(isQueryStrValid) {
    const students = StudentModule.Student.query(numsQueryStr, allStudentInfo);
    const response = `${students.map((student) => {
      return `<tr><td>${student.name}</td><td>${student.mathScore}</td><td>${student.mandarinScore}</td><td>${student.englishScore}</td><td>${student.programmingScore}</td><td>${fixedTwoDecimal(student.averageScore)}</td><td>${fixedTwoDecimal(student.totalScore)}</td></tr>`;
    })}
<tr><td>全班总分平均数：${fixedTwoDecimal(StudentModule.Student.averageOfTotalScoreSum(students))}</td></tr>
<tr><td>全班总分中位数：${fixedTwoDecimal(StudentModule.Student.medianOfTotalScoreSum(students))}</td></tr></table>`;

    domStr = response;
  }

  $("table").append(domStr);
});


$(document).ready(function() {
  $(".all-tab").trigger('click');
});
