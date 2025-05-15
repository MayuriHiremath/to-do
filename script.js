$(document).ready(function() {
    let registrations = [];

    $('#registration-form').submit(function(e) {
        e.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let country = $('#country').val();
        registrations.push({ name, email, country });
        displayTable();
        $('#name').val('');
        $('#email').val('');
        $('#country').val('');
    });

    function displayTable() {
        let tableHtml = '';
        registrations.forEach((registration, index) => {
            tableHtml += `
                <tr>
                    <td>${registration.name}</td>
                    <td>${registration.email}</td>
                    <td>${registration.country}</td>
                </tr>
            `;
        });
        $('#registration-table tbody').html(tableHtml);
    }

    $('#filter-input').on('input', function() {
        let filterValue = $(this).val().toLowerCase();
        let filteredRegistrations = registrations.filter(registration => {
            return registration.name.toLowerCase().includes(filterValue) || registration.email.toLowerCase().includes(filterValue);
        });
        displayFilteredTable(filteredRegistrations);
    });

    $('#filter-select').on('change', function() {
        let filterValue = $(this).val();
        let filteredRegistrations = registrations.filter(registration => {
            return registration.country === filterValue;
        });
        displayFilteredTable(filteredRegistrations);
    });

    function displayFilteredTable(filteredRegistrations) {
        let tableHtml = '';
        filteredRegistrations.forEach((registration, index) => {
            tableHtml += `
                <tr>
                    <td>${registration.name}</td>
                    <td>${registration.email}</td>
                    <td>${registration.country}</td>
                </tr>
            `;
        });
        $('#registration-table tbody').html(tableHtml);
    }

    // Sort table rows based on user preferences
    $('#registration-table th').on('click', function() {
        let columnIndex = $(this).index();
        registrations.sort((a, b) => {
            if (columnIndex === 0) {
                return a.name.localeCompare(b.name);
            } else if (columnIndex === 1) {
                return a.email.localeCompare(b.email);
            } else if (columnIndex === 2) {
                return a.country.localeCompare(b.country);
            }
        });
        displayTable();
    });
});
