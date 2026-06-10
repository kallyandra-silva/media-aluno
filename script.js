 function getVal(id) {
     return document.getElementById(id).value.trim();
}

 function setError(fieldId, show) {
     const el = document.getElementById(fieldId);
     el.classList.toggle('has-error', show);
  }

 function calcular() {
     const nome = getVal('nome');
     const n1Raw = getVal('n1');
     const n2Raw = getVal('n2');
     const freqRaw = getVal('freq');

     let valid = true;

     // Validate nome
     setError('field-nome', !nome);
     if (!nome) valid = false;

     // Validate n1
      n1 = parseFloat(n1Raw);
     const n1Err = n1Raw === '' || isNaN(n1) || n1 < 0 || n1 > 10;
     setError('field-n1', n1Err);
     if (n1Err) valid = false;

     // Validate n2
     const n2 = parseFloat(n2Raw);
     const n2Err = n2Raw === '' || isNaN(n2) || n2 < 0 || n2 > 10;
     setError('field-n2', n2Err);
     if (n2Err) valid = false;

     // Validate freq
     const freq = parseFloat(freqRaw);
     const freqErr = freqRaw === '' || isNaN(freq) || freq < 0 || freq > 100;
     setError('field-freq', freqErr);
     if (freqErr) valid = false;

     if (!valid) return;

     // Calculate
     const M = (n1 + n2) / 2;

     let situacao, cls, icon;
     if (M >= 7.0 && freq >= 75) {
     situacao = 'APROVADO';
     cls = 'aprovado';
     icon = '✅';
     } else if (M >= 5 && M < 7 && freq >= 75) {
     situacao = 'RECUPERAÇÃO';
     cls = 'recuperacao';
     icon = '⚠️';
     } else {
     situacao = 'REPROVADO';
     cls = 'reprovado';
     icon = '❌';
     }

     // Render
     const card = document.getElementById('resultCard');
     card.className = 'result-card show ' + cls;

     document.getElementById('statusIcon').textContent = icon;
     document.getElementById('resultName').textContent = nome;
     document.getElementById('resultStatus').textContent = situacao;
     document.getElementById('statMedia').textContent = M.toFixed(1).replace('.', ',');
     document.getElementById('statFreq').textContent = freq.toFixed(0) + '%';

     card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

 // Allow Enter key
 document.addEventListener('keydown', e => {
     if (e.key === 'Enter') calcular();
});