// script.js

$(document).ready(function() {
    let selectedColor = '#fef3c7'; // Default color
  
    // Load saved notes from localStorage
    function loadNotes() {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      $('#notes-list').empty(); // Clear current notes list
  
      // Render notes
      notes.forEach((note, index) => {
        $('#notes-list').append(`
          <div class="note" style="background-color: ${note.color}">
            <p>${note.content}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </div>
        `);
      });
    }
  
    // Save notes to localStorage
    function saveNotes(notes) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  
    // Select color for the note
    $('.color-option').click(function() {
      selectedColor = $(this).data('color');
      $('.color-option').css('border', '2px solid #ddd'); // Reset border
      $(this).css('border', '2px solid #666'); // Highlight selected color
    });
  
    // Add a new note
    $('#add-note').click(function() {
      const noteContent = $('#note-content').val().trim();
      if (noteContent) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ content: noteContent, color: selectedColor });
        saveNotes(notes);
        loadNotes();
        $('#note-content').val(''); // Clear textarea
      } else {
        alert('Please write a note before adding.');
      }
    });
  
    // Delete a note
    $('#notes-list').on('click', '.delete-btn', function() {
      const noteIndex = $(this).data('index');
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.splice(noteIndex, 1); // Remove the selected note
      saveNotes(notes);
      loadNotes();
    });
  
    // Initial load
    loadNotes();
  });
  