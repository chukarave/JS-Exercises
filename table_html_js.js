<style>
/* Defines a cleaner look for tables */
table  { border-collapse: collapse; }
td, th { border: 1px solid black; padding: 3px 8px; }
th     { text-align: left; }
</style>

<script>
/*
 * first part of the function creates
 * an array of properties,
 * assignes the table and the table row elements
 * and appends the together.
 */
function buildTable(data) {
    var headers = Object.keys(data[0]);
    var table = document.createElement('table');
    var tr = document.createElement('tr');  
    table.appendChild(tr);
    /*
     * This loop takes the headers array
     * and loops on it. it fills the cells with
     * the header text and appends it to the
     * table structure
     */
    headers.forEach(function(h) {
        var th = document.createElement('th');
        th.textContent =h;
        tr.appendChild(th);
    });

    /*
     * This loop first creates an element for each row
     * of the table and then loops over each object element
     * to fill each cell with text. 
     * The entered text is set using
     * current_data_row[current_header]
     */
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
