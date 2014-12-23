<style>
  /* Defines a cleaner look for tables */
  table  { border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 3px 8px; }
  th     { text-align: left; }
</style>
// -------This is WIP------------
<script>
function buildTable(data) {
var obj = Object.keys(data);
var table = document.createElement('table');

for (var i in data) {
var prop = data[i];
var th = document.createElement('th');
  prop = document.createTextNode(prop);
th.appendChild(prop);
};

for (var i = 0; i < data.length; i++) {
 var child = data[i];
 var td = document.createElement('td');
     child = document.createTextNode(child);
 td.appendChild(child);

}
table = table.appendChild(th);

return table;
}
document.body.appendChild(buildTable(MOUNTAINS));
</script>
