let historial = []; // Inicializar variable para guardar el historial

const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const RESULTADOS = document.getElementById('resultados');
const METODO = document.getElementById('metodo');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const EXTRA = document.getElementById('extra');
const HISTORIAL = document.getElementById('historial'); // Obtener el div del historial si lo tienes en el HTML

CALCULAR.addEventListener('click', () => {
  const DATO = parseInt(document.getElementById('peso').value);
  let flujo;
  let mantenimiento;

  if (DATO > 0){
    ERROR.style.display = 'none';
    RESULTADOS.style.display = 'block';
    
    if(DATO <= 30){
      flujo = calcHollidaySegar(DATO);
      mantenimiento = flujo / 24;
      METODO.innerHTML = "Método utilizado: Holliday-Segar";
      FLU.innerHTML = `Volumen diario: ${flujo} cc`;
      MAN.innerHTML = `Mantenimiento: ${mantenimiento.toFixed(2)} cc/hr`;
      EXTRA.innerHTML = `m+m/2: ${(mantenimiento * 1.5).toFixed(2)} cc/hr`;
    } else {
      const SC = ((DATO * 4) + 7) / (DATO + 90);
      flujo = SC * 1500; // Asignando valor a la variable flujo
      mantenimiento = flujo / 24; // Asignando valor a la variable mantenimiento
      const flujo2000 = SC * 2000;
      METODO.innerHTML = "Método utilizado: Superficie Corporal";
      FLU.innerHTML = `SC * 1500: ${flujo.toFixed(2)} cc`;
      MAN.innerHTML = `SC * 2000: ${flujo2000.toFixed(2)} cc`;
    }
  } else {
    ERROR.style.display = 'block';
    RESULTADOS.style.display = 'none';

  }

  let resultado = {
    flujo: flujo,
    mantenimiento: mantenimiento,
    fecha: new Date().toLocaleString()
  };

  // Añadir el resultado al historial
  historial.push(resultado);

  // Crear y añadir un nuevo elemento al div del historial
  let p = document.createElement('p');
  p.textContent = `Flujo: ${resultado.flujo}, Mantenimiento: ${resultado.mantenimiento}, Fecha: ${resultado.fecha}`;
  HISTORIAL.appendChild(p);
});

function calcHollidaySegar(peso) {
  let flujo = 0;
  if (peso <= 10) {
    flujo = peso * 100;
  } else if (peso <= 20) {
    flujo = 1000 + ((peso - 10) * 50);
  } else {
    flujo = 1500 + ((peso - 20) * 20);
  }
  return flujo;
}
