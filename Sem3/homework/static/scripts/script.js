window.addEventListener("load", () => {
    const mainViewsHtml = document.querySelector(".mainViews");
    const requestData = {main: false};
    if (mainViewsHtml) {
        requestData.main = true;
    }
    fetch("/update-views", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
        .then(response => response.json())
        .then(data => {
            if (mainViewsHtml) {
                mainViewsHtml.textContent = `Просмотры ${data.main}`;
            } else {
                document.querySelector(".aboutViews").textContent = `Просмотры ${data.about}`;
            }
        })
        .catch(err => {
            console.error("Ошибка при обновлении просмотров:", err);
        });
});