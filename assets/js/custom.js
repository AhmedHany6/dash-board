// Back to Top Js Start
let bodyToTop;
let windowScrollY;

let scrollTopArrow = document.querySelector(".toTop");
if (scrollTopArrow) {
    scrollTopArrow.style.opacity = "0";
    window.addEventListener("scroll", (el) => {
        var windowScrollY = window.scrollY;
        if (windowScrollY > 500) {
            scrollTopArrow.style.opacity = "1";
        } else {
            scrollTopArrow.style.opacity = "0";
        }
    });

    function toTopClick() {
        bodyToTop = window.scrollTo(0, 0);
    }
}

// Spinner Loader Js Start
window.addEventListener("load", function() {
    const loader = document.querySelector(".loader");
    loader.style.transition = "opacity 1.5s ease";
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 1500);
});

if (document.querySelector("header")) {
    function scrolling() {
        var sticky = document.querySelector("header");
        var scroll = window.pageYOffset;

        if (scroll >= 15) sticky.classList.remove("transparent");
        else sticky.classList.add("transparent");
    }
    scrolling();
}
window.addEventListener("scroll", scrolling);
if (document.querySelector(".navbar-toggler")) {
    $(document).ready(function() {
        // Show Navigation Toggle Starts
        $(".navbar-toggler").on("click", () => {
            $("html").toggleClass("show-menu");
        });
        $(".navbar-nav .nav-item > .nav-link.js-scroll-trigger").on("click", () => {
            $("html").removeClass("show-menu");
        });

        // Testimonial // Page 2 Js Start
        var sync1 = $("#sync1");
        var sync2 = $("#sync2");
        var slidesPerPage = 3;
        var syncedSecondary = true;

        sync1
            .owlCarousel({
                items: 1,
                nav: false,
                center: true,
                dots: false,
                loop: true,
                responsiveClass: true,
                responsiveRefreshRate: 200,
            })
            .on("changed.owl.carousel", syncPosition);

        sync2
            .on("initialized.owl.carousel", function() {
                sync2.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                dots: false,
                nav: true,
                responsiveRefreshRate: 100,
                navText: [
                    '<i class="fal fa-long-arrow-alt-left"></i>',
                    '<i class="fal fa-long-arrow-alt-right"></i>',
                ],
                autoplay: true, //true if you want enable autoplay
                smartSpeed: 3000,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                        margin: 20,
                    },
                    768: {
                        items: 3,
                        margin: 20,
                    },
                    992: {
                        items: 3,
                        margin: 20,
                    },
                    1199: {
                        items: 3,
                        margin: 20,
                    },
                },
            })
            .on("changed.owl.carousel", syncPosition2);

        function syncPosition(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }

            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find(".owl-item.active").length - 1;
            var start = sync2.find(".owl-item.active").first().index();
            var end = sync2.find(".owl-item.active").last().index();

            if (current > end) {
                sync2.data("owl.carousel").to(current, 100, true);
            }
            if (current < start) {
                sync2.data("owl.carousel").to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                sync1.data("owl.carousel").to(number, 100, true);
            }
        }

        sync2.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).index();
            sync1.data("owl.carousel").to(number, 300, true);
        });
    });
}

// Header Drop-Down Start
if (document.querySelectorAll(".dropdown")) {
    const dropdowns = document.querySelectorAll(".dropdown");
    const showClass = "show";

    window.addEventListener("load", () => {
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("mouseenter", () => {
                dropdown.classList.add(showClass);
                dropdown
                    .querySelector(".dropdown-toggle")
                    .setAttribute("aria-expanded", "true");
                dropdown.querySelector(".dropdown-menu").classList.add(showClass);
            });

            dropdown.addEventListener("mouseleave", () => {
                dropdown.classList.remove(showClass);
                dropdown
                    .querySelector(".dropdown-toggle")
                    .setAttribute("aria-expanded", "false");
                dropdown.querySelector(".dropdown-menu").classList.remove(showClass);
            });
        });
    });
    window.addEventListener("resize", () => {
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("mouseenter", dropdownHover);
            dropdown.addEventListener("mouseleave", dropdownLeave);
        });
    });

    function dropdownHover() {
        this.classList.add(showClass);
        this.querySelector(".dropdown-toggle").setAttribute(
            "aria-expanded",
            "true"
        );
        this.querySelector(".dropdown-menu").classList.add(showClass);
    }

    function dropdownLeave() {
        this.classList.remove(showClass);
        this.querySelector(".dropdown-toggle").setAttribute(
            "aria-expanded",
            "false"
        );
        this.querySelector(".dropdown-menu").classList.remove(showClass);
    }
}

