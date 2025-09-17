// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeCountdown()
  initializeNavigation()
  initializeScrollEffects()
});

// Fungsi baru untuk mengontrol pemutaran musik dan ikon
function toggleMusic() {
  const song = document.getElementById("song");
  const iconSymbol = document.getElementById("audioconsymbol");
  const iconWrapper = document.getElementById("audioicon");
  
  // Memeriksa apakah lagu sedang dijeda
  if (song.paused) {
    // Jika dijeda, mainkan lagu
    song.play();
    // Ganti ikon menjadi pause dan mulai animasi rotasi
    iconSymbol.classList.remove("fa-play");
    iconSymbol.classList.add("fa-pause");
    iconWrapper.classList.add("rotate");
  } else {
    // Jika sedang dimainkan, jeda lagu
    song.pause();
    // Ganti ikon menjadi play dan hentikan animasi rotasi
    iconSymbol.classList.remove("fa-pause");
    iconSymbol.classList.add("fa-play");
    iconWrapper.classList.remove("rotate");
  }
}
// Tambahkan event listener untuk tombol musik yang berputar
document.addEventListener("DOMContentLoaded", () => {
  const iconWrapper = document.getElementById("audioicon");
  if (iconWrapper) {
    iconWrapper.addEventListener("click", toggleMusic);
  }
});

// Fungsi openInvitation() yang sudah diperbaiki
function openInvitation() {
  // const coverSection = document.getElementById("cover")
  const mainContent = document.getElementById("mainContent")
  
  setTimeout(() => {
    mainContent.classList.remove("hidden")
    mainContent.classList.add("opacity-100")
  }, 1000)
  // munculin nav
  document.getElementById('floatingNav').classList.remove('hidden')
  // Memanggil fungsi untuk memulai musik saat undangan dibuka
  toggleMusic();
   // Scroll ke mainContent setelah elemen muncul
  setTimeout(() => {
    mainContent.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 1100)
};

// Countdown timer
function initializeCountdown() {
  function updateCountdown() {
    // tanggal jadinya 
    const weddingDate = new Date("2025-12-25T08:00:00").getTime()
    const now = new Date().getTime() // waktu saat ini
    const distance = weddingDate - now // selisih waktu
      // tampilakan pesan saat waktunya habis
    if (distance < 0) {
      document.getElementById("countdown").innerHTML =
        '<div class="countdown-item"><span class="countdown-number">00</span><span class="countdown-label">Hari Bahagia Telah Tiba!</span></div>'
      return
    }
    // hitung hari, waktu, menit, detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    // tampilakan ke html
    document.getElementById("days").textContent = days.toString().padStart(2, "0")
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
  }
  //  Perbarui countdown setiap detik
  updateCountdown()
  setInterval(updateCountdown, 1000) // Jalankan sekali saat awal
}

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll(".floating-nav a")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Scroll effects and active navigation
function initializeScrollEffects() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".floating-nav a")

  function updateActiveNav() {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === current) {
        link.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", updateActiveNav)
}

// Map functions
function openMap(eventType) {
  const modal = document.getElementById("mapModal")
  const mapContainer = document.getElementById("mapContainer")

  let mapUrl = ""
  if (eventType === "akad") {
    mapUrl =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126487.5910624762!2d110.28259231235349!3d-7.817615487723584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a595a15e167e7%3A0x69ba23fea58a4446!2sMasjid%20Al%20Ikhlas!5e0!3m2!1sen!2sid!4v1756635715659!5m2!1sen!2sid" 
  } else {
    mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126487.5910624762!2d110.28259231235349!3d-7.817615487723584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a595a15e167e7%3A0x69ba23fea58a4446!2sMasjid%20Al%20Ikhlas!5e0!3m2!1sen!2sid!4v1756635715659!5m2!1sen!2sid" 
  }

  mapContainer.innerHTML = `<iframe src="${mapUrl}" width="100%" height="400" style="border:0; border-radius: 10px;" allowfullscreen="" loading="lazy"></iframe>`
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeMap() {
  const modal = document.getElementById("mapModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// RSVP form submission
function submitRSVP(event) {
  event.preventDefault(); // Mencegah form dikirim secara normal (memuat ulang halaman)

  const form = event.target;
  const formData = new FormData(form);

  // Mengirim data ke file PHP menggunakan Fetch API
  fetch('submit_rsvp.php', {
      method: 'POST',
      body: formData, // Mengirim data sebagai FormData
  })
  .then(response => response.text()) // Mengambil respons dari PHP sebagai teks
  .then(data => {
      // Menampilkan respons dari PHP
      alert(data); // Tampilkan pesan sukses atau error dari PHP
      
      // Jika berhasil, tampilkan modal sukses
      if (res.success("Terima kasih, konfirmasi Anda berhasil disimpan!")) {
          document.getElementById("successModal").style.display = "block";
          document.body.style.overflow = "hidden";
          form.reset(); // Reset form jika berhasil
      } else {
          // Jika ada error, Anda bisa menanganinya di sini
          console.error("Server Error:", data);
      }
  })
  .catch(error => {
      // Menangani error jaringan
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim konfirmasi. Silakan coba lagi.');
  });
}

function closeSuccessModal() {
  document.getElementById("successModal").style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modals when clicking outside
window.addEventListener("click", (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  const lightbox = document.getElementById("lightbox")
  if (event.target === lightbox) {
    closeLightbox()
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
