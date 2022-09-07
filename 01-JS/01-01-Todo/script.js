const ulTasks = document.querySelector("#task-list");
const txtTask = document.querySelector("#txtTask");
const btnSaveTask = document.getElementById("btnSaveTask");
const btnClearTasks = document.getElementById("btnClearTasks");
const btnCancelTask = document.querySelector("#btnCancelTask");
const slcTags = document.querySelector("#slcTags");
const slcTaskStatuses = document.querySelector("#slcTaskStatuses");
const lblTaskCount = document.querySelector("#lblTaskCount");
const tasksKey = "tasks";
const tagsKey = "tags";
let tasks = JSON.parse(localStorage.getItem(tasksKey));
let tags = JSON.parse(localStorage.getItem(tagsKey));
if (!tags) {
    tags = [
        { id: 1, name: "work" },
        { id: 2, name: "payment" },
        { id: 2, name: "fuel" },
        { id: 3, name: "weekend" },
        { id: 4, name: "movie" },
        { id: 5, name: "personal" },
        { id: 6, name: "health" },
        { id: 7, name: "holiday" },
        { id: 8, name: "fun" },
        { id: 9, name: "lunch" },
        { id: 10, name: "dinner" },
        { id: 11, name: "car" },
        { id: 12, name: "home" }
    ].sort((previous, next) => previous.name.localeCompare(next.name));
    localStorage.setItem(tagsKey, JSON.stringify(tags));
}

const sounds = [
    { name: "ding", src: "assets/sound/ding.mp3" },
    { name: "applause", src: "assets/sound/applause.mp3" },
    { name: "applause2", src: "assets/sound/applause2.wav" },
    { name: "click", src: "assets/sound/click.wav" },
    { name: "success", src: "assets/sound/success.mp3" },
    { name: "delete", src: "assets/sound/delete.mp3" },
    { name: "tada", src: "assets/sound/tada.mp3" }
];
const bsColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"];
tags.forEach(t => slcTags.innerHTML += `<option value="${t.id}">${t.name}</option>`);

