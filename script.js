/*const sections = document.querySelectorAll('section');

sections.forEach((section) => {
  window.addEventListener("load",evenListener);
  window.addEventListener("scroll",evenListener);

  function evenListener(){
    let windowHeight = window.innerHeight;
    let sectionRectTop = section.getBoundingClientRect().top;

    if(sectionRectTop < windowHeight){
      section.classList.add("active");
    }
  }
  window.addEventListener("scroll",() => {
    let reveals = section.querySelectorAll(".reveal");

    reveals.forEach(reveals, index) => {
      if(section.classList.contains("active")){
        const delay = 600;

        setTimeout(() =>{
          reveal.classeList.add("active");
        }, index * delay);
        }
      });
    });
  
});*/

var navLinks = document.getElementById("navLinks");

function showMenu() {
  navLinks.style.right = "0";
}

function hideMenu() {
  navLinks.style.right = "-200px";
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

document.addEventListener("DOMContentLoaded", reveal);



// script.js

let currentQuestion = 0;
const questions = document.querySelectorAll('.question');
const submitBtn = document.getElementById('submitBtn');
const bookNowBtn = document.getElementById('bookNowBtn');

document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('prevBtn').addEventListener('click', prevQuestion);

function showQuestion(index) {
    questions.forEach((question, i) => {
        question.classList.toggle('active', i === index);
    });
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === questions.length - 1;
    submitBtn.classList.toggle('hidden', index !== questions.length - 1);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// Handle form submission
document.getElementById('questionnaireForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Simulate form submission
    alert('Form submitted!');
    submitBtn.classList.add('hidden');
    bookNowBtn.classList.remove('hidden');
});

// Initialize the form
showQuestion(currentQuestion);



