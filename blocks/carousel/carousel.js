export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length < 3) return;

  // first row = <<
  const prevRow = rows.shift();

  // last row = >>
  const nextRow = rows.pop();

  // create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  rows.forEach((row) => {
    row.classList.add('carousel-slide');
    track.append(row);
  });

  // convert authored arrows into buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.innerHTML = prevRow.textContent;

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.innerHTML = nextRow.textContent;

  wrapper.append(prevBtn, track, nextBtn);
  block.textContent = '';
  block.append(wrapper);

  let index = 0;
  const total = rows.length;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    update();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    update();
  });

  update();
}
