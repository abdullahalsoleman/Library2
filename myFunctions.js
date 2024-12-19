document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      navLinks.forEach(nav => nav.classList.remove("active"));
      event.target.classList.add("active");
    });
  });
});

function showForm() {
  const selectedBooks = $('input[type="checkbox"]:checked'); 
  const bookList = $('#book-list'); 
  const totalPriceElement = $('#total-price'); 

  if (selectedBooks.length > 0) {
    bookList.empty(); 
    let totalPrice = 0;

    selectedBooks.each(function () {
      const row = $(this).closest('tr'); 
      const title = row.find('td:nth-child(3)').text(); 
      const priceText = row.find('td:nth-child(4)').text(); 
      const price = parseInt(priceText.replace(/[^\d]/g, '')); 

      const listItem = $('<li></li>').text(`${title} - ${price} ل.س`);
      bookList.append(listItem);

      totalPrice += price;
    });

    totalPriceElement.text(totalPrice); 

    $('#form').css("display", "block"); 
  } else {
    alert('يرجى اختيار كتاب واحد على الأقل');
  }
}

function showDetails(checkbox, detailsId) {
  const detailsRow = $("#" + detailsId); 
  detailsRow.css("display", checkbox.checked ? "table-row" : "none");
}

$('#userForm').on('submit', function (event) {
  event.preventDefault(); 

  const form = $(this); 
  let isValid = true;

  $('.error-message').text('');

  const fullName = form.find('[name="fullName"]');
  const fullNameError = $('#fullNameError');
  if (!fullName[0].checkValidity()) {
    fullNameError.text('الرجاء إدخال اسم كامل باستخدام الحروف العربية فقط');
    isValid = false;
  }

  const nationalId = form.find('[name="nationalId"]');
  const nationalIdError = $('#nationalIdError');
  if (!nationalId[0].checkValidity()) {
    nationalIdError.text('الرقم الوطني يجب أن يتكون من 11 خانة فقط');
    isValid = false;
  }

  const birthDate = form.find('[name="birthDate"]');
  const birthDateError = $('#birthDateError');
  if (!birthDate[0].checkValidity()) {
    birthDateError.text('يرجى إدخال تاريخ الولادة بشكل صحيح');
    isValid = false;
  }

  const mobileNumber = form.find('[name="mobileNumber"]');
  const mobileNumberError = $('#mobileNumberError');
  if (!mobileNumber[0].checkValidity()) {
    mobileNumberError.text('رقم الموبايل يجب أن يبدأ بـ 09 ويحتوي على 10 خانات');
    isValid = false;
  }

  const email = form.find('[name="email"]');
  const emailError = $('#emailError');
  if (!email[0].checkValidity()) {
    emailError.text('يرجى إدخال بريد إلكتروني صالح');
    isValid = false;
  }

  if (isValid) {
    alert(`تم إرسال البيانات بنجاح!\n\nالاسم: ${fullName.val()}\nالرقم الوطني: ${nationalId.val()}\nتاريخ الولادة: ${birthDate.val()}\nرقم الموبايل: ${mobileNumber.val()}\nالبريد الإلكتروني: ${email.val()}`);
    form[0].reset();
    $('#form').css("display", "none"); 
  } else {
    alert('يرجى تصحيح الأخطاء قبل إرسال النموذج');
  }
});
