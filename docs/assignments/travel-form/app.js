document
    .getElementById('bookingForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = document.getElementById('age').value;
        const gender =
            document.querySelector('input[name="gender"]:checked')?.value ||
            'Not specified';
        const destination =
            document.getElementById('destination').options[
                document.getElementById('destination').selectedIndex
            ].text;

        // Collect dietary restrictions
        const dietaryRestrictions = [];
        if (document.getElementById('vegetarian').checked)
            dietaryRestrictions.push('Vegetarian');
        if (document.getElementById('kosher').checked)
            dietaryRestrictions.push('Kosher');
        if (document.getElementById('lactosefree').checked)
            dietaryRestrictions.push('Lactose Free');
        const dietaryText =
            dietaryRestrictions.length > 0
                ? dietaryRestrictions.join(', ')
                : 'None';

        // Create the alert message
        const message =
            `127.0.0.1:54070 says:\n` +
            `First name: ${firstName}\n` +
            `Last name: ${lastName}\n` +
            `Age: ${age}\n` +
            `Gender: ${gender}\n` +
            `Location: ${destination}\n` +
            `Dietary restrictions: ${dietaryText}`;

        alert(message);
    });
