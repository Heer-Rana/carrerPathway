$(document).ready(() => {
  // Navbar scroll effect
  $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
          $(".navbar").addClass("scrolled");
      } else {
          $(".navbar").removeClass("scrolled");
      }
  });

  // Smooth scrolling for navbar links
  $("a.nav-link").on("click", function (event) {
      if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $("html, body").animate(
              {
                  scrollTop: $(hash).offset().top - 70,
              },
              800
          );
      }
  });

  // Countdown timer
  function updateCountdown() {
      const endDate = new Date("2023-12-31T23:59:59").getTime();
      const now = new Date().getTime();
      const timeLeft = endDate - now;

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      $("#days").text(days.toString().padStart(2, "0"));
      $("#hours").text(hours.toString().padStart(2, "0"));
      $("#minutes").text(minutes.toString().padStart(2, "0"));
      $("#seconds").text(seconds.toString().padStart(2, "0"));
  }

  if ($("#countdown").length) {
      setInterval(updateCountdown, 1000);
  }

  // Registration form validation
  $("#registration-form").on("submit", function (e) {
      e.preventDefault();

      // Validation patterns
      var namePattern = /^[A-Za-z\s]{2,}$/;
      var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      var numPattern = /^[6-9]\d{9}$/;

      // Get values
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var number = document.getElementById("number").value.trim();

      // Validation checks
      if (!namePattern.test(name)) {
          alert("Please enter a valid name (only letters and spaces, at least 2 characters).");
          return;
      }

      if (!emailPattern.test(email)) {
          alert("Please enter a valid email address.");
          return;
      }

      if (!numPattern.test(number)) {
          alert("Please enter a valid 10-digit phone number starting with 6-9.");
          return;
      }

      // If validation passes
      alert("Thank you for registering! We'll contact you soon.");
      this.reset();
  });
  const questions = [
      {
          question: "Which type of problem-solving do you enjoy the most?",
          options: [
              "Designing and constructing buildings or structures",
              "Analyzing business strategies and making financial decisions",
              "Solving technical and engineering challenges",
              "Developing innovative products or systems",
          ],
      },
      {
          question: "Which subject interests you the most?",
          options: [
              "Mathematics and physics",
              "Economics and business studies",
              "Mechanical and electrical systems",
              "Architecture and design",
          ],
      },
      {
          question: "What kind of work environment do you see yourself in?",
          options: [
              "An office analyzing business trends and financial data",
              "A construction site overseeing architectural projects",
              "A high-tech lab working on engineering solutions",
              "A creative workspace designing building structures",
          ],
      },
      {
          question: "What excites you the most about a project?",
          options: [
              "The technical aspects and efficiency of a system",
              "The financial and strategic success of the project",
              "The design and aesthetics of the final product",
              "The practical application and innovation involved",
          ],
      },
      {
          question: "Which tool or skill do you find most appealing?",
          options: [
              "Blueprints and architectural drawings",
              "Financial models and business plans",
              "Engineering software like CAD and MATLAB",
              "Project management and planning",
          ],
      },
      {
          question: "What type of projects would you prefer working on?",
          options: [
              "Designing commercial buildings or urban spaces",
              "Leading a startup or running a business",
              "Developing new technology or engineering solutions",
              "Managing large-scale construction or infrastructure projects",
          ],
      },
  ];

  let currentQuestion = 0;
  const answers = [];

  function displayQuestion() {
      const question = questions[currentQuestion];
      $("#question").text(question.question);
      $("#options").empty();
      question.options.forEach((option, index) => {
          $("#options").append(`
              <div class="form-check mb-2">
                  <input class="form-check-input" type="radio" name="question${currentQuestion}" id="option${index}" value="${index}">
                  <label class="form-check-label" for="option${index}">${option}</label>
              </div>
          `);
      });
  }

  function getResult() {
      const totalScore = answers.reduce((a, b) => a + b, 0);
      if (totalScore <= 6) {
          return "Your interests align with Engineering fields. Consider careers in Mechanical, Electrical, Civil, or Software Engineering.";
      } else if (totalScore <= 12) {
          return "Your interests align with Architecture. Look into careers in Urban Planning, Interior Design, or Structural Architecture.";
      } else {
          return "Your interests indicate a strong preference for Business and Management. Explore careers in Entrepreneurship, Finance, or Marketing.";
      }
  }

  $("#next-btn").on("click", () => {
      const selectedOption = $(`input[name="question${currentQuestion}"]:checked`).val();
      if (selectedOption !== undefined) {
          answers.push(Number.parseInt(selectedOption));
          currentQuestion++;
          if (currentQuestion < questions.length) {
              displayQuestion();
          } else {
              $("#test-container").hide();
              $("#result-container").show();
              $("#career-result").text(getResult());
          }
      } else {
          alert("Please select an option before proceeding.");
      }
  });

  if ($("#quick-test").length) {
      displayQuestion();
  }
});