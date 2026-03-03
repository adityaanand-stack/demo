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

  function renderTable(rows) {
    tableWrapper.innerHTML = '';

    if (!rows.length) {
      tableWrapper.textContent = 'No data available';
      return;
    }

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    Object.keys(rows[0]).forEach((key) => {
      const th = document.createElement('th');
      th.textContent = key;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    rows.forEach((row) => {
      const bodyRow = document.createElement('tr');

      Object.values(row).forEach((val) => {
        const td = document.createElement('td');
        td.textContent = val;
        bodyRow.appendChild(td);
      });

      tbody.appendChild(bodyRow);
    });

    table.appendChild(tbody);
    tableWrapper.appendChild(table);
  }

  async function fetchSheet(sheetName) {
    try {
      const url = `${sheetUrl}.json?sheet=${sheetName}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      if (!json.data) {
        tableWrapper.textContent = 'No data found';
        return;
      }

      renderTable(json.data);
    } catch (error) {
      tableWrapper.textContent = 'Error loading data';
    }
  }

  dropdown.addEventListener('change', () => {
    fetchSheet(dropdown.value);
  });

  fetchSheet('data');
}