if (document.getElementById("testimonial")) {
    $("#testimonial").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        nav: true,
        rewind: false,
        navContainer: ".slider-nav",
        navText: [
            '<i class="fal fa-long-arrow-alt-left"></i>',
            '<i class="fal fa-long-arrow-alt-right"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
}
// Blog Page 2 Js Start
if (document.getElementById("bloghome2")) {
    $("#bloghome2").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        nav: true,
        rewind: false,
        navText: [
            '<i class="fal fa-long-arrow-alt-left"></i>',
            '<i class="fal fa-long-arrow-alt-right"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1600: {
                items: 4,
            },
        },
    });
}

// Screenshot-Carousel Js Start
if (document.querySelector(".screenshort-carousel")) {
    $(".screenshort-carousel").owlCarousel({
        loop: true,
        margin: 30,
        navContainer: ".screenshort-nav",
        navText: [
            '<i class="fal fa-long-arrow-alt-left"></i>',
            '<i class="fal fa-long-arrow-alt-right"></i>',
        ],
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 3,
                margin: 15,
            },
            414: {
                items: 3,
                margin: 15,
            },
            576: {
                items: 3,
                margin: 15,
            },
            768: {
                items: 3,
                margin: 40,
            },
            992: {
                items: 5,
            },
            1200: {
                items: 5,
            },
            1920: {
                items: 5,
            },
        },
    });
}

