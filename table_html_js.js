<style>
  /* Defines a cleaner look for tables */
  table  { border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 3px 8px; }
  th     { text-align: left; }
</style>

<script>
  function buildTable(data) {
    var headers = Object.keys(data[0]);
    var table = document.createElement('table');
    var tr = document.createElement('tr');  
    table.appendChild(tr);

    headers.forEach(function(h) {
      var th = document.createElement('th');
      th.textContent =h;
      tr.appendChild(th);
    });
    
	console.log(data);
    
    data.forEach(function(d) { 
      var tr = document.createElement('tr');
      table.appendChild(tr);
      headers.forEach(function(h) { 
        var td = document.createElement('td');
        td.textContent = d[h];
        tr.appendChild(td);
      });
    });

    return table;
  };

  document.body.appendChild(buildTable(MOUNTAINS));
</script>