//https://github.com/taijinlee/humanize
const elapsedTimeToNow = function (timestamp) {
    timestamp = (timestamp === undefined) ? Date.now() : timestamp;
    const currTime = Date.now();
    const timeDiff = (currTime - timestamp) / 1000;

    const oneDay = 86400;
    const d = new Date();
    const today = (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime() / 1000;

    if (timestamp < today && timestamp >= today - oneDay) {
        return 'yesterday';
    } else if (timestamp >= today && timestamp < today + oneDay) {
        return 'today';
    } else if (timestamp >= today + oneDay && timestamp < today + 2 * oneDay) {
        return 'tomorrow';
    }

    // within 2 seconds
    if (timeDiff < 2 && timeDiff > -2) {
        return (timeDiff >= 0 ? 'just ' : '') + 'now';
    }

    // within a minute
    if (timeDiff < 60 && timeDiff > -60) {
        return (timeDiff >= 0 ? Math.floor(timeDiff) + ' seconds ago' : 'in ' + Math.floor(-timeDiff) + ' seconds');
    }

    // within 2 minutes
    if (timeDiff < 120 && timeDiff > -120) {
        return (timeDiff >= 0 ? 'about a minute ago' : 'in about a minute');
    }

    // within an hour
    if (timeDiff < 3600 && timeDiff > -3600) {
        return (timeDiff >= 0 ? Math.floor(timeDiff / 60) + ' minutes ago' : 'in ' + Math.floor(-timeDiff / 60) + ' minutes');
    }

    // within 2 hours
    if (timeDiff < 7200 && timeDiff > -7200) {
        return (timeDiff >= 0 ? 'about an hour ago' : 'in about an hour');
    }

    // within 24 hours
    if (timeDiff < 86400 && timeDiff > -86400) {
        return (timeDiff >= 0 ? Math.floor(timeDiff / 3600) + ' hours ago' : 'in ' + Math.floor(-timeDiff / 3600) + ' hours');
    }

    // within 2 days
    var days2 = 2 * 86400;
    if (timeDiff < days2 && timeDiff > -days2) {
        return (timeDiff >= 0 ? '1 day ago' : 'in 1 day');
    }

    // within 29 days
    var days29 = 29 * 86400;
    if (timeDiff < days29 && timeDiff > -days29) {
        return (timeDiff >= 0 ? Math.floor(timeDiff / 86400) + ' days ago' : 'in ' + Math.floor(-timeDiff / 86400) + ' days');
    }

    // within 60 days
    var days60 = 60 * 86400;
    if (timeDiff < days60 && timeDiff > -days60) {
        return (timeDiff >= 0 ? 'about a month ago' : 'in about a month');
    }

    var currTimeYears = parseInt(humanize.date('Y', currTime), 10);
    var timestampYears = parseInt(humanize.date('Y', timestamp), 10);
    var currTimeMonths = currTimeYears * 12 + parseInt(humanize.date('n', currTime), 10);
    var timestampMonths = timestampYears * 12 + parseInt(humanize.date('n', timestamp), 10);

    // within a year
    var monthDiff = currTimeMonths - timestampMonths;
    if (monthDiff < 12 && monthDiff > -12) {
        return (monthDiff >= 0 ? monthDiff + ' months ago' : 'in ' + (-monthDiff) + ' months');
    }

    var yearDiff = currTimeYears - timestampYears;
    if (yearDiff < 2 && yearDiff > -2) {
        return (yearDiff >= 0 ? 'a year ago' : 'in a year');
    }

    return (yearDiff >= 0 ? yearDiff + ' years ago' : 'in ' + (-yearDiff) + ' years');
}

const timeDiff = (time1, time2) => {
    const diffAsSeconds = Math.round((time2 - time1) / 1000);

    let diffAsString;

    const minutes = Math.round(diffAsSeconds / 60);
    const hours = Math.random(minutes / 60);
    const days = Math.random(hours / 24);

    if (minutes > 1) {
        diffAsString = "about " + minutes + " minutes";
    }
    else {
        diffAsString = "about " + diffAsSeconds + " seconds";
    }

    if (hours > 1) {
        diffAsString = "about " + hours + " minutes";
    }

    if (days > 1) {
        diffAsString = "about " + days + " days";
    }

    return diffAsString;
}


const takeNewId = (array) => {
    const ids = array?.map(t => t.id);
    let maxNumber;
    if (ids?.length > 0) maxNumber = Math.max(...ids);
    else maxNumber = 0;
    return maxNumber + 1;
}

const playAudio = (name, src) => {
    const soundFile = sounds.find(s => s.name == name);
    if (soundFile) {
        const audio = new Audio(soundFile.src);
        audio?.play();
    }
    else
        console.warn(`${name} sound is not found`);
}

const reloadTaskCount = (tasks) => {
    if (typeof tasks == "object") {
        lblTaskCount.textContent = `${tasks?.length} tasks found.`
    }
    else if (typeof tasks == "number") {
        lblTaskCount.textContent = `${tasks} tasks found.`
    }
    else {
        lblTaskCount.textContent = `0 tasks found.`
    }
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let bsColorIndex = 0;
let isBgLight = true;
const createLiHtml = (task) => {
    const checked = task?.status == "completed" ? "checked" : "";
    let li = `    
    <li class="task list-group-item ${isBgLight ? "bg-light" : null}" id="li${task.id}">     
    <div class="container"> 
        <div class="row d-flex justify-content-between">
            <div>
                <h5 id="lbl${task.id}" class="form-check-label ${checked}">${task.id}-${task.name}&nbsp;</h5>
            </div>
        `;
    let tagsHtml = "";
    const isFavorited = task.isFavorited ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    const progressStatus = task.status == "progress" ? '<i class="fa-solid fa-circle-play"></i>' : '<i class="fa-regular fa-circle-play"></i>';
    const isDisableProgress = task.status == "completed" ? "disabled" : null;
    const buttonTypeForCompleteBtn = task.status == "completed" ? '<i class="fa-solid fa-arrow-rotate-left"></i>' : '<i class="fa-solid fa-check">';
    const titleTypeForCompleteBtn = task.status == "completed" ? "Reopen" : "Complete";

    li += `
            <div>                      
                <button type="button" class="btn btn-sm btn-success-light" title='${titleTypeForCompleteBtn} "${task.name}" task' onclick="${task.status == "completed" ? `reopenTask(${task.id},this)` : `completeTask(${task.id},this)`}">${buttonTypeForCompleteBtn}</i></button>                           
                <button type="button" class="btn btn-sm btn-primary-light" title='Favorite "${task.name}" task' onclick="changeFavoriteStatusTask(${task.id},this)">${isFavorited}</button>                           
                <button type="button" class="btn btn-sm btn-success-light" title='Progress "${task.name}" task' onclick="changeProgressStatusTask(${task.id},this)" ${isDisableProgress}>${progressStatus}</button>
                <button type="button" class="btn btn-sm btn-warning-light" title='Edit "${task.name}" task' onclick="editTask(${task.id},this)"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btn btn-sm btn-danger-light"  title='Delete "${task.name}" task' onclick="deleteTask(${task.id},this)"><i class="fa-solid fa-trash"></i></button>               
            </div>
        </div>
        `;

    if (task.tagIds?.length > 0) {
        tagsHtml = '<div class="row pt-2">';
        for (const tagId of task.tagIds) {
            const tag = tags.find(t => t.id === tagId);
            const tagCount = tasks.filter(t => t.tagIds.includes(tagId)).length;

            let tagHtml = `                        
                <button type="button" class="btn btn-sm badge badge-${bsColors[bsColorIndex]} mr-1" onclick="getTasksByTag(${tag.id},this)">${tag.name}
                    <span class="badge badge-light">${tagCount}</span>
                </button> 
                `;

            if (bsColorIndex < bsColors.length - 2) {
                bsColorIndex++;
            }
            else bsColorIndex = 0;
            tagsHtml += tagHtml;
        }
        tagsHtml += "</div>";
    }
    if (tagsHtml != "") {
        li += tagsHtml;
    }

    li += `     <div class="row card mt-2">
                    <div class="card-header d-flex justify-content-between">                    
                        <span><i class="fa-solid fa-calendar-days"></i> ${datetimeAsString(new Date(task.createdDate))}</span>
                        <span><i class="fa-regular fa-clock"></i> ${elapsedTimeToNow(task.createdDate)}</span>
                    </div>
                    <span class="badge badge-dark">${capitalizeFirstLetter(task.status)}</span>
                    `;

    if (task.status == "completed" && task.completedTime) {
        li += `
                <div class="card-footer d-flex justify-content-between">
                    <span><i class="fa-solid fa-square-check"></i> ${datetimeAsString(new Date(task.completedTime))}</span>
                    <span><i class="fa-solid fa-hourglass-end"></i> ${timeDiff(new Date(task.createdDate), new Date(task.completedTime))}</span>
                </div>
                `;
    }

    li += `
                </div>
            </div>
        </li>`;

    isBgLight = !isBgLight;
    return li;
}

const datetimeAsString = (d) => {
    return `${d.toLocaleDateString()} - ${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;
}

$("#slcTaskStatuses").chosen().val(Array.from(slcTaskStatuses.children).map(o => o.value)).trigger("chosen:updated");
$("#slcTaskStatuses").chosen().change((e) => {
    console.log("select tasks changed");
    const selectedTasks = getTasksBySelect()?.tasks;
    if (selectedTasks) {
        if (selectedTasks.length == 0)
            ulTasks.innerHTML = '<div class="alert alert-danger">No task for selected statuses!</div>';
        else {
            for (const task of selectedTasks) {
                const li = createLiHtml(task);
                ulTasks.insertAdjacentHTML("beforeend", li);
            }
        }
    }
    showTasks(selectedTasks);
});

const getTasksBySelect = () => {
    const selectedOptions = Array.from(slcTaskStatuses.selectedOptions);
    const selectedValues = selectedOptions.map(o => o.value);
    const selectedStatuses = selectedOptions.map(o => o.textContent);

    let selectedTasks = [];
    if (selectedOptions.length > 0 && tasks?.length > 0) {
        for (const selectedStatus of selectedStatuses) {
            const tasksToSelected = tasks?.filter(t => t.status.toLowerCase() == selectedStatus.toLowerCase());
            tasksToSelected?.forEach(t => selectedTasks.push(t));
        }

        if (selectedValues.includes("2")) {
            selectedTasks = selectedTasks.filter(t => !t.isFavorited);
            tasks?.forEach(t => {
                if (t.isFavorited) {
                    selectedTasks.push(t);
                }
            });
        }
        return {
            tasks: selectedTasks,
            values: selectedValues
        };
    }
}

const showTasks = (tasks) => {
    ulTasks.innerHTML = "";
    bsColorIndex = 0;

    tasks = tasks ? tasks : getTasksBySelect()?.tasks;
    if (tasks?.length > 0) {
        tasks = tasks.sort((a, b) => b.id - a.id);
        for (const task of tasks) {
            const li = createLiHtml(task);
            ulTasks.insertAdjacentHTML("beforeend", li);
        }
    }
    else
        ulTasks.innerHTML = '<div class="alert alert-danger">No any task!</div>';

    $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
    reloadTaskCount(tasks);
}

const clearElements = () => {
    $("#slcTags").chosen().val([]).trigger("chosen:updated");
    $("#slcTaskStatuses").chosen().change();
    txtTask.value = "";
    btnCancelTask.setAttribute("disabled", "");
}

let taskToEdit;
const editTask = (id, button) => {
    btnCancelTask.removeAttribute("disabled");
    const liToEdit = button.closest("li");
    for (const li of ulTasks.children) {
        li.classList.remove("bg-warning-light");
    }
    liToEdit.classList.remove("bg-light");
    liToEdit.classList.add("bg-warning-light");
    taskToEdit = tasks.find(t => t.id == id);
    txtTask.value = taskToEdit.name;
    $("#slcTags").chosen().val(taskToEdit.tagIds).trigger("chosen:updated");
}

showTasks(tasks);

let saveTheSameName = false;
const saveTask = (taskName) => {

    taskName = taskName?.trim();
    if (tasks?.find(t => t.name == taskName) && !saveTheSameName && !taskToEdit) {
        showModal("Exist Task"
            , `"${taskName} task is already exist!
                   Do you still want to save another one with the same name?"`
            , () => {
                saveTheSameName = true;
                saveTask(taskName);
            }
            , true
        );
    }
    else if (taskName?.length > 0) {
        const selectedOptions = Array.from(slcTags.selectedOptions);
        const selectedTags = selectedOptions.map(o => o.textContent);
        let tagIds = [];
        tags.filter(t => {
            for (const selectedTag of selectedTags) {
                if (t.name == selectedTag) {
                    tagIds.unshift(t.id);
                }
            }
        })

        if (!tasks) {
            tasks = [];
        }

        if (!taskToEdit) {
            const newTask = {
                id: takeNewId(tasks),
                name: taskName,
                status: "open",
                createdDate: Date.now(),
                completedTim: null,
                isFavorited: false,
                tagIds: tagIds
            };
            tasks.unshift(newTask);

            let selectedValues = getTasksBySelect().values;
            if (!selectedValues.includes("0")) {
                selectedValues.unshift("0");
            }

            $("#slcTaskStatuses").chosen().val(selectedValues).trigger("chosen:updated");

            console.log("added task", newTask);
        }
        else {
            taskToEdit.name = taskName;
            taskToEdit.tagIds = tagIds;
        }

        localStorage.setItem(tasksKey, JSON.stringify(tasks));
        taskToEdit = undefined;
        showTasks(tasks);
        clearElements();
        txtTask.focus();
    }
    else {
        showModal("Empty Task", "Task name cannot be blank!");
    }
    saveTheSameName = false;
}

