/// <reference lib="dom" />

import { BASE_URL } from "./constants.js";

/**
 * @typedef {"string" | "number" | "boolean"} StructureType
 */

/**
 * @typedef {Object} Elements
 * @property {HTMLDialogElement} dialog
 * @property {Record<string, HTMLInputElement>} inputs
 * @property {HTMLUListElement} list
 * @property {HTMLFormElement} form
 * @property {HTMLButtonElement} createButton
 * @property {HTMLDivElement} container
 * @property {HTMLButtonElement} saveBtn
 * @property {HTMLButtonElement} cancelBtn
 */

export default class ContentBuilder {
    /** @type {string} */
    tableName = "";

    /** @type {Record<string, StructureType>} */
    structure = {};

    /** @type {Elements} */
    elements = {
        container: null,
        createButton: null,
        dialog: null,
        form: null,
        inputs: {},
        list: null,
        saveBtn: null,
        cancelBtn: null,
    };

    /**
     * @param {Record<string, StructureType>} structure
     * @param {string} tableName
     * */
    constructor(structure, tableName) {
        this.tableName = tableName;
        this.structure = structure;

        this.initElements();
    }

    setList() {
        const list = document.querySelector("#items-list");

        if (!list) {
            console.error("no list found");
            return;
        }

        this.elements.list = list;
    }

    buildContainer() {
        const con = document.createElement("div");
        con.classList.add("container");

        return con;
    }

    buildCreateButton() {
        const btn = document.createElement("button");
        btn.id = "create";
        btn.classList.add("btn");
        btn.textContent = "📝 Create";

        return btn;
    }

    buildDialog() {
        const dialog = document.createElement("dialog");

        return dialog;
    }

    /** @param {string} title */
    buildForm(title) {
        const form = document.createElement("form");
        const formTitle = document.createElement("h2");
        formTitle.textContent = title;
        formTitle.id = "form-title";
        form.appendChild(formTitle);

        return form;
    }

    buildFormButtonsContainer() {
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("form-btn-container");

        return btnContainer;
    }

    buildCancelButton() {
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "👈 Cancel";
        cancelBtn.classList.add("btn", "secondary");
        cancelBtn.id = "close";

        return cancelBtn;
    }

    buildSubmitButton() {
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "💾 Save";
        saveBtn.classList.add("btn");
        saveBtn.type = "submit";
        saveBtn.id = "submit";

        return saveBtn;
    }

    /** @param {string} key */
    buildInput(key) {
        const label = document.createElement("label");
        const text = document.createElement("p");
        const input = document.createElement("input");

        label.classList.add("label");
        text.textContent = key;
        input.type = "text";
        input.classList.add("text-input");
        input.id = key;

        label.appendChild(text);
        label.appendChild(input);

        return label;
    }

    /** @param {number} id */
    getRowValues(id) {
        const rowMap = {};

        Object.keys(this.structure).forEach((key) => {
            const val = document.querySelector(`#${key}-${id}`).textContent;
            rowMap[key] = val;
        });

        return rowMap;
    }

    getFormState() {
        return Object.entries(this.elements.inputs).reduce(
            (acc, [key, input]) => ({
                ...acc,
                [key]: input.value,
            })
        );
    }

    /** @param {Record<string, string | number | boolean>} inputs*/
    setFormState(inputs) {
        Object.entries(inputs).forEach(([key, val]) => {
            this.elements.inputs[key].value = val;
        });
    }

    handleCreateButton() {
        this.elements.createButton.addEventListener("click", () => {
            this.elements.dialog.showModal();
        });
    }

    handleCancelButton() {
        this.elements.cancelBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.elements.dialog.close();
        });
    }

    handleSubmitButton() {
        this.elements.saveBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            this.elements.dialog.close();
        });
    }

    handleListClick() {
        this.elements.list.addEventListener("click", (event) => {
            if (!(event.target instanceof HTMLButtonElement)) {
                return;
            }

            const [action, itemId] = event.target.id.split("-");

            console.log(action, this.getRowValues(itemId));
        });
    }

    initElements() {
        this.setList();
        const container = this.buildContainer();
        const createBtn = this.buildCreateButton();
        const dialog = this.buildDialog();
        const form = this.buildForm();
        const formBtnContainer = this.buildFormButtonsContainer();
        const cancelBtn = this.buildCancelButton();
        const submitBtn = this.buildSubmitButton();

        formBtnContainer.appendChild(cancelBtn);
        formBtnContainer.appendChild(submitBtn);

        Object.entries(this.structure).map(([key]) => {
            const input = this.buildInput(key);
            form.appendChild(input);
            this.elements.inputs[key] = input;
        });

        form.appendChild(formBtnContainer);
        dialog.appendChild(form);
        container.appendChild(createBtn);
        container.appendChild(dialog);
        document.body.appendChild(container);

        this.elements.createButton = createBtn;
        this.elements.dialog = dialog;
        this.elements.form = form;
        this.elements.cancelBtn = cancelBtn;
        this.elements.saveBtn = submitBtn;

        this.handleCreateButton();
        this.handleCancelButton();
        this.handleSubmitButton();
        this.handleListClick();
    }

    initListeners() {}

    /** @param {Record<string, StructureType>} payload */
    async handleCreate(payload) {
        const res = await fetch(`${BASE_URL}/${this.tableName}/api`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const json = await res.json();
            console.log(json);
        }
    }

    /**
     * @param {string} id
     * @param {Record<string, StructureType>} payload
     */
    async handleEdit(id, payload) {
        const res = await fetch(`${BASE_URL}/${this.tableName}/api/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const json = await res.json();
            console.log(json);
        }
    }

    /** @param {string} id */
    async handleDelete(id) {
        const res = await fetch(`${BASE_URL}/${this.tableName}/api/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.ok) {
            const json = await res.json();
            console.log(json);
        }
    }
}
