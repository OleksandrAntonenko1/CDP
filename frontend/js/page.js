console.log('page');

window.addEventListener('DOMContentLoaded', () => {
  const button  = document.getElementById('button');
  const list  = document.getElementById('list');

  button.addEventListener('click', ()=> {
    alert('buzz');
  });

  button.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (list.style.display === "none") {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  })

});