const completeTask = (id, button) => {
    const taskToComplete = tasks.find(t => t.id == id);
    if (taskToComplete.status.toLowerCase() == "completed") {
        showModal("Completed Task", `"${taskToComplete.name}" task is already done!`);
    }
    else {
        taskToComplete.status = "completed";
        taskToComplete.completedTime = Date.now();
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
        console.log("completed task", taskToComplete);
        playAudio("tada");
        const li = button.closest("li");
        $(li).fadeOut("1000", () => $("#slcTaskStatuses").chosen().change());
    }
}

const changeProgressStatusTask = (id, button) => {
    const progressToTask = tasks.find(t => t.id === id);
    if (progressToTask.status == "progress")
        progressToTask.status = "open";
    else
        progressToTask.status = "progress";

    changeStatus("click");
}

const changeFavoriteStatusTask = (id, button) => {
    const taskToFavoriteStatus = tasks.find(t => t.id === id);
    if (taskToFavoriteStatus.isFavorited)
        taskToFavoriteStatus.isFavorited = false
    else
        taskToFavoriteStatus.isFavorited = true;

    changeStatus();
}

const reopenTask = (id, button) => {
    const taskToRepoen = tasks.find(t => t.id === id);
    taskToRepoen.status = "open";
    changeStatus("success");
}

