$(document).ready(function () {
    // Handle Rule Creation Form Submission
    $('#create-rule-form').on('submit', function (e) {
        e.preventDefault();

        const ruleInput = $('#rule').val().trim();
        if (!ruleInput) {
            alert('Please enter a valid rule.');
            return;
        }

        $.ajax({
            method: 'POST',
            url: '/create_rule',
            contentType: 'application/json',
            data: JSON.stringify({ ruleText: ruleInput }),
            success: function (response) {
                if (response.status === 'success') {
                    alert('Rule has been successfully created!');
                    $('#ast').val(JSON.stringify(response.ast, null, 2));
                } else {
                    showError('An error occurred while creating the rule.', response.message);
                }
            },
            error: function (xhr) {
                showError('Failed to create rule.', xhr.responseJSON ? xhr.responseJSON.message : 'Unknown error');
            }
        });
    });

    // Handle Rule Evaluation Form Submission
    $('#evaluate-rule-form').on('submit', function (e) {
        e.preventDefault();

        const astInput = $('#ast').val().trim();
        const dataInput = $('#data').val().trim();

        // Validate JSON format before making the request
        let parsedAST, parsedData;
        try {
            parsedAST = JSON.parse(astInput);
            parsedData = JSON.parse(dataInput);
        } catch (parseError) {
            alert('Ensure both AST and Data are in valid JSON format.');
            return;
        }

        $.ajax({
            method: 'POST',
            url: '/evaluate_rule',
            contentType: 'application/json',
            data: JSON.stringify({ ast: parsedAST, data: parsedData }),
            success: function (response) {
                const resultElement = $('#result');
                if (response.status === 'success') {
                    resultElement.text(`Result: ${response.result}`);
                    if (response.result) {
                        resultElement.removeClass('result-false').addClass('result-true');
                    } else {
                        resultElement.removeClass('result-true').addClass('result-false');
                    }
                } else {
                    showError('Error during rule evaluation.', response.message);
                }
            },
            error: function (xhr) {
                showError('Failed to evaluate rule.', xhr.responseJSON ? xhr.responseJSON.message : 'Unknown error');
            }
        });
    });

    // Centralized error handler
    function showError(title, message) {
        alert(`${title} ${message}`);
        console.error(title, message);
    }
});