// Home 3 Testimonial Js Start
if (document.querySelector(".testimonial3")) {
    $(".testimonial3").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        nav: true,
        rewind: false,
        margin: 15,
        navText: [
            '<i class="fal fa-long-arrow-alt-left"></i>',
            '<i class="fal fa-long-arrow-alt-right"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
}

      document.addEventListener('DOMContentLoaded', function () {
          const registrationForm = document.querySelector('.activity-actions form');
          const submitButton = document.getElementById('btnActivitySignup');
          const messageElement = document.getElementById('registerMessage');
      
          registrationForm.addEventListener('submit', function (event) {
              event.preventDefault();
      
              // Reset messages
              messageElement.textContent = '';
              messageElement.style.color = '';
              ['setNameError', 'setMailError', 'setPhoneError', 'setPasswordError', 'setConfirmPasswordError'].forEach(id => {
                  document.getElementById(id).textContent = '';
              });
      
              // Get form values
              const fullName = document.getElementById('setName').value.trim();
              const email = document.getElementById('setMail').value.trim();
              const phone = document.getElementById('setPhone').value.trim();
              const password = document.getElementById('setPassword').value;
              const passwordConfirmation = document.getElementById('setConfirmPassword').value;
      
              if (password !== passwordConfirmation) {
                  document.getElementById('setConfirmPasswordError').textContent = 'Passwords do not match';
                  return;
              }
      
              const headers = new Headers();
              headers.append("Accept", "application/json");
              headers.append("Content-Type", "application/x-www-form-urlencoded");
      
              const formData = new URLSearchParams();
              formData.append("fullName", fullName);
              formData.append("email", email);
              formData.append("phone", phone);
              formData.append("password", password);
              formData.append("password_confirmation", passwordConfirmation);
      
              submitButton.disabled = true;
              submitButton.textContent = 'Registering...';
      
              fetch("https://jobizaa.com/api/admin/register", {
                  method: "POST",
                  headers: headers,
                  body: formData,
              })
              .then(async response => {
                  const data = await response.json();
      
                  if (!response.ok) {
                    messageElement.textContent = data.message || 'فشل في التسجيل';
                    messageElement.classList.remove('success-message');
                    messageElement.classList.add('error-message');
                    messageElement.style.display = 'block';
                    throw new Error(); // يمكنكِ الإبقاء على هذه لوقف السلسلة، أو التعامل مع الخطأ لاحقًا
                }
                
                  
                  return data;
              })
              .then(data => {
                // عرض رسالة النجاح
                messageElement.textContent = 'Registration successful! You will be redirected to the login page...';
                messageElement.classList.remove('error-message');
                messageElement.classList.add('success-message');
                messageElement.style.display = 'block';
                
                // إعادة تعيين النموذج
                registrationForm.reset();
                
               
            })
            .catch(error => {
              // إزالة أي رسائل سابقة
              messageElement.classList.remove('success-message');
              messageElement.classList.add('error-message');
              messageElement.style.display = 'block';
          
              // التحقق من وجود أخطاء تفصيلية من السيرفر
              if (error.response && error.response.data && Array.isArray(error.response.data)) {
                  
          
                  // إعادة تعيين رسائل الخطأ السابقة
                  ['setNameError', 'setMailError', 'setPhoneError', 'setPasswordError', 'setConfirmPasswordError'].forEach(id => {
                      document.getElementById(id).textContent = '';
                  });
          
                  // توزيع الأخطاء على الحقول المناسبة
                  error.response.data.forEach(err => {
                      if (err.toLowerCase().includes('name')) {
                          document.getElementById('setNameError').textContent = err;
                      } else if (err.toLowerCase().includes('email')) {
                          document.getElementById('setMailError').textContent = err;
                      } else if (err.toLowerCase().includes('phone')) {
                          document.getElementById('setPhoneError').textContent = err;
                      } else if (err.toLowerCase().includes('password confirmation')) {
                          document.getElementById('setConfirmPasswordError').textContent = err;
                      } else if (err.toLowerCase().includes('password')) {
                          document.getElementById('setPasswordError').textContent = err;
                      }
                  });
              } else {
                let fieldHint = '';
                let detailedMessage = error.message || "An unexpected error occurred.";
                
                // تحليل رسالة الخطأ لتحديد الحقل المسبب
                const lowerMsg = detailedMessage.toLowerCase();
                
                if (lowerMsg.includes('name') || lowerMsg.includes('username')) {
                    fieldHint = 'اسم المستخدم';
                    detailedMessage = detailedMessage.replace(/name|username/gi, 'اسم المستخدم');
                } 
                else if (lowerMsg.includes('email')) {
                    fieldHint = 'البريد الإلكتروني';
                    detailedMessage = detailedMessage.replace(/email/gi, 'البريد الإلكتروني');
                } 
                else if (lowerMsg.includes('phone') || lowerMsg.includes('mobile')) {
                    fieldHint = 'رقم الهاتف';
                    detailedMessage = detailedMessage.replace(/phone|mobile/gi, 'رقم الهاتف');
                } 
                else if (lowerMsg.includes('password')) {
                    fieldHint = 'كلمة المرور';
                    detailedMessage = detailedMessage.replace(/password/gi, 'كلمة المرور');
                }
                
                // عرض رسالة الخطأ المفصلة
                messageElement.innerHTML = `
                    <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 20px;"></i>
                            <strong style="font-size: 18px;">An error occurred while registering.</strong>
                        </div>
                        <div style="margin-bottom: 8px;">${detailedMessage}</div>
                        ${fieldHint ? `<div><strong>الحقل المتأثر:</strong> ${fieldHint}</div>` : ''}
                        <div style="margin-top: 10px; font-size: 14px;">Please check the data and try again.</div>
                    </div>
                `;
            }
            
            
          
              // إخفاء الرسالة بعد 5 ثوانٍ (اختياري)
              setTimeout(() => {
                  messageElement.style.display = 'none';
              }, 5000);
          })
          
          
              .finally(() => {
                  submitButton.disabled = false;
                  submitButton.textContent = 'Signup';
              });
          });
      });
    
      