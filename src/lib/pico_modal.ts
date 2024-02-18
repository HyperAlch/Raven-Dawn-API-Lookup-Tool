// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms
let visibleModal: any = null;

// Toggle modal
function toggleModal(event: any) {
    event.preventDefault();
    const modal = document.getElementById(event.currentTarget.getAttribute("data-target"));
    typeof modal != "undefined" && modal != null && isModalOpen(modal)
        ? closeModal(modal)
        : openModal(modal);
    return null
}

// Is modal open
function isModalOpen(modal: any) {
    return modal.hasAttribute("open") && modal.getAttribute("open") != "false" ? true : false;
}

// Open modal
function openModal(modal: any) {
    if (isScrollbarVisible()) {
        document.documentElement.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`);
    }
    document.documentElement.classList.add(isOpenClass, openingClass);
    setTimeout(() => {
        visibleModal = modal;
        document.documentElement.classList.remove(openingClass);
    }, animationDuration);
    modal.setAttribute("open", true);
}

// Close modal
function closeModal(modal: any) {
    visibleModal = null;
    document.documentElement.classList.add(closingClass);
    setTimeout(() => {
        document.documentElement.classList.remove(closingClass, isOpenClass);
        document.documentElement.style.removeProperty("--scrollbar-width");
        modal.removeAttribute("open");
    }, animationDuration);
}

function modalSetup() {
    // Close with a click outside
    document.addEventListener("click", (event) => {
        if (visibleModal != null) {
            const modalContent = visibleModal.querySelector("article");
            const isClickInside = modalContent.contains(event.target);
            !isClickInside && closeModal(visibleModal);
        }
    });

    // Close with Esc key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && visibleModal != null) {
            closeModal(visibleModal);
        }
    });
}

// Get scrollbar width
function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    if (outer.parentNode)
        outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

// Is scrollbar visible
function isScrollbarVisible() {
    return document.body.scrollHeight > screen.height;
}

export { modalSetup, toggleModal }