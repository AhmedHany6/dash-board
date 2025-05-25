
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("resetPasswordForm");
    const emailInput = document.getElementById("email");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const messageBox = document.getElementById("message-box");
    const resetButton = document.getElementById("resetButton");
    const toggleNewPassword = document.getElementById("toggleNewPassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const verificationCodeInput = document.getElementById("verificationCode");

    // وظائف تبديل رؤية كلمة المرور
    toggleNewPassword.addEventListener('click', function() {
        togglePasswordVisibility(newPasswordInput, this);
    });

    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, this);
    });

    function togglePasswordVisibility(input, toggleIcon) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        toggleIcon.querySelector('i').classList.toggle('fa-eye');
        toggleIcon.querySelector('i').classList.toggle('fa-eye-slash');
    }

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const pinCode = verificationCodeInput.value.trim();

        if (!email || !newPassword || !confirmPassword || !pinCode) {
            showMessage("يرجى ملء جميع الحقول المطلوبة", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage("كلمة المرور وتأكيدها غير متطابقين", "error");
            return;
        }

        if (newPassword.length < 8) {
            showMessage("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل", "error");
            return;
        }

        const data = {
            email: email,
            pinCode: pinCode,
            newPassword: newPassword,
            newPassword_confirmation: confirmPassword
        };

        resetButton.disabled = true;
        resetButton.innerHTML = '<span class="spinner"></span> جاري الإرسال...';
        resetButton.classList.add('btn-loading');
        hideMessage();

        try {
            const response = await fetch('https://jobizaa.com/api/admin/password/new-password', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage("تم إعادة تعيين كلمة المرور بنجاح! جاري تحويلك لصفحة تسجيل الدخول...", "success");
                sessionStorage.setItem("emailToVerify", email);
                sessionStorage.setItem("registeredPassword", newPassword);
                sessionStorage.setItem("passwordResetSuccess", "true");

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                showMessage(result.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى", "error");
            }

        } catch (error) {
            console.error("Error:", error);
            showMessage("حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى", "error");
        } finally {
            resetButton.disabled = false;
            resetButton.innerHTML = "تأكيد";
            resetButton.classList.remove('btn-loading');
        }
    });

    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.classList.add("show");
        if (type === "error") {
            messageBox.classList.add("error");
            messageBox.classList.remove("success");
        } else {
            messageBox.classList.add("success");
            messageBox.classList.remove("error");
        }
    }

    function hideMessage() {
        messageBox.classList.remove("show", "error", "success");
    }
});
