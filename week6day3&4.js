$(document).ready(function () {
    let comments = [];

    
    $('#submit-comment').on('click', function () {
        const displayName = $('#display-name').val();
        const commentText = $('#comment').val();

        if (displayName && commentText) {
            const commentObj = {
                id: Date.now(), 
                displayName: displayName,
                text: commentText
            };

            comments.unshift(commentObj); 
            renderComments();
            $('#display-name').val('');
            $('#comment').val('');
        }
    });

    
    function renderComments() {
        $('#comment-section').empty();
        comments.forEach(comment => {
            $('#comment-section').append(`
                <div class="comment" data-id="${comment.id}">
                    <div class="content">
                        <strong>${comment.displayName}</strong>: <span class="comment-text">${comment.text}</span>
                    </div>
                    <div class="actions">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            `);
        });
    }

    
    $(document).on('click', '.delete', function () {
        const commentId = $(this).closest('.comment').data('id');
        comments = comments.filter(comment => comment.id !== commentId);
        renderComments();
    });

    
    $(document).on('click', '.edit', function () {
        const commentDiv = $(this).closest('.comment');
        const commentId = commentDiv.data('id');
        const commentText = commentDiv.find('.comment-text').text();

        const newText = prompt('Edit your comment:', commentText);
        if (newText !== null) {
            const comment = comments.find(comment => comment.id === commentId);
            if (comment) {
                comment.text = newText;
                renderComments();
            }
        }
    });
});
