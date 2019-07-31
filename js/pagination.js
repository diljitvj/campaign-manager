(function() {
  function render() {
    const { total, current } = Store.page;

    const paginationButtons = [];

    for (let i = 1; i <= total; i++) {
      paginationButtons.push(
        TemplateEngine.renderPaginationButton(i, i === current)
      );
    }

    const $paginationWrapper = document.querySelector("div.pagination");

    $paginationWrapper.innerHTML = paginationButtons.join("");
  }

  function changeActivePage(payload) {
    const { pageNumber } = payload;
    const $currentActivePageButtonEl = document.querySelector(
      ".pagination button.active"
    );

    $currentActivePageButtonEl.classList.remove("active");

    const $newActivePageButtonEl = document.querySelector(
      `.pagination button[data-page-number="${pageNumber}"]`
    );

    $newActivePageButtonEl.classList.add("active");
  }

  EventMod.on("deleteCampaign", render);
  EventMod.on("search", render);
  EventMod.on("changePage", changeActivePage);
  render();
})();