const changeStatus = (audio = "ding") => {
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
    playAudio(audio);
    $("#slcTaskStatuses").chosen().change();
}

const deleteTask = (id, button) => {
    let taskToDelete = tasks?.find(t => t.id == id);
    showModal("Delete Task", `Do you really delete "${taskToDelete.name}?"`, () => {
        taskToDelete = tasks.splice(tasks.findIndex(t => t.id == id), 1);
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
        console.log("deleted task", taskToDelete[0]);
        playAudio("delete");
        const li = button.closest("li");
        $(li).fadeOut("1000", () => $("#slcTaskStatuses").chosen().change());
    }, true);
}

const clearTasks = () => {
    showModal("Delete Tasks", "Do you really delete all tasks?", () => {
        tasks = null;
        localStorage.removeItem(tasksKey);
        playAudio("delete.mp3");
        $("#task-list>li").fadeOut("1000", $("#slcTaskStatuses").chosen().change());
    }, true);
}

const getTasksByTag = (id, button) => {
    $("#slcTaskStatuses").chosen().val([]).trigger("chosen:updated");
    const tasksByTag = tasks.filter(t => t.tagIds.includes(id));
    showTasks(tasksByTag);
}


const addNewTag = (newTag) => {
    if (newTag) {
        if (tags.find(tag => tag.name == newTag)) {
            showModal("Exist Tag", "This tag is already exist!");
        }
        else {
            const id = takeNewId(tags);
            tags.push({ id: id, name: newTag });
            localStorage.setItem(tagsKey, JSON.stringify(tags));
            var newOption = $(`<option value="${id}">${newTag}</option>`);
            $('#slcTags').append(newOption);
            $("#slcTags").trigger("chosen:updated");
        }
    }
};

