$(document).ready(function() {
    fetchUsers();

    // Handle form submission
    $('#userForm').submit(function(event) {
        event.preventDefault();

        const user = {
            name: $('#name').val(),
            email: $('#email').val()
        };

        $.ajax({
            url: '/users',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function(response) {
                $('#name').val('');
                $('#email').val('');
                fetchUsers();
            }
        });
    });
});

function fetchUsers() {
    $.get('/users', function(users) {
        const userTable = $('#userTable');
        userTable.empty();

        users.forEach(function(user) {
            const row = `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>
                                <button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                            </td>
                        </tr>`;
            userTable.append(row);
        });
    });
}

function editUser(id) {
    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");

    if (name && email) {
        $.ajax({
            url: `/users/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: name, email: email }),
            success: function(response) {
                fetchUsers();
            }
        });
    }
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
            url: `/users/${id}`,
            method: 'DELETE',
            success: function(response) {
                fetchUsers();
            }
        });
    }
}