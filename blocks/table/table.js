export default async function decorate(block) {
  const link = block.querySelector('a');

  if (!link) {
    block.textContent = 'No sheet link found';
    return;
  }

  const sheetUrl = link.href.split('.json')[0]; 
  block.innerHTML = '';

  const dropdown = document.createElement('select');
  dropdown.className = 'sheet-dropdown';

  const sheets = ['data', 'data-2'];

  sheets.forEach((sheet) => {
    const option = document.createElement('option');
    option.value = sheet;
    option.textContent = sheet;
    dropdown.appendChild(option);
  });

  const tableWrapper = document.createElement('div');

  block.append(dropdown, tableWrapper);

  async function fetchSheet(sheetName) {
    try {
      const url = `${sheetUrl}.json?sheet=${sheetName}`;
      console.log('Fetching:', url);

      const resp = await fetch(url);
      const json = await resp.json();

      if (!json.data) {
        tableWrapper.textContent = 'No data found';
        return;
      }

      renderTable(json.data);
    } catch (e) {
      tableWrapper.textContent = 'Error loading data';
      console.error(e);
    }
  }

  function renderTable(rows) {
    tableWrapper.innerHTML = '';

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    Object.keys(rows[0]).forEach((key) => {
      const th = document.createElement('th');
      th.textContent = key;
      tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    rows.forEach((row) => {
      const tr = document.createElement('tr');

      Object.values(row).forEach((val) => {
        const td = document.createElement('td');
        td.textContent = val;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
  }

  dropdown.addEventListener('change', () => {
    fetchSheet(dropdown.value);
  });

  // load first
  fetchSheet('data');
}
