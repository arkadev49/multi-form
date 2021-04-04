/*
 * -----------------------
 *    Global Constants
 * -----------------------
 */

// Button for Deleting Name
const crossBtn =
    '<button type="button" class="cross name-delete-btn">x</button>';

// Button for Adding Name
const plusBtn = '<button type="button" class="plus name-add-btn">+</button>';

// Button for removing subject
const subjectRemoveButton =
    '<button type="button" onclick="subjectRemoveButtonClick(event)" class="remove-subject-btn">x</button>';

/*
 * -----------------------------------------------------------------------------------
 *     This function is triggered once the plus button in the name box is clicked
 * -----------------------------------------------------------------------------------
 */

function nameAddButtonClick(event) {
    // Getting the name input element corresponding to the Plus Button click event.
    let nameItem = event.target.parentNode;
    // Value of the current element
    const val = nameItem.querySelector("input").value;
    // Removing the Plus Button from the current name item.
    nameItem.removeChild(event.target);
    // Creating a copy of the input element
    let cloneNode = nameItem.cloneNode(true);
    // Inserting a Cross button in place of the plus button
    nameItem.innerHTML += crossBtn;
    // Adding an event listener for the newly added cross button
    nameItem
        .querySelector("button")
        .setAttribute("onclick", "nameRemoveButtonClick(event)");
    // Getting the list of name items
    let nameItems = nameItem.parentNode;
    // Adding a plus button in the newly copied input element
    cloneNode.innerHTML += plusBtn;
    // Handling the label text to display before each input box viz. 1, 2, 3, ... etc. etc..
    if (nameItem.querySelector("label").innerText === "Subject Name : ") {
        // Handing label in case the plus button is clicked first time
        nameItem.querySelector("label").innerText = "Subject Name 1 : ";
        cloneNode.querySelector("label").innerText = "Subject Name 2 : ";
    } else {
        // Handing label in case the plus button is already clicked one or more time
        const n = +nameItem.querySelector("label").innerText.trim().split(" ")[2];
        cloneNode.querySelector("label").innerText = `Subject Name ${n + 1} : `;
    }
    // Adding plus button event listener to the button in the copied input element
    cloneNode
        .querySelector("button")
        .setAttribute("onclick", "nameAddButtonClick(event)");
    // Setting the value of the name input field back again.
    nameItem.querySelector("input").value = val;
    // Adding the new input field to the list of input fields
    nameItems.appendChild(cloneNode);
}

/*
 * ------------------------------------------------------------------------------------
 * This function is triggered once any of the cross buttons in the name box is clicked
 * ------------------------------------------------------------------------------------
 */

function nameRemoveButtonClick(event) {
    // Getting the corresponding list of name fields from events
    const nameItems = event.target.parentNode.parentNode;
    // from the list of names, remove the corresponding input field
    nameItems.removeChild(event.target.parentNode);
    // Handling the label for each name field under the corresponding list of names box so that they be in proper order
    const arr = nameItems.querySelectorAll(".name-box-item");
    console.log(arr);
    if (arr.length === 1) {
        arr[0].querySelector("label").innerText = "Subject Name : ";
    } else {
        let acc = 1;
        arr.forEach((item) => {
            item.querySelector("label").innerText = `Subject Name ${acc++} : `;
        });
    }
}

/*
 * --------------------------------------------------------------------------------------
 *     This function is triggered once the plus button in the subject box is clicked
 * --------------------------------------------------------------------------------------
 */

function subjectAddButtonClick(event) {
    // Getting the subject list from event
    const subjectBoxList = event.target.parentNode.parentNode.parentNode;
    // Getting the corresponding subject box
    const subjectBox = event.target.parentNode.parentNode;
    // Handling the labelling of the subject box
    let n;
    if (subjectBox.querySelector("h2").innerText === "Subject") {
        subjectBox.querySelector("h2").innerText = "Subject 1";
        n = 2;
    } else {
        n = +subjectBox.querySelector("h2").innerText.split(" ")[1] + 1;
    }

    // Removing the control section of the subject box
    subjectBox.querySelector(".subject-box-controls").removeChild(event.target);

    // Adding the Subject Removal Cross button in the current subject box
    subjectBox.querySelector(
        ".subject-box-controls"
    ).innerHTML = subjectRemoveButton;

    // Creating a new Subject box from the template

    const newElement = document.createElement("div");
    newElement.classList.add("subject-box");
    newElement.innerHTML = `
      <h2>Subject ${n}</h2>
      <hr>
      <label for="code">Subject Code : </label>
      <input type="text" name="code" id="code" placeholder="Code">
      <br><br>
      <label for="code">Stream : </label>
      <input type="text" name="stream" id="stream" placeholder="Stream">
      <br><br>
      <label for="code">Semester : </label>
      <input type="number" name="sem" id="sem" placeholder="Semester">
      <br><br>
      <div class="name-box">
        <span>Subject Name</span><br><br>
        <hr>
        <div class="name-box-items">
          <div class="name-box-item">
            <label>Subject Name : </label>&nbsp;&nbsp;
            <input type="text" name="name">&nbsp;&nbsp;
            <button type="button" onclick="nameAddButtonClick(event)" class="plus name-add-btn">+</button>
          </div>
        </div>
      </div>
      <div class="subject-box-controls">
        <button type="button" onclick="subjectAddButtonClick(event)" class="add-subject-btn">+</button>
      </div>`;

    // Appending the template into the subject box list

    subjectBoxList.appendChild(newElement);
}

/*
 * ---------------------------------------------------------------------------------------------
 *  This function is triggered once any of the cross buttons in any of subject boxes is clicked
 * ---------------------------------------------------------------------------------------------
 */

function subjectRemoveButtonClick(event) {
    // List of subject boxes
    const subjectItems = event.target.parentNode.parentNode.parentNode;
    // from the list of subject boxes, remove the corresponding subject box
    subjectItems.removeChild(event.target.parentNode.parentNode);
    // handing the labelling to be in correct order
    const arr = subjectItems.querySelectorAll(".subject-box");
    if (arr.length === 1) {
        arr[0].querySelector("h2").innerText = "Subject";
    } else {
        let acc = 1;
        arr.forEach((item) => {
            item.querySelector("h2").innerText = `Subject ${acc++}`;
        });
    }
}

/*
 * --------------------------------------------------------------------------------------------
 *  This function will create a object containing all details entered by the user and print it
 * --------------------------------------------------------------------------------------------
 */

function onSubmit(event) {
    event.preventDefault();

    const subjectList = [];

    document.querySelectorAll(".subject-box").forEach((subjectBox) => {
        const names = [];
        let subject = {
            code: subjectBox.querySelector("#code").value,
            stream: subjectBox.querySelector("#stream").value,
            sem: +subjectBox.querySelector("#sem").value,
        };
        subjectBox.querySelectorAll(".name-box-item").forEach((nameBox) => {
            names.push(nameBox.querySelector("input").value);
        });
        if (names.length > 1) {
            subject = {...subject, names};
        } else {
            subject = {...subject, name: names[0]};
        }
        subjectList.push(subject);
    });

    console.log(subjectList);
}
