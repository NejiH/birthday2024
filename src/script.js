const nameInput = document.getElementById('name-input');
    const presenceOptions = document.getElementById('presence-options');
    const giftOptions = document.getElementById('gift-options');
    const giftAmountInput = document.getElementById('gift-amount');
    const submitBtn = document.getElementById('submit-btn');
    const giftListBtn = document.getElementById('gift-list-btn');
    const mainPage = document.getElementById('main-page');
    const preConfirmationPage = document.getElementById('pre-confirmation-page');
    const preConfirmationDetails = document.getElementById('pre-confirmation-details');
    const confirmEmailBtn = document.getElementById('confirm-email-btn');
    const cancelPreConfirmationBtn = document.getElementById('cancel-pre-confirmation-btn');
    const confirmationPage = document.getElementById('confirmation-page');
    const confirmationDetails = document.getElementById('confirmation-details');
    const backBtn = document.getElementById('back-btn');
    const giftList = document.getElementById('gift-list');
    const backFromGiftListBtn = document.getElementById('back-from-gift-list-btn');


    const nameError = document.getElementById('name-error');
    const presenceError = document.getElementById('presence-error');
    const giftError = document.getElementById('gift-error');

    let submissionData = {};

    giftOptions.addEventListener('change', function (e) {
      if (e.target.type === 'radio') {
        giftAmountInput.classList.toggle('hidden', e.target.value !== 'Je participe');
      }
    });

    submitBtn.addEventListener('click', function () {
      const additionalInfo = document.getElementById('additional-info').value.trim();

      nameError.classList.add('hidden');
      presenceError.classList.add('hidden');
      giftError.classList.add('hidden');

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.classList.remove('hidden');
        isValid = false;
      }

      const presenceRadio = document.querySelector('input[name="presence"]:checked');
      if (!presenceRadio) {
        presenceError.classList.remove('hidden');
        isValid = false;
      }

      const giftRadio = document.querySelector('input[name="gift"]:checked');
      if (!giftRadio) {
        giftError.classList.remove('hidden');
        isValid = false;
      }

      if (!isValid) return;

      const name = nameInput.value;
      const presence = presenceRadio.value;
      const gift = giftRadio.value;
      const giftAmount = gift === 'Je participe' ? giftAmountInput.value : 'N/A';

      submissionData = { name, presence, gift, giftAmount, additionalInfo };

      preConfirmationDetails.innerHTML = `
                Nom: ${name}<br>
                Présence: ${presence}<br>
                Option cadeau: ${gift}<br>
                Montant: ${giftAmount}
                ${additionalInfo ? `<br>Infos supplémentaires: ${additionalInfo}` : ''}

            `;

      mainPage.classList.add('hidden');
      preConfirmationPage.classList.remove('hidden');
    });

    confirmEmailBtn.addEventListener('click', function () {
      const emailBody = `
                Nom: ${submissionData.name}
                Présence: ${submissionData.presence}
                Option cadeau: ${submissionData.gift}
                Montant: ${submissionData.giftAmount}
                ${submissionData.additionalInfo ? `Informations supplémentaires: ${submissionData.additionalInfo}` : ''}

            `;

      window.location.href = `mailto:hayon.arnaud@gmail.com?subject=Participation%20à%20l'anniversaire%20d'Elsa&body=${encodeURIComponent(emailBody)}`;

      preConfirmationPage.classList.add('hidden');
      confirmationPage.classList.remove('hidden');
    });

    cancelPreConfirmationBtn.addEventListener('click', function () {
      preConfirmationPage.classList.add('hidden');
      mainPage.classList.remove('hidden');
    });

    backBtn.addEventListener('click', function () {
      nameInput.value = '';
      document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
      giftAmountInput.value = '';
      giftAmountInput.classList.add('hidden');

      confirmationPage.classList.add('hidden');
      mainPage.classList.remove('hidden');
    });

    giftListBtn.addEventListener('click', function () {
      mainPage.classList.add('hidden');
      giftList.classList.remove('hidden');
    });

    backFromGiftListBtn.addEventListener('click', function () {
      giftList.classList.add('hidden');
      mainPage.classList.remove('hidden');
    });