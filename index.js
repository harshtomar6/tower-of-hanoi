window.onload = function() {
  // Attach event listeners
  const discs = document.querySelectorAll('.disc');
  const bars = document.querySelectorAll('.bar-drop');

  discs.forEach(disc => {
    disc.addEventListener('dragstart', handleDragStart, false);
    disc.addEventListener('dragend', handleDragEnd, false);
    disc.addEventListener('dragleave', handleDragLeave, false);
  });

  bars.forEach(bar => {
    bar.addEventListener('drop', handleDrop, false);
    bar.addEventListener('dragover', handleDragOver, false);
  })
}


function handleDragStart(e) {
  
  // Check if the current disc is the top disc.
  if(e.target.id !== e.target.parentNode.firstElementChild.id) {
    console.log('Only the top disc can be dragged');
    return;
  }
  
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text', e.target.id);
  this.style.opacity = 0.4;
}

function handleDragEnd(e) {
  this.style.opacity = '1';
}

function handleDragLeave(e) {
  this.style.opacity = '1'; 
}


function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';
  
  return false;
}

function handleDrop(e) {
  console.log({ data: e.dataTransfer.getData('text') })
  e.stopPropagation();
  
  const getNumberFromId = (id) => parseInt(id.split('-')[1]);

  // console.log(this.firstChild.id)
  
  if(getNumberFromId(e.dataTransfer.getData('text')) < getNumberFromId(this.firstChild.id || 'disc-999')) {
    this.prepend(document.getElementById(e.dataTransfer.getData('text')))

  }

  return false; 
}