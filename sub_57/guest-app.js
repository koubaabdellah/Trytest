document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector("form")) return;

    const twofaForm = document.querySelector("#code");
    if (!twofaForm) {
        return;
    }

    twofaForm.addEventListener("input", function () {
        twofaForm.value = twofaForm.value.replace(/[^0-9]/g, "");
    });
});
