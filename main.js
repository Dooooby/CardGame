const Row = 4;
const Column = 3;
const Color = ['#004e66', '#004e66', '#a79c8e', '#a79c8e',
'#fd999a', '#fd999a', '#6d9d88', '#6d9d88', 
'#ff5f2e', '#ff5f2e', '#fcbe32', '#fcbe32'];
let Color_Pic = Color.slice();
let Color_Set = [];
let Click_pg = true;
let Clicked_Card = [];
let Completion_Card = [];
let Start_Time;
function Shuffle() {
  for (let i = 0; Color_Pic.length > 0; i += 1) {
    Color_Set = Color_Set.concat(Color_Pic.splice(Math.floor
    (Math.random() * Color_Pic.length), 1));
  } 
}

function Card_Setting(Row, Column) {
  Click_pg = false;
  for (let i = 0; i < Row * Column; i += 1) {
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = Color_Set[i];  
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) { 
      card.addEventListener('click', function() {
        if (Click_pg && !Completion_Card.includes(c)) {
          c.classList.toggle('flipped');
          Clicked_Card.push(c);
          if (Clicked_Card.length === 2) {
            if (Clicked_Card[0].querySelector('.card-back')
            .style.backgroundColor 
            === Clicked_Card[1].querySelector('.card-back')
            .style.backgroundColor) {
              Completion_Card.push(Clicked_Card[0]);
              Completion_Card.push(Clicked_Card[1]);
              Clicked_Card = [];
              if (Completion_Card.length === 12) {
                let Last_Time = new Date();
                alert('異뺥븯�⑸땲��!' + (Last_Time - Start_Time) / 1000 
                + '珥� 嫄몃졇�듬땲��.');
                document.querySelector('#wrapper').innerHTML = '';
                  //
                Color_Pic = Color.slice();
                Color_Set = [];
                Completion_Card = [];
                Start_Time = null;
                Shuffle();
                Card_Setting(Row, Column);
              }
            } else { 
              Click_pg = false;
              setTimeout(function() {
                Clicked_Card[0].classList.remove('flipped');
                Clicked_Card[1].classList.remove('flipped');
                Click_pg = true;
                Clicked_Card = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector('#wrapper').appendChild(card);
  }

  document.querySelectorAll('.card').forEach(function (card, index) 
  {
    setTimeout(function() {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function() {
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.remove('flipped');
    });
    Click_pg = true;
    Start_Time = new Date();
  }, 5000);
}

Shuffle();
Card_Setting(Row, Column);
                            
