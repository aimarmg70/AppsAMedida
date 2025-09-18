// --- script.js ---

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Animaciones al hacer scroll (Intersection Observer)
const elementosAnimados = document.querySelectorAll(".animar");

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

elementosAnimados.forEach(el => observer.observe(el));

// Botón volver arriba
const btnArriba = document.createElement("button");
btnArriba.innerText = "⬆";
btnArriba.classList.add("btn-arriba");
document.body.appendChild(btnArriba);

btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  btnArriba.style.display = window.scrollY > 300 ? "block" : "none";
});

// Navegación para el menú glass
document.querySelectorAll(".glass-radio-group label").forEach(label => {
  label.addEventListener("click", e => {
    const target = label.getAttribute("data-target");
    if (target) {
      document.querySelector(target).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Formulario interactivo con fetch
const form = document.getElementById("contact-form");
form.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    mensaje: form.mensaje.value
  };

  // Animación de envío
  form.classList.add("enviando");

  fetch("https://script.google.com/macros/s/AKfycbxWwWPqEt1Rb11ocRcHl276RDDRRYrwO8TQIKwm7WCNqXZqv7nY9RQE6p5sHh0qL_86Vg/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    if(response.status === "ok") {
      alert("✅ Mensaje enviado con éxito. Te contactaremos pronto.");
      form.reset();
    } else {
      alert("❌ Hubo un error: " + response.message);
    }
    form.classList.remove("enviando");
  })
  .catch(err => {
    alert("❌ Error de conexión o URL incorrecta.");
    console.error(err);
    form.classList.remove("enviando");
  });
});


