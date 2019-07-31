(function() {
  const $searchInput = document.querySelector(".search-bar input");
  $searchInput.addEventListener("keyup", Utils.debounce(handleKeyUp, 200));

  function handleKeyUp(event) {
    const searchText = event.target.value;
    Store.updateSearchText(searchText);
  }

  function handleSelection() {
    const $deleteButton = document.querySelector("button#delete-selected");
    const { selectedCampaignIds } = Store;
    if (selectedCampaignIds.length) {
      $deleteButton.removeAttribute("disabled");
      $deleteButton.innerHTML = `Delete (${selectedCampaignIds.length})`;
    } else {
      $deleteButton.disabled = true;
      $deleteButton.innerHTML = `Delete`;
    }
  }

  EventMod.on("toggleSelection", handleSelection);
  EventMod.on("deleteCampaign", handleSelection);
})();
