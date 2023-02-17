
//----------------------------------------------------------------------
/********************** FUNKTIONER **********************/

// Funktion för att visa notisarna när man trycker på 'Get started knappen'
const createBtn = document.getElementById('createToDoList');
createBtn.addEventListener('click', createToDo);

function createToDo() {
  let toDoList = document.getElementById('myToDoList');
  if (toDoList.classList.contains('hidden')) {
    toDoList.classList.remove('hidden');
  } else {
    toDoList.style.display = 'block';
  }
}

const todos = [

];

/********************** SORTERING **********************/
// hade velat göra en switch case istället men få inte till det så få klura på det.

const sortAZ = document.querySelector('.sortNameBtn');
sortAZ.addEventListener('click', sortNameBy);

const sortDeadline = document.querySelector('.sortDeadlineBtn');
sortDeadline.addEventListener('click', sortDeadlineBy);

const sortLatest = document.querySelector('.sortLatestBtn');
sortLatest.addEventListener('click', sortCreatedBy);

function sortNameBy() {
  todos.sort((a, b) => {
    // sortera efter bokstavsordning A-Z

    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  printToDoAssignments();
}

function sortDeadlineBy() {
  todos.sort((a, b) => {
    // sortera efter datum/deadline

    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  printToDoAssignments();
}

function sortCreatedBy() {
  todos.sort((a, b) => {
    // sortera efter när den är skapad

    if (b.createdAt < a.createdAt) {
      return -1;
    }
    if (b.createdAt > a.createdAt) {
      return 1;
    }
    return 0;
  });

  printToDoAssignments();
}

const myList = document.querySelector('#assignmentList'); // ul taggen

printToDoAssignments();

const addAssignmentBtn = document.querySelector('#addAssignmentBtn');
addAssignmentBtn.addEventListener('click', addNewAssignment);

const newAssignmentName = document.querySelector('#addAssignments');
const newDeadline = document.querySelector('#addDate');

function addNewAssignment() {
  if (newAssignmentName.value.length === 0) {
    // görs att inga tomma uppgifter kan läggas till.
    return;
  }

  const assignmentText = newAssignmentName.value;
  const deadlineText = newDeadline.value;
  const createdAtText = new Date().getTime(); // skapar en tid när den lades till.

  const index = todos.findIndex(singleAssignmentObject => singleAssignmentObject.name === assignmentText);
  // kollar om uppgiften redan existerar som ett objekt
  // pusha in ett objekt i array istället

  if (index === -1) {
    todos.push({
      name: assignmentText,
      date: deadlineText,
      createdAt: createdAtText,
    });
    printToDoAssignments();
  }
}

/*
Printa <li> elements av listan
*/

// funktion för att printa det vi vill lägga till
function printToDoAssignments() {
  myList.innerHTML = ''; // görs så att hela listan inte skrivs om igen.

  for (let i = 0; i < todos.length; i++) {
    const assignments = todos[i].name + ' (' + todos[i].date + ')';
    const assignmentNode = document.createElement('li');
    const assignmentTextNode = document.createTextNode(assignments);

    // delete knappen
    const deleteIcon = document.createElement('button');
    deleteIcon.setAttribute('data-name', assignments);
    deleteIcon.classList.add('material-symbols-outlined');
    const deleteIconText = document.createTextNode('close');

    assignmentNode.appendChild(assignmentTextNode);
    assignmentNode.appendChild(deleteIcon); // lägger till en knapp vid varje uppgift
    deleteIcon.appendChild(deleteIconText);

    myList.appendChild(assignmentNode);
  }

  const assignments = Array.from(document.querySelectorAll('li button')); // konverterats till en Array istället för att vara en NodeList samt letar efter li som har button
  assignments.forEach(item => {
    // för varje item dvs. li man klicka på så triggas removeAssignment funktionen
    item.addEventListener('click', removeAssignment);
  });
}

/**
 * Ta bort uppgifter från listan
 * @param {event} e
 */

/********************** TA BORT UPPGIFTER **********************/
function removeAssignment(ev) {
  const clickedAssignment = ev.target.dataset.name;
  const index = todos.findIndex(singleAssignmentObject => singleAssignmentObject.name === clickedAssignment);
  if (index === -1) {
    todos.splice(index, 1);
    printToDoAssignments();
  }
}

/********************** MARKERA UPPGIFTER **********************/
const markAssignment = document.querySelector('ul');
markAssignment.addEventListener(
  'click',
  function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },
  false
);