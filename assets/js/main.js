/**
 * ROOM SABLON - Interactive Script
 * Features: Filterable Catalog, Lightbox Modal, WhatsApp Order Builder,
 * FAQ Accordion, Mobile Drawer, and Smooth Scroll Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  const ADMIN_WA_NUMBER = '6287886666168';

  /* ==========================================================================
     1. Mobile Navigation Menu Toggle
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  /* ==========================================================================
     2. Catalog Category Filtering
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-filter');

      catalogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory || cardCategory.includes(targetCategory)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     3. Lightbox Modal Preview
     ========================================================================== */
  const modalOverlay = document.getElementById('catalogModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalCategoryBadge = document.getElementById('modalCategory');
  const modalTechniqueBadge = document.getElementById('modalTechnique');
  const modalWaBtn = document.getElementById('modalWaBtn');

  function openModal(card) {
    if (!modalOverlay) return;

    const imgEl = card.querySelector('.card-image-box img');
    const titleEl = card.querySelector('.card-title');
    const descEl = card.querySelector('.card-description');
    const catEl = card.querySelector('.card-badge-category');
    const techEl = card.querySelector('.card-badge-technique');

    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const titleText = titleEl ? titleEl.textContent.trim() : 'Desain Sablon Custom';
    const descText = descEl ? descEl.textContent.trim() : '';
    const catText = catEl ? catEl.textContent.trim() : 'Custom Design';
    const techText = techEl ? techEl.textContent.trim() : 'Sablon Premium';

    if (modalImg) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = titleText;
    if (modalDesc) modalDesc.textContent = descText;
    if (modalCategoryBadge) modalCategoryBadge.textContent = catText;
    if (modalTechniqueBadge) modalTechniqueBadge.textContent = techText;

    // Build specific WA prefill message for this item
    const message = encodeURIComponent(
      `Halo Admin ROOM SABLON, saya tertarik untuk memesan sablon dengan desain:\n\n` +
      `📌 *Desain*: ${titleText}\n` +
      `👕 *Kategori*: ${catText}\n` +
      `✨ *Teknik*: ${techText}\n\n` +
      `Bisa tolong info detail harga dan estimasi pembuatannya? Terima kasih!`
    );

    if (modalWaBtn) {
      modalWaBtn.href = `https://wa.me/${ADMIN_WA_NUMBER}?text=${message}`;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach trigger to card images and "Lihat Detail" buttons
  catalogCards.forEach(card => {
    const imgBox = card.querySelector('.card-image-box');
    const previewBtn = card.querySelector('.btn-card-preview');

    if (imgBox) {
      imgBox.addEventListener('click', () => openModal(card));
    }
    if (previewBtn) {
      previewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(card);
      });
    }

    // Direct WA button on card
    const orderBtn = card.querySelector('.btn-card-order');
    if (orderBtn) {
      const titleEl = card.querySelector('.card-title');
      const titleText = titleEl ? titleEl.textContent.trim() : 'Desain Custom';
      const msg = encodeURIComponent(
        `Halo Admin ROOM SABLON, saya mau order sablon baju dengan referensi desain:\n*${titleText}*.\n\nBisa dibantu untuk konsultasi bahan dan jumlahnya?`
      );
      orderBtn.href = `https://wa.me/${ADMIN_WA_NUMBER}?text=${msg}`;
      orderBtn.target = '_blank';
      orderBtn.rel = 'noopener noreferrer';
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     4. FAQ Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isCurrentActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle clicked item
        if (!isCurrentActive) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     5. Fast Order Generator (WhatsApp Direct Form)
     ========================================================================== */
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const itemType = document.getElementById('orderItemType')?.value || 'Kaos Lengan Pendek';
      const material = document.getElementById('orderMaterial')?.value || 'Cotton Combed 24s';
      const printTech = document.getElementById('orderPrintTech')?.value || 'DTF Premium';
      const quantity = document.getElementById('orderQuantity')?.value || '1 Pcs (Satuan)';
      const notes = document.getElementById('orderNotes')?.value.trim() || 'Mohon infokan rinciannya min.';

      const waMessage = encodeURIComponent(
        `Halo Admin ROOM SABLON, saya mau konsultasi pemesanan sablon custom:\n\n` +
        `🏷️ *Jenis Produk*: ${itemType}\n` +
        `🧵 *Pilihan Bahan*: ${material}\n` +
        `🎨 *Teknik Sablon*: ${printTech}\n` +
        `📦 *Jumlah Pesanan*: ${quantity}\n` +
        `📝 *Catatan/Konsep*: ${notes}\n\n` +
        `Saya kirimkan contoh desain setelah ini ya min. Mohon info estimasi harga dan waktu pengerjaan. Terima kasih!`
      );

      const targetUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${waMessage}`;
      window.open(targetUrl, '_blank');
    });
  }

  /* ==========================================================================
     6. Smooth Scroll Reveal (Intersection Observer)
     ========================================================================== */
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.catalog-card, .feature-box, .step-card, .faq-item, .contact-card').forEach(el => {
    observer.observe(el);
  });
});