btnSaveTask.addEventListener("click", () => {
    saveTask(txtTask.value);
}
);
btnClearTasks.addEventListener("click", clearTasks);
txtTask.addEventListener("keyup", (e) => {
    if (txtTask.value.length > 0) {
        btnCancelTask.removeAttribute("disabled");
    }
    else {
        btnCancelTask.setAttribute("disabled", "");
    }

    if (e.key == "Enter") {
        const taskName = txtTask.value.trim();
        saveTask(taskName);
    }
})

btnCancelTask.addEventListener("click", () => {
    clearElements();
});

$("#slcTags").chosen({ max_selected_options: 5 });
$("#slcTags").bind("chosen:maxselected", () => showModal("Enough Tags", "Up to 5 labels can be selected!"));
document.querySelector(".chosen-search-input").addEventListener("keyup", (e) => {
    const noResultSpan = document.querySelector(".no-results span");

    if (noResultSpan != null && !noResultSpan?.textContent.includes("add")) {
        noResultSpan.textContent += ' - Press "Enter" key to add the new tag';
    }

    const select = e.target.closest("div").previousElementSibling;

    if (select?.id == slcTags.id && e.key == "Enter") {
        if (noResultSpan) {
            const newTag = noResultSpan.textContent.split("-")[0].trim();
            noResultSpan.parentElement.style.display = "none";
            showModal("New Tag", `Do you create a new tag for "${newTag}"`, () => addNewTag(newTag), true);
        }
        else if (document.querySelector(".chosen-search-input").value == "" && e.key == "Enter") {
            saveTask(txtTask.value.trim());
        }
    }
});

const showModal = (title, body, saveFn, showSaveChangesBtn = false) => {
    $(".modal").remove();
    const modalHtml = `
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>${body}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btnClose" data-dismiss="modal">Close</button>
                    ${showSaveChangesBtn ? '<button type="button" class="btn btn-primary btnSave">Yes</button>' : ""}
                </div>
            </div>
        </div>
    </div>`;

    document.querySelector(".container").insertAdjacentHTML("beforeend", modalHtml);
    $(".modal").modal("show");

    document.querySelector(".modal .btnClose").onclick = () => {
        $(".modal").modal("hide");
    };

    if (showSaveChangesBtn) {
        document.querySelector(".modal .btnSave").onclick = () => {
            if (saveFn) {
                saveFn();
                $(".modal").modal("hide");
            };
        }
    }
}